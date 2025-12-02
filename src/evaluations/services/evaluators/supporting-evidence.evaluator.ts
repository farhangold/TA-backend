import { Injectable } from '@nestjs/common';
import { AttributeType } from '../../../scoring-rules/enums/attribute-type.enum';
import { UATReport } from '../../../uat-reports/models/uat-report';
import { ScoringRule } from '../../../scoring-rules/models/scoring-rule';
import { AttributeScore } from '../../models/attribute-score';

@Injectable()
export class SupportingEvidenceEvaluator {
  evaluate(report: UATReport, rule: ScoringRule): AttributeScore {
    const supportingEvidence = report.supportingEvidence || [];

    // Check if at least one evidence is provided
    const score = supportingEvidence.length > 0 ? 1 : 0;

    return {
      attribute: AttributeType.SUPPORTING_EVIDENCE,
      score,
      maxScore: 1,
      weight: rule.weight,
      weightedScore: score * rule.weight,
      passed: score >= 1,
    };
  }
}
