import { Injectable } from '@nestjs/common';
import { AttributeType } from '../../../scoring-rules/enums/attribute-type.enum';
import { UATReport } from '../../../uat-reports/models/uat-report';
import { ScoringRule } from '../../../scoring-rules/models/scoring-rule';
import { AttributeScore } from '../../models/attribute-score';

@Injectable()
export class ActualResultEvaluator {
  evaluate(report: UATReport, rule: ScoringRule): AttributeScore {
    const actualResult = report.actualResult || '';
    // Check if actualResult has at least 30 characters
    const score = actualResult.length >= 30 ? 1 : 0;

    return {
      attribute: AttributeType.ACTUAL_RESULT,
      score,
      maxScore: 1,
      weight: rule.weight,
      weightedScore: score * rule.weight,
      passed: score >= 1,
    };
  }
}
