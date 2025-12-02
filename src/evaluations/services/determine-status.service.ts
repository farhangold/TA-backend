import { Injectable } from '@nestjs/common';
import { ValidationStatus } from '../enums/validation-status.enum';

@Injectable()
export class DetermineStatusService {
  determine(scorePercentage: number, threshold: number): ValidationStatus {
    if (scorePercentage >= threshold) {
      return ValidationStatus.VALID;
    } else if (scorePercentage >= threshold * 0.5) {
      return ValidationStatus.PARTIAL;
    } else {
      return ValidationStatus.INVALID;
    }
  }
}
