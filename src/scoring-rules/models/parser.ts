import { ScoringRuleDocument } from './scoring-rule';
import { ValidationConfigDocument } from './validation-config';
import { ConfigHistoryDocument } from './config-history';

export function parseScoringRuleToView(doc: ScoringRuleDocument): any {
  return doc.toObject();
}

export function parseValidationConfigToView(
  doc: ValidationConfigDocument,
): any {
  return doc.toObject();
}

export function parseConfigHistoryToView(doc: ConfigHistoryDocument): any {
  return doc.toObject();
}
