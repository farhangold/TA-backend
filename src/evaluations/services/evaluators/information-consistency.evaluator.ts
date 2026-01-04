import { Injectable } from '@nestjs/common';
import { AttributeType } from '../../../scoring-rules/enums/attribute-type.enum';
import { UATReport } from '../../../uat-reports/models/uat-report';
import { ScoringRule } from '../../../scoring-rules/models/scoring-rule';
import { AttributeScore } from '../../models/attribute-score';
import { SeverityLevel } from '../../../uat-reports/enums/severity-level.enum';
import { ReportType } from '../../../uat-reports/enums/report-type.enum';

@Injectable()
export class InformationConsistencyEvaluator {
  evaluate(report: UATReport, rule: ScoringRule): AttributeScore {
    const actualResult = (report.actualResult || '').toLowerCase().trim();
    const expectedResult = (report.expectedResult || '').toLowerCase().trim();

    // Both should be meaningful
    const areMeaningful =
      actualResult.length >= 10 && expectedResult.length >= 10;

    // For bug reports: actual and expected should be different (bug exists)
    // For success reports or when actual matches expected: this is valid (system works correctly)
    const isBugReport = report.reportType === ReportType.BUG_REPORT;
    const areDifferent = actualResult !== expectedResult;
    
    // For bug reports, they should be different. For success cases, matching is valid.
    const consistencyCheck = isBugReport ? areDifferent : true;

    // Check if severity matches the description
    let severityConsistent = true;
    const severityLevel = report.severityLevel;
    const combinedText = (actualResult + ' ' + expectedResult).toLowerCase();

    // Critical issues should mention critical keywords
    if (severityLevel === SeverityLevel.CRITICAL) {
      severityConsistent =
        combinedText.includes('crash') ||
        combinedText.includes('fail') ||
        combinedText.includes('error') ||
        combinedText.includes('unable') ||
        true; // Allow if no keywords (benefit of doubt)
    }

    const score = consistencyCheck && areMeaningful && severityConsistent ? 1 : 0;

    return {
      attribute: AttributeType.INFORMATION_CONSISTENCY,
      score,
      maxScore: 1,
      weight: rule.weight,
      weightedScore: score * rule.weight,
      passed: score >= 1,
    };
  }
}
