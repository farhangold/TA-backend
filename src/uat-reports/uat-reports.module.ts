import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UATReport, UATReportSchema } from './models/uat-report';
import { User, UserSchema } from '../users/models/user';
import { CreateUATReportService } from './services/create-uat-report.service';
import { GetUATReportService } from './services/get-uat-report.service';
import { ListUATReportsService } from './services/list-uat-reports.service';
import { UpdateUATReportService } from './services/update-uat-report.service';
import { DeleteUATReportService } from './services/delete-uat-report.service';
import { UploadBatchReportsService } from './services/upload-batch-reports.service';
import { GetDashboardStatsService } from './services/get-dashboard-stats.service';
import { DeleteBulkUATReportsService } from './services/delete-bulk-uat-reports.service';
import { UATReportsResolver } from './uat-reports.resolver';
import { EvaluationsModule } from '../evaluations/evaluations.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UATReport.name, schema: UATReportSchema },
      { name: User.name, schema: UserSchema },
    ]),
    forwardRef(() => EvaluationsModule),
  ],
  providers: [
    CreateUATReportService,
    GetUATReportService,
    ListUATReportsService,
    UpdateUATReportService,
    DeleteUATReportService,
    DeleteBulkUATReportsService,
    UploadBatchReportsService,
    GetDashboardStatsService,
    UATReportsResolver,
  ],
  exports: [
    CreateUATReportService,
    GetUATReportService,
    ListUATReportsService,
    UpdateUATReportService,
    DeleteUATReportService,
    DeleteBulkUATReportsService,
  ],
})
export class UATReportsModule {}
