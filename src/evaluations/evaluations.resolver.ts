import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard, RolesGuard } from '../common/guards';
import { Roles, CurrentUser } from '../common/decorators';
import { EvaluateReportService } from './services/evaluate-report.service';
import { GetEvaluationService } from './services/get-evaluation.service';
import { BatchEvaluateReportsService } from './services/batch-evaluate-reports.service';
import { EvaluationView } from './dto/views/evaluation.view';
import { EvaluationConnection } from './dto/views/evaluation-connection.view';
import { UATReportView } from '../uat-reports/dto/views/uat-report.view';
import { UserView } from '../users/dto/views/user.view';
import { GetUATReportService } from '../uat-reports/services/get-uat-report.service';
import { GetUserService } from '../users/services/get-user.service';
import { PaginationInput } from '../common/types';

@Resolver(() => EvaluationView)
export class EvaluationsResolver {
  constructor(
    private readonly evaluateReportService: EvaluateReportService,
    private readonly getEvaluationService: GetEvaluationService,
    private readonly batchEvaluateReportsService: BatchEvaluateReportsService,
    private readonly getUATReportService: GetUATReportService,
    private readonly getUserService: GetUserService,
  ) {}

  @Mutation(() => EvaluationView, { name: 'evaluateReport' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'REVIEWER')
  async evaluateReport(
    @Args('id') id: string,
    @CurrentUser() user: UserView,
  ): Promise<EvaluationView> {
    return await this.evaluateReportService.evaluate(id, user._id);
  }

  @Mutation(() => [EvaluationView], { name: 'evaluateBatchReports' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'REVIEWER')
  async evaluateBatchReports(
    @Args('ids', { type: () => [String] }) ids: string[],
    @CurrentUser() user: UserView,
  ): Promise<EvaluationView[]> {
    return await this.batchEvaluateReportsService.evaluateBatch(ids, user._id);
  }

  @Query(() => EvaluationView, { name: 'getEvaluation' })
  @UseGuards(JwtAuthGuard)
  async getEvaluation(
    @Args('reportId') reportId: string,
  ): Promise<EvaluationView> {
    return this.getEvaluationService.findByReportId(reportId);
  }

  @Query(() => EvaluationConnection, { name: 'getEvaluationHistory' })
  @UseGuards(JwtAuthGuard)
  async getEvaluationHistory(
    @Args('reportId') reportId: string,
    @Args('pagination', { nullable: true }) pagination?: PaginationInput,
  ): Promise<EvaluationConnection> {
    return this.getEvaluationService.findHistoryByReportId(
      reportId,
      pagination,
    );
  }

  @ResolveField(() => UATReportView, { name: 'report' })
  async getReport(
    @Parent() evaluation: EvaluationView,
  ): Promise<UATReportView> {
    // Check if reportId is already populated (object) or just a string ID
    if (
      typeof evaluation.reportId === 'object' &&
      evaluation.reportId !== null
    ) {
      // Already populated
      return evaluation.reportId as UATReportView;
    }
    return await this.getUATReportService.findById(evaluation.reportId);
  }

  @ResolveField(() => UserView, { name: 'evaluatedBy', nullable: true })
  async getEvaluatedBy(
    @Parent() evaluation: EvaluationView,
  ): Promise<UserView | null> {
    if (!evaluation.evaluatedBy) {
      return null;
    }
    // Check if evaluatedBy is already populated (object) or just a string ID
    if (
      typeof evaluation.evaluatedBy === 'object' &&
      evaluation.evaluatedBy !== null
    ) {
      // Already populated
      return evaluation.evaluatedBy;
    }
    return await this.getUserService.findById(evaluation.evaluatedBy);
  }
}
