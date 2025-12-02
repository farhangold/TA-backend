import { registerEnumType } from '@nestjs/graphql';

export enum FeedbackSeverity {
  ERROR = 'ERROR',
  WARNING = 'WARNING',
  INFO = 'INFO',
}

registerEnumType(FeedbackSeverity, {
  name: 'FeedbackSeverity',
  description: 'Severity level of evaluation feedback',
});
