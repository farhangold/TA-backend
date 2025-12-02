import { Injectable } from '@nestjs/common';
import { AttributeType } from '../../../scoring-rules/enums/attribute-type.enum';
import { UATReport } from '../../../uat-reports/models/uat-report';
import { ScoringRule } from '../../../scoring-rules/models/scoring-rule';
import { AttributeScore } from '../../models/attribute-score';

@Injectable()
export class ExpectedResultEvaluator {
  evaluate(report: UATReport, rule: ScoringRule): AttributeScore {
    const expectedResult = report.expectedResult || '';
    // Check if expectedResult is provided and has reasonable length
    const score = expectedResult && expectedResult.length >= 10 ? 1 : 0;

    return {
      attribute: AttributeType.EXPECTED_RESULT,
      score,
      maxScore: 1,
      weight: rule.weight,
      weightedScore: score * rule.weight,
      passed: score >= 1,
    };
  }
}
