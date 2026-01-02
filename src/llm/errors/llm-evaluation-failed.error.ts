import { AttributeType } from '../../scoring-rules/enums/attribute-type.enum';

export class LLMEvaluationFailedError extends Error {
  constructor(
    public readonly attribute: AttributeType,
    public readonly originalError: Error,
    public readonly retryAttempts: number,
  ) {
    super(
      `LLM evaluation failed for attribute ${attribute} after ${retryAttempts} attempts: ${originalError.message}`,
    );
    this.name = 'LLMEvaluationFailedError';
    Object.setPrototypeOf(this, LLMEvaluationFailedError.prototype);
  }
}

