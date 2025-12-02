import { registerEnumType } from '@nestjs/graphql';

export enum AuditEntity {
  UAT_REPORT = 'UAT_REPORT',
  EVALUATION = 'EVALUATION',
  SCORING_RULE = 'SCORING_RULE',
  VALIDATION_CONFIG = 'VALIDATION_CONFIG',
  USER = 'USER',
}

registerEnumType(AuditEntity, {
  name: 'AuditEntity',
  description: 'Type of entity affected',
});
