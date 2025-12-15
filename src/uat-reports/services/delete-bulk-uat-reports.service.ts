import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ThrowGQL, GQLThrowType } from '@app/gqlerr';
import { UATReport, UATReportDocument } from '../models/uat-report';

@Injectable()
export class DeleteBulkUATReportsService {
  constructor(
    @InjectModel(UATReport.name)
    private readonly uatReportModel: Model<UATReportDocument>,
  ) {}

  async deleteByIds(ids: string[]): Promise<boolean> {
    if (!ids || ids.length === 0) {
      throw new ThrowGQL(
        'No UAT Report IDs provided',
        GQLThrowType.UNPROCESSABLE,
      );
    }

    try {
      const result = await this.uatReportModel.deleteMany({
        _id: { $in: ids },
      });

      if (result.deletedCount === 0) {
        throw new ThrowGQL(
          'No UAT Reports found for the provided IDs',
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

  async deleteAll(): Promise<boolean> {
    try {
      await this.uatReportModel.deleteMany({});
      return true;
    } catch (error) {
      if (error instanceof ThrowGQL) {
        throw error;
      }
      throw new ThrowGQL(error, GQLThrowType.UNPROCESSABLE);
    }
  }
}


