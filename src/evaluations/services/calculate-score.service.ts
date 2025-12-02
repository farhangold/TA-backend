import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculateScoreService {
  calculate(attributeScores: any[]): any {
    const totalScore = attributeScores.reduce(
      (sum, score) => sum + score.weightedScore,
      0,
    );
    const maxScore = attributeScores.reduce(
      (sum, score) => sum + score.weight,
      0,
    );
    const scorePercentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;

    return {
      totalScore,
      maxScore,
      scorePercentage,
    };
  }
}
