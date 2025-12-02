import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ThrowGQL, GQLThrowType } from '@app/gqlerr';
import { UATReport, UATReportDocument } from '../models/uat-report';

@Injectable()
export class DeleteUATReportService {
  constructor(
    @InjectModel(UATReport.name)
    private uatReportModel: Model<UATReportDocument>,
  ) {}

  async delete(id: string): Promise<boolean> {
    try {
      const result = await this.uatReportModel.deleteOne({ _id: id });

      if (result.deletedCount === 0) {
        throw new ThrowGQL('UAT Report not found', GQLThrowType.NOT_FOUND);
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
