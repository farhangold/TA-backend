import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ThrowGQL, GQLThrowType } from '@app/gqlerr';
import { UATReport, UATReportDocument } from '../models/uat-report';
import { parseUATReportToView } from '../models/parser';
import { UATReportView } from '../dto/views/uat-report.view';

@Injectable()
export class GetUATReportService {
  constructor(
    @InjectModel(UATReport.name)
    private uatReportModel: Model<UATReportDocument>,
  ) {}

  async findById(id: string): Promise<UATReportView> {
    try {
      const report = await this.uatReportModel
        .findOne({ _id: id })
        .populate('createdBy')
        .exec();

      if (!report) {
        throw new ThrowGQL('UAT Report not found', GQLThrowType.NOT_FOUND);
      }

      return parseUATReportToView(report);
    } catch (error) {
      if (error instanceof ThrowGQL) {
        throw error;
      }
      throw new ThrowGQL(error, GQLThrowType.UNPROCESSABLE);
    }
  }
}
