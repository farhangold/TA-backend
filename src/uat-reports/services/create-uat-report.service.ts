import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'bson';
import { ThrowGQL, GQLThrowType } from '@app/gqlerr';
import { UATReport, UATReportDocument } from '../models/uat-report';
import { CreateUATReportInput } from '../dto/inputs/create-uat-report.input';
import { parseUATReportToView } from '../models/parser';
import { ReportStatus } from '../enums/report-status.enum';
import { UATReportView } from '../dto/views/uat-report.view';

@Injectable()
export class CreateUATReportService {
  constructor(
    @InjectModel(UATReport.name)
    private uatReportModel: Model<UATReportDocument>,
  ) {}

  async create(
    input: CreateUATReportInput,
    userId: string,
  ): Promise<UATReportView> {
    try {
      const report = await this.uatReportModel.create({
        _id: new ObjectId().toString(),
        ...input,
        supportingEvidence: input.supportingEvidence || [],
        status: ReportStatus.PENDING_EVALUATION,
        createdBy: userId,
      });

      return parseUATReportToView(report);
    } catch (error) {
      throw new ThrowGQL(error, GQLThrowType.UNPROCESSABLE);
    }
  }
}
