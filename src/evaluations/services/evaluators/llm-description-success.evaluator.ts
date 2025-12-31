import { Injectable } from '@nestjs/common';
import { AttributeType } from '../../../scoring-rules/enums/attribute-type.enum';
import { UATReport } from '../../../uat-reports/models/uat-report';
import { ScoringRule } from '../../../scoring-rules/models/scoring-rule';
import { AttributeScore } from '../../models/attribute-score';
import { LLMEvaluationService } from '../../../llm/services/llm-evaluation.service';
import { ReportType } from '../../../uat-reports/enums/report-type.enum';

@Injectable()
export class LLMDescriptionSuccessEvaluator {
  constructor(private llmEvaluationService: LLMEvaluationService) {}

  async evaluate(
    report: UATReport,
    rule: ScoringRule,
    reportType: ReportType,
  ): Promise<AttributeScore> {
    // For success reports, ACTUAL_RESULT is the success description
    const result = await this.llmEvaluationService.evaluate(
      AttributeType.ACTUAL_RESULT,
      report,
      reportType,
    );

    return {
      attribute: AttributeType.ACTUAL_RESULT,
      score: result.score,
      maxScore: 1,
      weight: rule.weight,
      weightedScore: result.score * rule.weight,
      passed: result.score >= 0.7,
      reasoning: result.reasoning,
    };
  }
}

