import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'bson';
import { ThrowGQL, GQLThrowType } from '@app/gqlerr';
import { UATReport, UATReportDocument } from '../models/uat-report';
import { BatchUploadInput } from '../dto/inputs/batch-upload.input';
import { parseUATReportToView } from '../models/parser';
import { ReportStatus } from '../enums/report-status.enum';
import { BatchUploadResult } from '../dto/views/batch-upload-result.view';

@Injectable()
export class UploadBatchReportsService {
  constructor(
    @InjectModel(UATReport.name)
    private uatReportModel: Model<UATReportDocument>,
  ) {}

  async uploadBatch(
    input: BatchUploadInput,
    userId: string,
  ): Promise<BatchUploadResult> {
    try {
      // Decode base64 data
      const decodedData = Buffer.from(input.data, 'base64').toString('utf-8');

      let parsedData: any[];
      if (input.format === 'JSON') {
        parsedData = JSON.parse(decodedData);
      } else {
        // Parse CSV
        parsedData = this.parseCSV(decodedData);
      }

      const results: {
        totalProcessed: number;
        successful: number;
        failed: number;
        reports: any[];
        errors: Array<{ row: number; message: string; data: string }>;
      } = {
        totalProcessed: parsedData.length,
        successful: 0,
        failed: 0,
        reports: [],
        errors: [],
      };

      for (let i = 0; i < parsedData.length; i++) {
        try {
          const reportData = parsedData[i];
          const report = await this.uatReportModel.create({
            _id: new ObjectId().toString(),
            testIdentity: reportData.testIdentity,
            testEnvironment: reportData.testEnvironment,
            stepsToReproduce: reportData.stepsToReproduce,
            actualResult: reportData.actualResult,
            expectedResult: reportData.expectedResult,
            supportingEvidence: reportData.supportingEvidence || [],
            severityLevel: reportData.severityLevel,
            domain: reportData.domain,
            additionalInfo: reportData.additionalInfo,
            status: ReportStatus.PENDING_EVALUATION,
            createdBy: userId,
          });

          results.reports.push(parseUATReportToView(report));
          results.successful++;
        } catch (error) {
          results.failed++;
          results.errors.push({
            row: i + 1,
            message: error.message || 'Failed to create report',
            data: JSON.stringify(parsedData[i]),
          });
        }
      }

      return results;
    } catch (error) {
      throw new ThrowGQL(error, GQLThrowType.UNPROCESSABLE);
    }
  }

  private parseCSV(csvData: string): any[] {
    // Simple CSV parser (in production, use a library like papaparse)
    const lines = csvData.trim().split('\n');
    const headers = lines[0].split(',').map((h) => h.trim());
    const result: any[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',');
      const obj: any = {};
      headers.forEach((header, index) => {
        obj[header] = values[index]?.trim();
      });
      result.push(obj);
    }

    return result;
  }
}
