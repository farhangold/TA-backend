import { EvaluationDocument } from './evaluation';
import { EvaluationView } from '../dto/views/evaluation.view';
import { CompletenessStatus } from '../enums/completeness-status.enum';
import { AttributeType } from '../../scoring-rules/enums/attribute-type.enum';

export function parseEvaluationToView(doc: EvaluationDocument): EvaluationView {
  // Calculate completeness status from attributeScores if not present (backward compatibility)
  let completenessStatus: CompletenessStatus;
  let incompleteAttributes: AttributeType[];

  if (doc.completenessStatus) {
    // Use existing completeness status if available
    completenessStatus = doc.completenessStatus;
    incompleteAttributes = doc.incompleteAttributes || [];
  } else {
    // For backward compatibility: if completenessStatus not set, we can't calculate it
    // because we don't have access to the report data here
    // So we'll assume complete for old evaluations
    incompleteAttributes = [];
    completenessStatus = CompletenessStatus.COMPLETE;
  }

  // Extract reportId as string (handle case where it's populated as object)
  let reportId: string;
  if (typeof doc.reportId === 'string') {
    reportId = doc.reportId;
  } else if (
    doc.reportId &&
    typeof doc.reportId === 'object' &&
    '_id' in doc.reportId
  ) {
    // If populated, extract the _id
    reportId =
      (doc.reportId as any)._id?.toString() || (doc.reportId as any)._id;
  } else {
    // Fallback: try to get string representation
    reportId = String(doc.reportId);
  }

  // Extract evaluatedBy as string or undefined (handle case where it's populated as object)
  let evaluatedBy: string | undefined;
  if (!doc.evaluatedBy) {
    evaluatedBy = undefined;
  } else if (typeof doc.evaluatedBy === 'string') {
    evaluatedBy = doc.evaluatedBy;
  } else if (
    doc.evaluatedBy &&
    typeof doc.evaluatedBy === 'object' &&
    '_id' in doc.evaluatedBy
  ) {
    // If populated, extract the _id
    evaluatedBy =
      (doc.evaluatedBy as any)._id?.toString() || (doc.evaluatedBy as any)._id;
  } else {
    evaluatedBy = String(doc.evaluatedBy);
  }

  return {
    _id: doc._id,
    reportId,
    reportType: doc.reportType,
    report: undefined as never, // Populated by GraphQL @ResolveField
    attributeScores: doc.attributeScores,
    totalScore: doc.totalScore,
    maxScore: doc.maxScore,
    scorePercentage: doc.scorePercentage,
    validationStatus: doc.validationStatus,
    completenessStatus,
    incompleteAttributes,
    feedback: doc.feedback,
    processingTime: doc.processingTime,
    evaluatedBy: evaluatedBy as never, // Populated by GraphQL @ResolveField
    evaluatedAt: doc.evaluatedAt,
    version: doc.version,
  };
}
