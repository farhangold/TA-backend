import { Injectable } from '@nestjs/common';
import { AttributeType } from '../../../scoring-rules/enums/attribute-type.enum';
import { UATReport } from '../../../uat-reports/models/uat-report';
import { ScoringRule } from '../../../scoring-rules/models/scoring-rule';
import { AttributeScore } from '../../models/attribute-score';

@Injectable()
export class EnvironmentSuccessEvaluator {
  evaluate(report: UATReport, rule: ScoringRule): AttributeScore {
    const testEnvironment = report.testEnvironment;

    if (!testEnvironment) {
      return {
        attribute: AttributeType.TEST_ENVIRONMENT,
        score: 0,
        maxScore: 40,
        weight: rule.weight,
        weightedScore: 0,
        passed: false,
      };
    }

    const os = (testEnvironment.os || '').trim();
    const device = (testEnvironment.device || '').trim();
    const browser = (testEnvironment.browser || '').trim();

    // Count how many fields are filled
    const filledCount = [os, device, browser].filter(
      (field) => field && field.length > 0,
    ).length;

    // Multi-level scoring for Success Report Environment
    let score = 0;
    const maxScore = 40;

    if (filledCount === 0) {
      // Tidak ada: 0
      score = 0;
    } else if (filledCount === 1) {
      // Kurang: 10 (only 1 info)
      score = 10;
    } else if (filledCount === 2) {
      // Cukup: 25 (at least two main info filled)
      score = 25;
    } else if (filledCount === 3) {
      // Check if all are specific (not just generic values)
      const isSpecific =
        os.length > 3 &&
        device.length > 3 &&
        browser.length > 3 &&
        !os.toLowerCase().includes('unknown') &&
        !device.toLowerCase().includes('unknown') &&
        !browser.toLowerCase().includes('unknown');

      if (isSpecific) {
        // Lengkap: 40 (OS + Device + Browser complete & specific)
        score = 40;
      } else {
        // Cukup: 25 (all filled but not very specific)
        score = 25;
      }
    }

    return {
      attribute: AttributeType.TEST_ENVIRONMENT,
      score,
      maxScore,
      weight: rule.weight,
      weightedScore: (score / maxScore) * rule.weight, // Normalize to weight
      passed: score >= 25, // At least "Cukup" to pass
    };
  }
}
