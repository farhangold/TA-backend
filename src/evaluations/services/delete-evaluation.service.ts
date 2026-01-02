import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ThrowGQL, GQLThrowType } from '@app/gqlerr';
import { Evaluation, EvaluationDocument } from '../models/evaluation';

@Injectable()
export class DeleteEvaluationService {
  constructor(
    @InjectModel(Evaluation.name)
    private evaluationModel: Model<EvaluationDocument>,
  ) {}

  async deleteByReportId(reportId: string): Promise<boolean> {
    try {
      const result = await this.evaluationModel.deleteMany({ reportId });

      if (result.deletedCount === 0) {
        throw new ThrowGQL(
          'Evaluation not found for this report',
          GQLThrowType.NOT_FOUND,
        );
      }

      return true;
    } catch (error) {
      if (error instanceof ThrowGQL) {
        throw error;
      }
      throw new ThrowGQL(error, GQLThrowType.UNPROCESSABLE);
    }
  }
}

