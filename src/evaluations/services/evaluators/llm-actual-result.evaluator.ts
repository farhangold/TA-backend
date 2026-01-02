import { Injectable } from '@nestjs/common';
import { AttributeType } from '../../../scoring-rules/enums/attribute-type.enum';
import { UATReport } from '../../../uat-reports/models/uat-report';
import { ScoringRule } from '../../../scoring-rules/models/scoring-rule';
import { AttributeScore } from '../../models/attribute-score';
import { LLMEvaluationService } from '../../../llm/services/llm-evaluation.service';
import { LLMEvaluationFailedError } from '../../../llm/errors/llm-evaluation-failed.error';
import { ReportType } from '../../../uat-reports/enums/report-type.enum';

@Injectable()
export class LLMActualResultEvaluator {
  constructor(private llmEvaluationService: LLMEvaluationService) {}

  async evaluate(
    report: UATReport,
    rule: ScoringRule,
    reportType: ReportType,
  ): Promise<AttributeScore> {
    try {
      const result = await this.llmEvaluationService.evaluate(
        AttributeType.ACTUAL_RESULT,
        report,
        reportType,
      );

      // Apply penalty logic based on quality flags
      let finalScore = result.score;
      const qualityFlags = result.qualityFlags;

      if (qualityFlags) {
        // Apply penalties for negative flags
        if (qualityFlags.isContradictory === true) {
          finalScore = Math.max(0, finalScore - 0.2);
        }
        if (qualityFlags.isTooGeneric === true) {
          finalScore = Math.max(0, finalScore - 0.15);
        }
        if (qualityFlags.hasBias === true) {
          finalScore = Math.max(0, finalScore - 0.1);
        }
        if (qualityFlags.isAmbiguous === true) {
          finalScore = Math.max(0, finalScore - 0.1);
        }
        if (qualityFlags.isConsistent === false) {
          finalScore = Math.max(0, finalScore - 0.15);
        }
        if (qualityFlags.isClear === false) {
          finalScore = Math.max(0, finalScore - 0.1);
        }

        // Clamp score to 0-1 range
        finalScore = Math.min(1, Math.max(0, finalScore));
      }

      return {
        attribute: AttributeType.ACTUAL_RESULT,
        score: finalScore,
        maxScore: 1,
        weight: rule.weight,
        weightedScore: finalScore * rule.weight,
        passed: finalScore >= 0.7,
        reasoning: result.reasoning,
        qualityFlags: qualityFlags,
      };
    } catch (error) {
      // Handle LLM evaluation failure
      if (error instanceof LLMEvaluationFailedError) {
        return {
          attribute: AttributeType.ACTUAL_RESULT,
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

