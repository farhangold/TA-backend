import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ThrowGQL, GQLThrowType } from '@app/gqlerr';
import { UATReport, UATReportDocument } from '../models/uat-report';
import { DashboardStatsView } from '../dto/views/dashboard-stats.view';
import { ReportStatus } from '../enums/report-status.enum';

@Injectable()
export class GetDashboardStatsService {
  constructor(
    @InjectModel(UATReport.name)
    private uatReportModel: Model<UATReportDocument>,
  ) {}

  async getStats(): Promise<DashboardStatsView> {
    try {
      // Use MongoDB aggregation pipeline for efficient counting
      const stats = await this.uatReportModel.aggregate([
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 },
          },
        },
      ]);

      // Initialize counts
      const counts: Record<string, number> = {
        [ReportStatus.PENDING_EVALUATION]: 0,
        [ReportStatus.EVALUATING]: 0,
        [ReportStatus.VALID]: 0,
        [ReportStatus.INVALID]: 0,
        [ReportStatus.FAILED]: 0,
      };

      // Populate counts from aggregation results
      stats.forEach((stat) => {
        counts[stat._id] = stat.count;
      });

      // Get total count
      const totalReports = await this.uatReportModel.countDocuments();

      return {
        totalReports,
        validReports: counts[ReportStatus.VALID] || 0,
        invalidReports: (counts[ReportStatus.INVALID] || 0) + (counts[ReportStatus.FAILED] || 0),
        pendingReports: counts[ReportStatus.PENDING_EVALUATION] || 0,
        evaluatingReports: counts[ReportStatus.EVALUATING] || 0,
        failedReports: counts[ReportStatus.FAILED] || 0,
        newReports: counts[ReportStatus.PENDING_EVALUATION] || 0,
        verifyingReports:
          (counts[ReportStatus.PENDING_EVALUATION] || 0) +
          (counts[ReportStatus.EVALUATING] || 0),
      };
    } catch (error) {
      throw new ThrowGQL(error, GQLThrowType.UNPROCESSABLE);
    }
  }
}

