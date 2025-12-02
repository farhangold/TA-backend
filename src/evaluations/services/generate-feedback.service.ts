import { Injectable } from '@nestjs/common';
import { AttributeType } from '../../scoring-rules/enums/attribute-type.enum';
import { FeedbackSeverity } from '../enums/feedback-severity.enum';

interface AttributeScore {
  attribute: AttributeType;
  score: number;
  passed: boolean;
}

interface FeedbackItem {
  attribute: AttributeType;
  severity: FeedbackSeverity;
  message: string;
  suggestion: string;
}

interface FeedbackTemplate {
  message: string;
  suggestion: string;
}

@Injectable()
export class GenerateFeedbackService {
  generate(attributeScores: AttributeScore[]): FeedbackItem[] {
    const feedback: FeedbackItem[] = [];

    const feedbackMap: Record<AttributeType, FeedbackTemplate> = {
      [AttributeType.TEST_IDENTITY]: {
        message: 'Test identity is incomplete',
        suggestion: 'Please provide test ID, title, and version',
      },
      [AttributeType.TEST_ENVIRONMENT]: {
        message: 'Test environment is incomplete',
        suggestion: 'Please provide OS, browser, and device information',
      },
      [AttributeType.STEPS_TO_REPRODUCE]: {
        message: 'Steps to reproduce are insufficient',
        suggestion: 'Please provide at least 3 clear and detailed steps',
      },
      [AttributeType.ACTUAL_RESULT]: {
        message: 'Actual result is too brief',
        suggestion:
          'Please provide a detailed description (at least 30 characters)',
      },
      [AttributeType.EXPECTED_RESULT]: {
        message: 'Expected result is missing or too brief',
        suggestion: 'Please provide a clear expected result',
      },
      [AttributeType.SUPPORTING_EVIDENCE]: {
        message: 'No supporting evidence provided',
        suggestion: 'Please attach screenshots, videos, or logs',
      },
      [AttributeType.SEVERITY_LEVEL]: {
        message: 'Severity level is invalid',
        suggestion:
          'Please select a valid severity level (LOW, MEDIUM, HIGH, CRITICAL)',
      },
      [AttributeType.INFORMATION_CONSISTENCY]: {
        message: 'Information appears inconsistent',
        suggestion:
          'Please ensure actual and expected results are different and meaningful',
      },
    };

    for (const score of attributeScores) {
      if (!score.passed) {
        const feedbackInfo = feedbackMap[score.attribute];
        if (feedbackInfo) {
          feedback.push({
            attribute: score.attribute,
            severity:
              score.score === 0
                ? FeedbackSeverity.ERROR
                : score.score === 0.5
                  ? FeedbackSeverity.WARNING
                  : FeedbackSeverity.INFO,
            message: feedbackInfo.message,
            suggestion: feedbackInfo.suggestion,
          });
        }
      }
    }

    return feedback;
  }
}
