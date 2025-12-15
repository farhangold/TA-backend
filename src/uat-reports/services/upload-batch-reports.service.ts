import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'bson';
import { ThrowGQL, GQLThrowType } from '@app/gqlerr';
import { UATReport, UATReportDocument } from '../models/uat-report';
import { BatchUploadInput } from '../dto/inputs/batch-upload.input';
import { parseUATReportToView } from '../models/parser';
import { ReportStatus } from '../enums/report-status.enum';
import { ReportType } from '../enums/report-type.enum';
import { BatchUploadResult } from '../dto/views/batch-upload-result.view';
import { TestIdentity } from '../models/test-identity';
import { TestEnvironment } from '../models/test-environment';
import { Evidence } from '../models/evidence';
import { EvidenceType } from '../enums/evidence-type.enum';
import { SeverityLevel } from '../enums/severity-level.enum';
import { EvaluateReportService } from '../../evaluations/services/evaluate-report.service';

@Injectable()
export class UploadBatchReportsService {
  constructor(
    @InjectModel(UATReport.name)
    private uatReportModel: Model<UATReportDocument>,
    @Inject(forwardRef(() => EvaluateReportService))
    private evaluateReportService: EvaluateReportService,
  ) {}

  async uploadBatch(
    input: BatchUploadInput,
    userId: string,
  ): Promise<BatchUploadResult> {
    try {
      // Handle both base64 and plain text
      let decodedData: string;

      // Check if data looks like plain text (starts with JSON/CSV characters)
      const isPlainText =
        input.data.trim().startsWith('[') ||
        input.data.trim().startsWith('{') ||
        input.data.includes('\n') ||
        input.data.includes(',');

      if (isPlainText) {
        // Use as plain text (no base64 decoding needed)
        decodedData = input.data;
      } else {
        // Try to decode as base64 (for backward compatibility)
        try {
          const decoded = Buffer.from(input.data, 'base64').toString('utf-8');
          // Verify decoded data is valid text (not binary garbage)
          if (decoded && decoded.length > 0 && !decoded.includes('\0')) {
            decodedData = decoded;
          } else {
            // Decoded data is invalid, use original
            decodedData = input.data;
          }
        } catch {
          // If base64 decode fails, use as-is
          decodedData = input.data;
        }
      }

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

      // Track duplicates within the same batch (in-memory)
      const seenKeys = new Set<string>();

      for (let i = 0; i < parsedData.length; i++) {
        try {
          const reportData = parsedData[i];

          // Parse and transform data
          const testIdentity: TestIdentity = {
            testId:
              reportData['test id'] ||
              reportData.testId ||
              reportData.testIdentity?.testId ||
              '',
            title: reportData.title || reportData.testIdentity?.title || '',
            version:
              reportData.version || reportData.testIdentity?.version || '1.0',
          };

          const environment = this.parseEnvironment(
            reportData.environment || reportData.testEnvironment || reportData,
          );

          const stepsToReproduce = this.parseStepsToReproduce(
            reportData['step to reproduce'] ||
              reportData.stepToReproduce ||
              reportData.stepsToReproduce,
          );

          const evidence = this.parseEvidence(
            reportData.evidence || reportData.supportingEvidence,
          );

          // Classify report type
          const reportType = this.classifyReportType(
            stepsToReproduce,
            evidence,
          );

          // Build report object
          const reportObj: any = {
            _id: new ObjectId().toString(),
            reportType,
            testIdentity,
            testEnvironment: environment,
            actualResult:
              reportData.description || reportData.actualResult || '',
            expectedResult: reportData.expectedResult || null,
            severityLevel: reportData.severityLevel || SeverityLevel.MEDIUM,
            domain: reportData.domain || null,
            additionalInfo: reportData.additionalInfo || null,
            status: ReportStatus.PENDING_EVALUATION,
            createdBy: userId,
          };

          // Build redundancy key: same user + same testId + version + domain + actualResult
          const dedupeKey = [
            userId,
            testIdentity.testId || '',
            testIdentity.version || '',
            reportObj.domain || '',
            reportObj.actualResult || '',
          ].join('||');

          // 1) Check duplicates within the same uploaded file
          if (seenKeys.has(dedupeKey)) {
            results.failed++;
            results.errors.push({
              row: i + 1,
              message:
                'Data redundan di dalam file upload: kombinasi Test ID, versi, domain, dan actual result sudah muncul sebelumnya.',
              data: JSON.stringify(parsedData[i]),
            });
            continue;
          }

          // 2) Check duplicates against existing data in database
          const existing = await this.uatReportModel.findOne({
            'testIdentity.testId': testIdentity.testId,
            'testIdentity.version': testIdentity.version,
            domain: reportObj.domain || null,
            actualResult: reportObj.actualResult,
            createdBy: userId,
          });

          if (existing) {
            results.failed++;
            results.errors.push({
              row: i + 1,
              message:
                'Data redundan: laporan dengan Test ID, versi, domain, dan actual result yang sama sudah tersimpan sebelumnya.',
              data: JSON.stringify(parsedData[i]),
            });
            continue;
          }

          // Mark as seen for this batch
          seenKeys.add(dedupeKey);

          // Only set these for Bug Reports
          if (reportType === ReportType.BUG_REPORT) {
            reportObj.stepsToReproduce = stepsToReproduce;
            reportObj.supportingEvidence = evidence;
          } else {
            reportObj.stepsToReproduce = null;
            reportObj.supportingEvidence = null;
          }

          const report = await this.uatReportModel.create(reportObj);

          // Auto-evaluate the report
          try {
            await this.evaluateReportService.evaluate(report._id, userId);
          } catch (evalError) {
            // Log evaluation error but don't fail the upload
            console.error(
              `Failed to evaluate report ${report._id}:`,
              evalError,
            );
          }

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

  private classifyReportType(
    stepsToReproduce: string[] | null,
    evidence: Evidence[] | null,
  ): ReportType {
    const hasSteps =
      stepsToReproduce &&
      stepsToReproduce.length > 0 &&
      stepsToReproduce.some((s) => s && s.trim().length > 0);
    const hasEvidence = evidence && evidence.length > 0;

    if (hasSteps && hasEvidence) {
      return ReportType.BUG_REPORT;
    }
    return ReportType.SUCCESS_REPORT;
  }

  private parseEnvironment(env: any): TestEnvironment {
    // Handle object format: {OS, Device, Browser} or {os, device, browser}
    if (typeof env === 'object' && env !== null && !Array.isArray(env)) {
      return {
        os: env.OS || env.os || env['Operating System'] || '',
        device: env.Device || env.device || '',
        browser: env.Browser || env.browser || '',
        additionalInfo: env.additionalInfo || null,
      };
    }

    // Handle string format: "OS, Device, Browser" with comma delimiter
    if (typeof env === 'string' && env.trim().length > 0) {
      const parts = env.split(',').map((s) => s.trim());
      return {
        os: parts[0] || '',
        device: parts[1] || '',
        browser: parts[2] || '',
      };
    }

    // Default empty environment
    return {
      os: '',
      device: '',
      browser: '',
    };
  }

  private parseStepsToReproduce(steps: any): string[] | null {
    if (!steps) return null;

    // If already an array
    if (Array.isArray(steps)) {
      return steps.filter((s) => s && s.trim().length > 0);
    }

    // If string, split by various delimiters
    if (typeof steps === 'string') {
      const delimiters = ['|', ';', '\n', '\\n'];
      let result: string[] = [steps];

      for (const delimiter of delimiters) {
        const split = result.flatMap((s) => s.split(delimiter));
        if (split.length > result.length) {
          result = split;
        }
      }

      return result.map((s) => s.trim()).filter((s) => s.length > 0);
    }

    return null;
  }

  private parseEvidence(evidence: any): Evidence[] | null {
    if (!evidence) return null;

    // If already an array of Evidence objects
    if (Array.isArray(evidence)) {
      return evidence.map((e) => {
        if (typeof e === 'string') {
          return {
            type: EvidenceType.SCREENSHOT,
            url: e,
            description: null,
          };
        }
        // e is expected to be an object with shape similar to Evidence
        const url =
          typeof e.url === 'string'
            ? e.url
            : typeof e === 'string'
            ? e
            : '';

        return {
          type: e.type || EvidenceType.SCREENSHOT,
          url,
          description: e.description || null,
        };
      });
    }

    // If string, split by delimiters
    if (typeof evidence === 'string') {
      const delimiters = [';', ',', '|', '\n', '\\n'];
      let result: string[] = [evidence];

      for (const delimiter of delimiters) {
        const split = result.flatMap((s) => s.split(delimiter));
        if (split.length > result.length) {
          result = split;
        }
      }

      return result
        .map((url) => url.trim())
        .filter((url) => url.length > 0)
        .map((url) => ({
          type: EvidenceType.SCREENSHOT,
          url,
          description: null,
        }));
    }

    return null;
  }

  private parseCSV(csvData: string): any[] {
    // Improved CSV parser that handles quoted values
    const lines = csvData.trim().split('\n');
    if (lines.length < 2) return [];

    // Parse header
    const headers = this.parseCSVLine(lines[0]);

    const result: any[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = this.parseCSVLine(lines[i]);
      const obj: any = {};

      headers.forEach((header, index) => {
        const value = values[index]?.trim() || '';
        obj[header] = value;
      });

      result.push(obj);
    }

    return result;
  }

  private parseCSVLine(line: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }

    result.push(current.trim());
    return result;
  }
}
