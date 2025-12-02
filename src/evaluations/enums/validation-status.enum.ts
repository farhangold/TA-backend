import { registerEnumType } from '@nestjs/graphql';

export enum ValidationStatus {
  VALID = 'VALID',
  INVALID = 'INVALID',
  PARTIAL = 'PARTIAL',
}

registerEnumType(ValidationStatus, {
  name: 'ValidationStatus',
  description: 'Validation status of the evaluation',
});
