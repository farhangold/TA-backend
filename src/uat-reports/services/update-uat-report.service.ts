import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ThrowGQL, GQLThrowType } from '@app/gqlerr';
import { UATReport, UATReportDocument } from '../models/uat-report';
import { UpdateUATReportInput } from '../dto/inputs/update-uat-report.input';
import { parseUATReportToView } from '../models/parser';
import { UATReportView } from '../dto/views/uat-report.view';

@Injectable()
export class UpdateUATReportService {
  constructor(
    @InjectModel(UATReport.name)
    private uatReportModel: Model<UATReportDocument>,
  ) {}

  async update(id: string, input: UpdateUATReportInput): Promise<UATReportView> {
    try {
      const updateData: any = {};

      if (input.testIdentity) {
        updateData.testIdentity = input.testIdentity;
      }

      if (input.testEnvironment) {
        updateData.testEnvironment = input.testEnvironment;
      }

      if (input.stepsToReproduce) {
        updateData.stepsToReproduce = input.stepsToReproduce;
      }

      if (input.actualResult) {
        updateData.actualResult = input.actualResult;
      }

      if (input.expectedResult) {
        updateData.expectedResult = input.expectedResult;
      }

      if (input.supportingEvidence) {
        updateData.supportingEvidence = input.supportingEvidence;
      }

      if (input.severityLevel) {
        updateData.severityLevel = input.severityLevel;
      }

      if (input.domain !== undefined) {
        updateData.domain = input.domain;
      }

      if (input.additionalInfo !== undefined) {
        updateData.additionalInfo = input.additionalInfo;
      }

      const report = await this.uatReportModel
        .findOneAndUpdate({ _id: id }, { $set: updateData }, { new: true })
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
