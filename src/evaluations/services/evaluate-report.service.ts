import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'bson';
import { ThrowGQL, GQLThrowType } from '@app/gqlerr';
import { Evaluation, EvaluationDocument } from '../models/evaluation';
import {
  UATReport,
  UATReportDocument,
} from '../../uat-reports/models/uat-report';
import { GetScoringRulesService } from '../../scoring-rules/services/get-scoring-rules.service';
import { LLMTestIdentityEvaluator } from './evaluators/llm-test-identity.evaluator';
import { LLMTestEnvironmentEvaluator } from './evaluators/llm-test-environment.evaluator';
import { LLMStepsToReproduceEvaluator } from './evaluators/llm-steps-to-reproduce.evaluator';
import { LLMActualResultEvaluator } from './evaluators/llm-actual-result.evaluator';
import { LLMExpectedResultEvaluator } from './evaluators/llm-expected-result.evaluator';
import { LLMSupportingEvidenceEvaluator } from './evaluators/llm-supporting-evidence.evaluator';
import { LLMSeverityLevelEvaluator } from './evaluators/llm-severity-level.evaluator';
import { LLMInformationConsistencyEvaluator } from './evaluators/llm-information-consistency.evaluator';
import { LLMDescriptionSuccessEvaluator } from './evaluators/llm-description-success.evaluator';
import { LLMEnvironmentSuccessEvaluator } from './evaluators/llm-environment-success.evaluator';
import { ReportType } from '../../uat-reports/enums/report-type.enum';
import { CalculateScoreService } from './calculate-score.service';
import { DetermineStatusService } from './determine-status.service';
import { GenerateFeedbackService } from './generate-feedback.service';
import { parseEvaluationToView } from '../models/parser';
import { AttributeType } from '../../scoring-rules/enums/attribute-type.enum';
import { CompletenessStatus } from '../enums/completeness-status.enum';
import { ReportStatus } from '../../uat-reports/enums/report-status.enum';
import { EvaluationView } from '../dto/views/evaluation.view';
import { LLMEvaluationFailedError } from '../../llm/errors/llm-evaluation-failed.error';

@Injectable()
export class EvaluateReportService {
  constructor(
    @InjectModel(Evaluation.name)
    private evaluationModel: Model<EvaluationDocument>,
    @InjectModel(UATReport.name)
    private uatReportModel: Model<UATReportDocument>,
    private getScoringRulesService: GetScoringRulesService,
    private testIdentityEvaluator: LLMTestIdentityEvaluator,
    private testEnvironmentEvaluator: LLMTestEnvironmentEvaluator,
    private stepsToReproduceEvaluator: LLMStepsToReproduceEvaluator,
    private actualResultEvaluator: LLMActualResultEvaluator,
    private expectedResultEvaluator: LLMExpectedResultEvaluator,
    private supportingEvidenceEvaluator: LLMSupportingEvidenceEvaluator,
    private severityLevelEvaluator: LLMSeverityLevelEvaluator,
    private informationConsistencyEvaluator: LLMInformationConsistencyEvaluator,
    private descriptionSuccessEvaluator: LLMDescriptionSuccessEvaluator,
    private environmentSuccessEvaluator: LLMEnvironmentSuccessEvaluator,
    private calculateScoreService: CalculateScoreService,
    private determineStatusService: DetermineStatusService,
    private generateFeedbackService: GenerateFeedbackService,
  ) {}

