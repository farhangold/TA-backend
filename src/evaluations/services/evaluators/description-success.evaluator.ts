import { Injectable } from '@nestjs/common';
import { AttributeType } from '../../../scoring-rules/enums/attribute-type.enum';
import { UATReport } from '../../../uat-reports/models/uat-report';
import { ScoringRule } from '../../../scoring-rules/models/scoring-rule';
import { AttributeScore } from '../../models/attribute-score';

@Injectable()
export class DescriptionSuccessEvaluator {
  evaluate(report: UATReport, rule: ScoringRule): AttributeScore {
    const description = (report.actualResult || '').trim();

    // Multi-level scoring for Success Report Description
    let score = 0;
    const maxScore = 60;

    if (description.length === 0) {
      // Tidak ada: 0
      score = 0;
    } else if (description.length < 30) {
      // Minim: 20 (very short or ambiguous)
      score = 20;
    } else {
      // Check for informativeness
      const hasActualResult =
        description.toLowerCase().includes('hasil') ||
        description.toLowerCase().includes('berhasil') ||
        description.toLowerCase().includes('success') ||
        description.toLowerCase().includes('completed') ||
        description.toLowerCase().includes('selesai');

      const hasSpecificContext =
        description.length >= 50 &&
        (description.includes('fungsi') ||
          description.includes('fitur') ||
          description.includes('proses') ||
          description.includes('function') ||
          description.includes('feature'));

      const isConsistent =
        description.length >= 60 &&
        !description.toLowerCase().includes('error') &&
        !description.toLowerCase().includes('gagal') &&
        !description.toLowerCase().includes('failed');

      if (hasActualResult && hasSpecificContext && isConsistent) {
        // Sangat Informatif: 60
        score = 60;
      } else if (hasActualResult && description.length >= 40) {
        // Cukup Informatif: 40
        score = 40;
      } else {
        // Minim: 20
        score = 20;
      }
    }

    return {
      attribute: AttributeType.ACTUAL_RESULT,
      score,
      maxScore,
      weight: rule.weight,
      weightedScore: (score / maxScore) * rule.weight, // Normalize to weight
      passed: score >= 40, // At least "Cukup Informatif" to pass
    };
  }
}
