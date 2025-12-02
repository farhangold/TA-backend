import { UATReportDocument } from './uat-report';

export function parseUATReportToView(doc: UATReportDocument): any {
  return doc.toObject();
}

export function parseUATReportInput(input: any, userId: string): any {
  return {
    ...input,
    createdBy: userId,
    status: 'PENDING_EVALUATION',
  };
}