  async evaluate(reportId: string, userId?: string): Promise<EvaluationView> {
    const startTime = Date.now();

    try {
      // 1. Retrieve report by ID
      const report = await this.uatReportModel.findOne({ _id: reportId });
      if (!report) {
        throw new ThrowGQL('Report not found', GQLThrowType.NOT_FOUND);
      }

      // Get reportType
      const reportType = report.reportType || ReportType.BUG_REPORT;

      // Update report status to EVALUATING
      await this.uatReportModel.updateOne(
        { _id: reportId },
        { $set: { status: ReportStatus.EVALUATING } },
      );

      // 2. Get scoring rules based on report type
      const rules =
        await this.getScoringRulesService.getScoringRulesByReportType(
          reportType,
        );
      const rulesMap = rules.reduce((map, rule) => {
        map[rule.attribute] = rule;
        return map;
      }, {});

      // 3. Get validation config for threshold
      const validationConfig =
        await this.getScoringRulesService.getValidationConfig();

      // 4. Run each attribute evaluator based on report type
      const attributeScores: any[] = [];
      const llmEvaluationErrors: Array<{
        attribute: AttributeType;
        error: string;
        timestamp: Date;
      }> = [];

      // Select evaluators based on report type
      // Cost Control Strategy:
      // - LLM-based evaluation: STEPS_TO_REPRODUCE and ACTUAL_RESULT only (as per requirements)
      // - Rule-based evaluation: TEST_ENVIRONMENT, SUPPORTING_EVIDENCE, EXPECTED_RESULT (for efficiency)
      // Note: Current implementation uses LLM for all attributes. Per requirements, only Steps to Reproduce
      // and Actual Result should use LLM for semantic evaluation. Other attributes should be rule-based.
      let evaluators: Record<string, any>;
      if (reportType === ReportType.SUCCESS_REPORT) {
        evaluators = {
          [AttributeType.TEST_ENVIRONMENT]: this.environmentSuccessEvaluator,
          [AttributeType.ACTUAL_RESULT]: this.descriptionSuccessEvaluator, // LLM-based
        };
      } else {
        // Bug Report evaluators
        evaluators = {
          [AttributeType.TEST_ENVIRONMENT]: this.testEnvironmentEvaluator,
          [AttributeType.STEPS_TO_REPRODUCE]: this.stepsToReproduceEvaluator, // LLM-based
          [AttributeType.ACTUAL_RESULT]: this.actualResultEvaluator, // LLM-based
          [AttributeType.SUPPORTING_EVIDENCE]: this.supportingEvidenceEvaluator,
        };
      }

      // Run evaluators in parallel for better performance
      const evaluationPromises = Object.entries(evaluators).map(
        async ([attribute, evaluator]) => {
          const rule = rulesMap[attribute];
          if (rule) {
            try {
              const score = await evaluator.evaluate(
                report.toObject(),
                rule,
                reportType,
              );
              return score;
            } catch (error) {
              // Handle LLM evaluation failures
              if (error instanceof LLMEvaluationFailedError) {
                const errorEntry = {
                  attribute: error.attribute,
                  error: error.originalError.message,
                  timestamp: new Date(),
                };
                llmEvaluationErrors.push(errorEntry);
                console.error(
                  `LLM evaluation failed for attribute ${attribute}:`,
                  error,
                );
                // Return score with NEEDS_MANUAL_REVIEW status (already handled by evaluator)
                return {
                  attribute: attribute as AttributeType,
                  score: 0,
                  maxScore: 1,
                  weight: rule.weight,
                  weightedScore: 0,
                  passed: false,
                  evaluationStatus: 'NEEDS_MANUAL_REVIEW' as const,
                  reasoning: `LLM evaluation failed: ${error.originalError.message}`,
                };
              }
              // If evaluation fails for other reasons, return a default score of 0
              console.error(`Error evaluating attribute ${attribute}:`, error);
              return {
                attribute: attribute as AttributeType,
                score: 0,
                maxScore: 1,
                weight: rule.weight,
                weightedScore: 0,
                passed: false,
              };
            }
          }
          return null;
        },
      );

      const scores = await Promise.all(evaluationPromises);
      attributeScores.push(...scores.filter((score) => score !== null));

      // 5. Calculate weighted scores
      const { totalScore, maxScore, scorePercentage } =
        this.calculateScoreService.calculate(attributeScores);

      // 6. Determine validation status
      const validationStatus = this.determineStatusService.determine(
        scorePercentage,
        validationConfig.threshold,
      );

      // 7. Generate feedback for failed attributes
      const feedback = this.generateFeedbackService.generate(attributeScores);

      // 7.5. Determine completeness status based on required fields
      // NOTE:
      // - Bug Report  : requires steps to reproduce + actual result + expected result + supporting evidence
      // - Success Report : does NOT require steps to reproduce or supporting evidence.
      //   It is considered complete as long as the success description (actualResult) is filled.
      const incompleteAttributes: AttributeType[] = [];

      if (reportType === ReportType.SUCCESS_REPORT) {
        // For success reports, only the success description (ACTUAL_RESULT) is required.
        if (!report.actualResult || report.actualResult.trim() === '') {
          incompleteAttributes.push(AttributeType.ACTUAL_RESULT);
        }
      } else {
        // Bug reports require all main diagnostic attributes

        // Check Steps to Reproduce
        if (
          !report.stepsToReproduce ||
          !Array.isArray(report.stepsToReproduce) ||
          report.stepsToReproduce.length === 0 ||
          report.stepsToReproduce.every((step) => !step || step.trim() === '')
        ) {
          incompleteAttributes.push(AttributeType.STEPS_TO_REPRODUCE);
        }

        // Check Actual Result
        if (!report.actualResult || report.actualResult.trim() === '') {
          incompleteAttributes.push(AttributeType.ACTUAL_RESULT);
        }

        // Check Expected Result
        if (!report.expectedResult || report.expectedResult.trim() === '') {
          incompleteAttributes.push(AttributeType.EXPECTED_RESULT);
        }

        // Check Supporting Evidence
        if (
          !report.supportingEvidence ||
          !Array.isArray(report.supportingEvidence) ||
          report.supportingEvidence.length === 0
        ) {
          incompleteAttributes.push(AttributeType.SUPPORTING_EVIDENCE);
        }
      }

      const completenessStatus =
        incompleteAttributes.length === 0
          ? CompletenessStatus.COMPLETE
          : CompletenessStatus.INCOMPLETE;

      // 7.6. Check for manual review requirements
      const requiresManualReview =
        attributeScores.some(
          (score) => score.evaluationStatus === 'NEEDS_MANUAL_REVIEW',
        ) || llmEvaluationErrors.length > 0;

      // 8. Calculate processing time
      const processingTime = Date.now() - startTime;

      // 9. Get latest version for this report
      const latestEvaluation = await this.evaluationModel
        .findOne({ reportId })
        .sort({ version: -1 })
        .exec();
      const version = latestEvaluation ? latestEvaluation.version + 1 : 1;

      // 10. Save evaluation with version tracking
      const evaluation = await this.evaluationModel.create({
        _id: new ObjectId().toString(),
        reportId,
        reportType,
        attributeScores,
        totalScore,
        maxScore,
        scorePercentage,
        validationStatus,
        completenessStatus,
        incompleteAttributes,
        feedback,
        processingTime,
        evaluatedBy: userId || null,
        evaluatedAt: new Date(),
        version,
        requiresManualReview,
        llmEvaluationErrors:
          llmEvaluationErrors.length > 0 ? llmEvaluationErrors : undefined,
      });

      // 11. Update report status based on validation result
      // Priority: NEEDS_MANUAL_REVIEW > VALID/INVALID
      let reportStatus: ReportStatus;
      if (requiresManualReview) {
        reportStatus = ReportStatus.NEEDS_MANUAL_REVIEW;
      } else {
        reportStatus =
          validationStatus === 'VALID'
            ? ReportStatus.VALID
            : ReportStatus.INVALID;
      }
      await this.uatReportModel.updateOne(
        { _id: reportId },
        { $set: { status: reportStatus } },
      );

      const result: EvaluationView = parseEvaluationToView(evaluation);
      return result;
    } catch (error) {
      // Update report status to FAILED if evaluation fails
      await this.uatReportModel.updateOne(
        { _id: reportId },
        { $set: { status: ReportStatus.FAILED } },
      );

      if (error instanceof ThrowGQL) {
        throw error;
      }
      throw new ThrowGQL(error, GQLThrowType.UNPROCESSABLE);
    }
  }
}
