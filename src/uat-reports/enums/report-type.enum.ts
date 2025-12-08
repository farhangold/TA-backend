import { registerEnumType } from '@nestjs/graphql';

export enum ReportType {
  BUG_REPORT = 'BUG_REPORT',
  SUCCESS_REPORT = 'SUCCESS_REPORT',
}

registerEnumType(ReportType, {
  name: 'ReportType',
  description: 'Type of UAT report - Bug Report or Success Report',
});
