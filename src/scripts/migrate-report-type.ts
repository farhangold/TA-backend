/**
 * Migration script to add reportType field to existing reports
 *
 * Run this script using: npm run migrate:report-type
 * or: ts-node src/scripts/migrate-report-type.ts
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { Model } from 'mongoose';
import { UATReportDocument } from '../uat-reports/models/uat-report';
import { EvaluationDocument } from '../evaluations/models/evaluation';
import { ReportType } from '../uat-reports/enums/report-type.enum';

async function migrateReportType() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const uatReportModel = app.get<Model<UATReportDocument>>('UATReportModel');
    const evaluationModel =
      app.get<Model<EvaluationDocument>>('EvaluationModel');

    console.log('Starting migration: Adding reportType to existing reports...');

    // Get all reports without reportType
    const reports = await uatReportModel
      .find({
        $or: [{ reportType: { $exists: false } }, { reportType: null }],
      })
      .exec();

    console.log(`Found ${reports.length} reports to migrate`);

    let bugReportCount = 0;
    let successReportCount = 0;

    for (const report of reports) {
      // Classify based on stepsToReproduce and supportingEvidence
      const hasSteps =
        report.stepsToReproduce &&
        Array.isArray(report.stepsToReproduce) &&
        report.stepsToReproduce.length > 0 &&
        report.stepsToReproduce.some((s: string) => s && s.trim().length > 0);

      const hasEvidence =
        report.supportingEvidence &&
        Array.isArray(report.supportingEvidence) &&
        report.supportingEvidence.length > 0;

      const reportType =
        hasSteps && hasEvidence
          ? ReportType.BUG_REPORT
          : ReportType.SUCCESS_REPORT;

      await uatReportModel.updateOne(
        { _id: report._id },
        { $set: { reportType } },
      );

      if (reportType === ReportType.BUG_REPORT) {
        bugReportCount++;
      } else {
        successReportCount++;
      }
    }

    console.log(`Migration completed:`);
    console.log(`- Bug Reports: ${bugReportCount}`);
    console.log(`- Success Reports: ${successReportCount}`);

    // Update evaluations to include reportType from their reports
    console.log('Updating evaluations with reportType...');

    const evaluations = await evaluationModel
      .find({
        $or: [{ reportType: { $exists: false } }, { reportType: null }],
      })
      .exec();

    console.log(`Found ${evaluations.length} evaluations to update`);

    for (const evaluation of evaluations) {
      const report = await uatReportModel
        .findOne({ _id: evaluation.reportId })
        .exec();

      if (report && report.reportType) {
        await evaluationModel.updateOne(
          { _id: evaluation._id },
          { $set: { reportType: report.reportType } },
        );
      }
    }

    console.log('Evaluation migration completed');
    console.log('Migration finished successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  } finally {
    await app.close();
  }
}

// Run migration if executed directly
if (require.main === module) {
  migrateReportType()
    .then(() => {
      console.log('Migration script completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Migration script failed:', error);
      process.exit(1);
    });
}

export { migrateReportType };
