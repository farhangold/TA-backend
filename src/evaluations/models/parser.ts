import { EvaluationDocument } from './evaluation';
import { EvaluationView } from '../dto/views/evaluation.view';

export function parseEvaluationToView(doc: EvaluationDocument): EvaluationView {
  return {
    _id: doc._id,
    reportId: doc.reportId,
    report: undefined as never, // Populated by GraphQL @ResolveField
    attributeScores: doc.attributeScores,
    totalScore: doc.totalScore,
    maxScore: doc.maxScore,
    scorePercentage: doc.scorePercentage,
    validationStatus: doc.validationStatus,
    feedback: doc.feedback,
    processingTime: doc.processingTime,
    evaluatedBy: doc.evaluatedBy as never, // Populated by GraphQL @ResolveField
    evaluatedAt: doc.evaluatedAt,
    version: doc.version,
  };
}
