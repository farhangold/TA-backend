import { Injectable } from '@nestjs/common';
import { AttributeType } from '../../../scoring-rules/enums/attribute-type.enum';
import { UATReport } from '../../../uat-reports/models/uat-report';
import { ScoringRule } from '../../../scoring-rules/models/scoring-rule';
import { AttributeScore } from '../../models/attribute-score';
import { SeverityLevel } from '../../../uat-reports/enums/severity-level.enum';

@Injectable()
export class SeverityLevelEvaluator {
  evaluate(report: UATReport, rule: ScoringRule): AttributeScore {
    const severityLevel = report.severityLevel;

    // Check if severityLevel is valid (should always be valid if passed through validation)
    const validLevels = [
      SeverityLevel.LOW,
      SeverityLevel.MEDIUM,
      SeverityLevel.HIGH,
      SeverityLevel.CRITICAL,
    ];
    const score = validLevels.includes(severityLevel) ? 1 : 0;

    return {
      attribute: AttributeType.SEVERITY_LEVEL,
      score,
      maxScore: 1,
      weight: rule.weight,
      weightedScore: score * rule.weight,
      passed: score >= 1,
    };
  }
}
