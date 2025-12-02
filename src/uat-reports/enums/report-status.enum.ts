import { registerEnumType } from '@nestjs/graphql';

export enum ReportStatus {
  PENDING_EVALUATION = 'PENDING_EVALUATION',
  EVALUATING = 'EVALUATING',
  VALID = 'VALID',
  INVALID = 'INVALID',
  FAILED = 'FAILED',
}

registerEnumType(ReportStatus, {
  name: 'ReportStatus',
  description: 'Status of the UAT report',
});
