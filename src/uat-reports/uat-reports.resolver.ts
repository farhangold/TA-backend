/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard, RolesGuard } from '../common/guards';
import { Roles, CurrentUser } from '../common/decorators';
import { CreateUATReportService } from './services/create-uat-report.service';
import { GetUATReportService } from './services/get-uat-report.service';
import { ListUATReportsService } from './services/list-uat-reports.service';
import { UpdateUATReportService } from './services/update-uat-report.service';
import { DeleteUATReportService } from './services/delete-uat-report.service';
import { UploadBatchReportsService } from './services/upload-batch-reports.service';
import { GetDashboardStatsService } from './services/get-dashboard-stats.service';
import { UATReportView } from './dto/views/uat-report.view';
import { UATReportConnection } from './dto/views/uat-report-connection.view';
import { BatchUploadResult } from './dto/views/batch-upload-result.view';
import { DashboardStatsView } from './dto/views/dashboard-stats.view';
import { CreateUATReportInput } from './dto/inputs/create-uat-report.input';
import { UpdateUATReportInput } from './dto/inputs/update-uat-report.input';
import { BatchUploadInput } from './dto/inputs/batch-upload.input';
import { UATReportFilterInput } from './dto/inputs/uat-report-filter.input';
import { UATReportSortInput } from './dto/inputs/uat-report-sort.input';
import { PaginationInput } from '../common/types';
import { UserView } from '../users/dto/views/user.view';

@Resolver(() => UATReportView)
export class UATReportsResolver {
  constructor(
    private readonly createUATReportService: CreateUATReportService,
    private readonly getUATReportService: GetUATReportService,
    private readonly listUATReportsService: ListUATReportsService,
    private readonly updateUATReportService: UpdateUATReportService,
    private readonly deleteUATReportService: DeleteUATReportService,
    private readonly uploadBatchReportsService: UploadBatchReportsService,
    private readonly getDashboardStatsService: GetDashboardStatsService,
  ) {}

  @Mutation(() => UATReportView, { name: 'createUATReport' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'REVIEWER')
  async createUATReport(
    @Args('input') input: CreateUATReportInput,
    @CurrentUser() user: UserView,
  ): Promise<UATReportView> {
    return await this.createUATReportService.create(input, user._id);
  }

  @Mutation(() => BatchUploadResult, { name: 'uploadBatchReports' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'REVIEWER')
  async uploadBatchReports(
    @Args('input') input: BatchUploadInput,
    @CurrentUser() user: UserView,
  ): Promise<BatchUploadResult> {
    return await this.uploadBatchReportsService.uploadBatch(input, user._id);
  }

  @Mutation(() => UATReportView, { name: 'updateUATReport' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'REVIEWER')
  async updateUATReport(
    @Args('id') id: string,
    @Args('input') input: UpdateUATReportInput,
  ): Promise<UATReportView> {
    return await this.updateUATReportService.update(id, input);
  }

  @Mutation(() => Boolean, { name: 'deleteUATReport' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async deleteUATReport(@Args('id') id: string): Promise<boolean> {
    return await this.deleteUATReportService.delete(id);
  }

  @Query(() => UATReportView, { name: 'getUATReport' })
  @UseGuards(JwtAuthGuard)
  async getUATReport(@Args('id') id: string): Promise<UATReportView> {
    return await this.getUATReportService.findById(id);
  }

  @Query(() => UATReportConnection, { name: 'getUATReports' })
  @UseGuards(JwtAuthGuard)
  async getUATReports(
    @Args('filter', { nullable: true }) filter?: UATReportFilterInput,
    @Args('sort', { nullable: true }) sort?: UATReportSortInput,
    @Args('pagination', { nullable: true }) pagination?: PaginationInput,
  ): Promise<UATReportConnection> {
    return await this.listUATReportsService.findAll(filter, sort, pagination);
  }

  @Query(() => DashboardStatsView, { name: 'getDashboardStats' })
  @UseGuards(JwtAuthGuard)
  async getDashboardStats(): Promise<DashboardStatsView> {
    return await this.getDashboardStatsService.getStats();
  }
}
