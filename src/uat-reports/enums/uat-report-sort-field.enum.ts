import { registerEnumType } from '@nestjs/graphql';

export enum UATReportSortField {
  CREATED_AT = 'CREATED_AT',
  UPDATED_AT = 'UPDATED_AT',
  SCORE = 'SCORE',
  SEVERITY = 'SEVERITY',
  STATUS = 'STATUS',
}

registerEnumType(UATReportSortField, {
  name: 'UATReportSortField',
  description: 'Fields to sort UAT reports by',
});
