import { Resolver, Query, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard, RolesGuard } from '../common/guards';
import { Roles } from '../common/decorators';
import { GetAuditLogsService } from './services/get-audit-logs.service';
import { AuditLogConnection } from './dto/views/audit-log-connection.view';
import { AuditLogFilterInput } from './dto/inputs/audit-log-filter.input';
import { PaginationInput } from '../common/types';

@Resolver()
export class AuditLogsResolver {
  constructor(private readonly getAuditLogsService: GetAuditLogsService) {}

  @Query(() => AuditLogConnection, { name: 'getAuditLogs' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async getAuditLogs(
    @Args('filter', { nullable: true }) filter?: AuditLogFilterInput,
    @Args('pagination', { nullable: true }) pagination?: PaginationInput,
  ): Promise<AuditLogConnection> {
    return this.getAuditLogsService.findAll(filter, pagination);
  }
}
