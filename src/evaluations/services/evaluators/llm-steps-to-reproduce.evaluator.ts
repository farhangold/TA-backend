import { Injectable } from '@nestjs/common';
import { AttributeType } from '../../../scoring-rules/enums/attribute-type.enum';
import { UATReport } from '../../../uat-reports/models/uat-report';
import { ScoringRule } from '../../../scoring-rules/models/scoring-rule';
import { AttributeScore } from '../../models/attribute-score';
import { LLMEvaluationService } from '../../../llm/services/llm-evaluation.service';
import { LLMEvaluationFailedError } from '../../../llm/errors/llm-evaluation-failed.error';
import { ReportType } from '../../../uat-reports/enums/report-type.enum';

@Injectable()
export class LLMStepsToReproduceEvaluator {
  constructor(private llmEvaluationService: LLMEvaluationService) {}

  async evaluate(
    report: UATReport,
    rule: ScoringRule,
    reportType: ReportType,
  ): Promise<AttributeScore> {
    try {
      const result = await this.llmEvaluationService.evaluate(
        AttributeType.STEPS_TO_REPRODUCE,
        report,
        reportType,
      );

      // Map status to evaluationStatus
      let evaluationStatus: AttributeScore['evaluationStatus'];
      if (result.status) {
        evaluationStatus = result.status;
      } else {
        // Fallback: determine status from score if not provided
        if (result.score >= 0.7) {
          evaluationStatus = 'VALID';
        } else if (result.score >= 0.4) {
          evaluationStatus = 'AMBIGUOUS';
        } else {
          evaluationStatus = 'INVALID';
        }
      }

      return {
        attribute: AttributeType.STEPS_TO_REPRODUCE,
        score: result.score,
        maxScore: 1,
        weight: rule.weight,
        weightedScore: result.score * rule.weight,
        passed: result.score >= 0.7,
        reasoning: result.reasoning,
        evaluationStatus,
      };
    } catch (error) {
      // Handle LLM evaluation failure
      if (error instanceof LLMEvaluationFailedError) {
        return {
          attribute: AttributeType.STEPS_TO_REPRODUCE,
          score: 0,
          maxScore: 1,
          weight: rule.weight,
          weightedScore: 0,
          passed: false,
          reasoning: `LLM evaluation failed: ${error.originalError.message}`,
          evaluationStatus: 'NEEDS_MANUAL_REVIEW',
        };
      }
      // Re-throw other errors
      throw error;
    }
  }
}

