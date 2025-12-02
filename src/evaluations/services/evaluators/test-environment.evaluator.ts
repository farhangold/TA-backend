import { Injectable } from '@nestjs/common';
import { AttributeType } from '../../../scoring-rules/enums/attribute-type.enum';
import { UATReport } from '../../../uat-reports/models/uat-report';
import { ScoringRule } from '../../../scoring-rules/models/scoring-rule';
import { AttributeScore } from '../../models/attribute-score';

@Injectable()
export class TestEnvironmentEvaluator {
  evaluate(report: UATReport, rule: ScoringRule): AttributeScore {
    const testEnvironment = report.testEnvironment;

    // Check if all required fields are provided
    const hasAllFields =
      testEnvironment &&
      testEnvironment.os &&
      testEnvironment.browser &&
      testEnvironment.device;

    const score = hasAllFields ? 1 : 0;

    return {
      attribute: AttributeType.TEST_ENVIRONMENT,
      score,
      maxScore: 1,
      weight: rule.weight,
      weightedScore: score * rule.weight,
      passed: score >= 1,
    };
  }
}
