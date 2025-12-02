import { Injectable } from '@nestjs/common';
import { ThrowGQL, GQLThrowType } from '@app/gqlerr';
import { EvaluateReportService } from './evaluate-report.service';
import { EvaluationView } from '../dto/views/evaluation.view';

@Injectable()
export class BatchEvaluateReportsService {
  constructor(private evaluateReportService: EvaluateReportService) {}

  async evaluateBatch(
    reportIds: string[],
    userId?: string,
  ): Promise<EvaluationView[]> {
    try {
      const results: EvaluationView[] = [];

      for (const reportId of reportIds) {
        try {
          const evaluation = await this.evaluateReportService.evaluate(
            reportId,
            userId,
          );
          results.push(evaluation);
        } catch (error) {
          // Continue with other reports even if one fails
          console.error(`Failed to evaluate report ${reportId}:`, error);
        }
      }

      return results;
    } catch (error) {
      throw new ThrowGQL(error, GQLThrowType.UNPROCESSABLE);
    }
  }
}
