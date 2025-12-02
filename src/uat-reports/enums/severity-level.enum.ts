import { registerEnumType } from '@nestjs/graphql';

export enum SeverityLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

registerEnumType(SeverityLevel, {
  name: 'SeverityLevel',
  description: 'Severity level of the UAT report',
});
