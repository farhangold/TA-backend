import { registerEnumType } from '@nestjs/graphql';

export enum CompletenessStatus {
  COMPLETE = 'COMPLETE',
  INCOMPLETE = 'INCOMPLETE',
}

registerEnumType(CompletenessStatus, {
  name: 'CompletenessStatus',
  description:
    'Completeness status indicating whether all required attributes are complete',
});
