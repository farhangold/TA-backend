import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ThrowGQL, GQLThrowType } from '@app/gqlerr';
import { Evaluation, EvaluationDocument } from '../models/evaluation';
import { parseEvaluationToView } from '../models/parser';
import { PaginationInput } from '../../common/types';
import { EvaluationView } from '../dto/views/evaluation.view';
import {
  EvaluationConnection,
  EvaluationEdge,
} from '../dto/views/evaluation-connection.view';

@Injectable()
export class GetEvaluationService {
  constructor(
    @InjectModel(Evaluation.name)
    private evaluationModel: Model<EvaluationDocument>,
  ) {}

  async findByReportId(reportId: string): Promise<EvaluationView> {
    try {
      // Get the latest evaluation for the report
      const evaluation = (await this.evaluationModel
        .findOne({ reportId })
        .sort({ version: -1 })
        .populate('reportId')
        .populate('evaluatedBy')
        .lean()
        .exec()) as unknown as EvaluationDocument | null;

      if (!evaluation) {
        throw new ThrowGQL('Evaluation not found', GQLThrowType.NOT_FOUND);
      }

      return parseEvaluationToView(evaluation);
    } catch (error) {
      if (error instanceof ThrowGQL) {
        throw error;
      }
      throw new ThrowGQL(error, GQLThrowType.UNPROCESSABLE);
    }
  }

  async findHistoryByReportId(
    reportId: string,
    pagination?: PaginationInput,
  ): Promise<EvaluationConnection> {
    try {
      const page = pagination?.page || 1;
      const limit = pagination?.limit || 20;
      const skip = (page - 1) * limit;

      const [evaluationsResult, totalCount] = await Promise.all([
        this.evaluationModel
          .find({ reportId })
          .populate('reportId')
          .populate('evaluatedBy')
          .sort({ version: -1 })
          .skip(skip)
          .limit(limit)
          .lean()
          .exec(),
        this.evaluationModel.countDocuments({ reportId }),
      ]);

      const evaluations = evaluationsResult as unknown as EvaluationDocument[];

      const edges: EvaluationEdge[] = evaluations.map(
        (evaluation, index): EvaluationEdge => ({
          node: parseEvaluationToView(evaluation),
          cursor: Buffer.from(`${skip + index}`).toString('base64'),
        }),
      );

      return {
        edges,
        pageInfo: {
          hasNextPage: skip + evaluations.length < totalCount,
          hasPreviousPage: page > 1,
          startCursor: edges[0]?.cursor,
          endCursor: edges[edges.length - 1]?.cursor,
        },
        totalCount,
      };
    } catch (error) {
      throw new ThrowGQL(error, GQLThrowType.UNPROCESSABLE);
    }
  }
}
