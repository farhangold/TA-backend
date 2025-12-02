import { Injectable } from '@nestjs/common';
import { AttributeType } from '../../../scoring-rules/enums/attribute-type.enum';
import { UATReport } from '../../../uat-reports/models/uat-report';
import { ScoringRule } from '../../../scoring-rules/models/scoring-rule';
import { AttributeScore } from '../../models/attribute-score';

@Injectable()
export class StepsToReproduceEvaluator {
  evaluate(report: UATReport, rule: ScoringRule): AttributeScore {
    const steps = report.stepsToReproduce || [];

    // Check if there are at least 3 steps
    let score = 0;
    if (steps.length >= 3) {
      // Check if steps are clear (basic check: each step should have minimum length)
      const areStepsClear = steps.every((step) => step && step.length >= 10);
      score = areStepsClear ? 1 : 0.5;
    }

    return {
      attribute: AttributeType.STEPS_TO_REPRODUCE,
      score,
      maxScore: 1,
      weight: rule.weight,
      weightedScore: score * rule.weight,
      passed: score >= 1,
    };
  }
}
