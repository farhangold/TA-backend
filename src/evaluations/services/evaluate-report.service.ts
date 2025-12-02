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
import { GetUserService } from '../../users/services/get-user.service';
import { TestIdentityEvaluator } from './evaluators/test-identity.evaluator';
import { TestEnvironmentEvaluator } from './evaluators/test-environment.evaluator';
import { StepsToReproduceEvaluator } from './evaluators/steps-to-reproduce.evaluator';
import { ActualResultEvaluator } from './evaluators/actual-result.evaluator';
import { ExpectedResultEvaluator } from './evaluators/expected-result.evaluator';
import { SupportingEvidenceEvaluator } from './evaluators/supporting-evidence.evaluator';
import { SeverityLevelEvaluator } from './evaluators/severity-level.evaluator';
import { InformationConsistencyEvaluator } from './evaluators/information-consistency.evaluator';
import { CalculateScoreService } from './calculate-score.service';
import { DetermineStatusService } from './determine-status.service';
import { GenerateFeedbackService } from './generate-feedback.service';
import { parseEvaluationToView } from '../models/parser';
import { AttributeType } from '../../scoring-rules/enums/attribute-type.enum';
import { ReportStatus } from '../../uat-reports/enums/report-status.enum';
import { EvaluationView } from '../dto/views/evaluation.view';

@Injectable()
export class EvaluateReportService {
  constructor(
    @InjectModel(Evaluation.name)
    private evaluationModel: Model<EvaluationDocument>,
    @InjectModel(UATReport.name)
    private uatReportModel: Model<UATReportDocument>,
    private getScoringRulesService: GetScoringRulesService,
    private testIdentityEvaluator: TestIdentityEvaluator,
    private testEnvironmentEvaluator: TestEnvironmentEvaluator,
    private stepsToReproduceEvaluator: StepsToReproduceEvaluator,
    private actualResultEvaluator: ActualResultEvaluator,
    private expectedResultEvaluator: ExpectedResultEvaluator,
    private supportingEvidenceEvaluator: SupportingEvidenceEvaluator,
    private severityLevelEvaluator: SeverityLevelEvaluator,
    private informationConsistencyEvaluator: InformationConsistencyEvaluator,
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

      // Update report status to EVALUATING
      await this.uatReportModel.updateOne(
        { _id: reportId },
        { $set: { status: ReportStatus.EVALUATING } },
      );

      // 2. Get active scoring rules
      const rules = await this.getScoringRulesService.getActiveRules();
      const rulesMap = rules.reduce((map, rule) => {
        map[rule.attribute] = rule;
        return map;
      }, {});

      // 3. Get validation config for threshold
      const validationConfig =
        await this.getScoringRulesService.getValidationConfig();

      // 4. Run each attribute evaluator
      const attributeScores: any[] = [];

      const evaluators = {
        [AttributeType.TEST_IDENTITY]: this.testIdentityEvaluator,
        [AttributeType.TEST_ENVIRONMENT]: this.testEnvironmentEvaluator,
        [AttributeType.STEPS_TO_REPRODUCE]: this.stepsToReproduceEvaluator,
        [AttributeType.ACTUAL_RESULT]: this.actualResultEvaluator,
        [AttributeType.EXPECTED_RESULT]: this.expectedResultEvaluator,
        [AttributeType.SUPPORTING_EVIDENCE]: this.supportingEvidenceEvaluator,
        [AttributeType.SEVERITY_LEVEL]: this.severityLevelEvaluator,
        [AttributeType.INFORMATION_CONSISTENCY]:
          this.informationConsistencyEvaluator,
      };

      for (const [attribute, evaluator] of Object.entries(evaluators)) {
        const rule = rulesMap[attribute];
        if (rule) {
          const score = evaluator.evaluate(report.toObject(), rule);
          attributeScores.push(score);
        }
      }

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
        attributeScores,
        totalScore,
        maxScore,
        scorePercentage,
        validationStatus,
        feedback,
        processingTime,
        evaluatedBy: userId || null,
        evaluatedAt: new Date(),
        version,
      });

      // 11. Update report status based on validation result
      const reportStatus =
        validationStatus === 'VALID'
          ? ReportStatus.VALID
          : ReportStatus.INVALID;
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
