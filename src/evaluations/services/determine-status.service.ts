import { Injectable } from '@nestjs/common';
import { ValidationStatus } from '../enums/validation-status.enum';

@Injectable()
export class DetermineStatusService {
  determine(scorePercentage: number, threshold: number): ValidationStatus {
    // Use threshold 60 for Accept/Reject (as per requirements)
    // The threshold parameter is kept for interface compatibility but defaults to 60
    const acceptThreshold = threshold >= 60 ? threshold : 60;

    if (scorePercentage >= acceptThreshold) {
      return ValidationStatus.VALID; // Accept
    } else {
      return ValidationStatus.INVALID; // Reject
    }
  }
}
