import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ThrowGQL, GQLThrowType } from '@app/gqlerr';
import { UATReport, UATReportDocument } from '../models/uat-report';
import { parseUATReportToView } from '../models/parser';
import { UATReportFilterInput } from '../dto/inputs/uat-report-filter.input';
import { UATReportSortInput } from '../dto/inputs/uat-report-sort.input';
import { PaginationInput } from '../../common/types';
import { UATReportConnection } from '../dto/views/uat-report-connection.view';

@Injectable()
export class ListUATReportsService {
  constructor(
    @InjectModel(UATReport.name)
    private uatReportModel: Model<UATReportDocument>,
  ) {}

  async findAll(
    filter?: UATReportFilterInput,
    sort?: UATReportSortInput,
    pagination?: PaginationInput,
  ): Promise<UATReportConnection> {
    try {
      const query: any = {};

      // Apply filters
      if (filter?.status && filter.status.length > 0) {
        query.status = { $in: filter.status };
      }

      if (filter?.severityLevel && filter.severityLevel.length > 0) {
        query.severityLevel = { $in: filter.severityLevel };
      }

      if (filter?.domain) {
        query.domain = filter.domain;
      }

      if (filter?.createdBy) {
        query.createdBy = filter.createdBy;
      }

      if (filter?.dateRange) {
        query.createdAt = {
          $gte: filter.dateRange.from,
          $lte: filter.dateRange.to,
        };
      }

      // Sorting
      const sortField = this.mapSortField(sort?.field);
      const sortDirection = sort?.direction === 'DESC' ? -1 : 1;
      const sortOptions: any = sortField
        ? { [sortField]: sortDirection }
        : { createdAt: -1 };

      // Pagination
      const page = pagination?.page || 1;
      const limit = pagination?.limit || 20;
      const skip = (page - 1) * limit;

      const [reports, totalCount] = await Promise.all([
        this.uatReportModel
          .find(query)
          .populate('createdBy')
          .sort(sortOptions)
          .skip(skip)
          .limit(limit)
          .exec(),
        this.uatReportModel.countDocuments(query),
      ]);

      const edges = reports.map((report, index) => ({
        node: parseUATReportToView(report),
        cursor: Buffer.from(`${skip + index}`).toString('base64'),
      }));

      return {
        edges,
        pageInfo: {
          hasNextPage: skip + reports.length < totalCount,
          hasPreviousPage: page > 1,
          startCursor: edges[0]?.cursor,
          endCursor: edges[edges.length - 1]?.cursor,
        },
        totalCount,
      };
    } catch (error) {
      throw new ThrowGQL(error, GQLThrowType.UNPROCESSABLE);
    }
  }

  private mapSortField(field?: string): string {
    const fieldMap: Record<string, string> = {
      CREATED_AT: 'createdAt',
      UPDATED_AT: 'updatedAt',
      SCORE: 'score',
      SEVERITY: 'severityLevel',
      STATUS: 'status',
    };

    return field ? fieldMap[field] || 'createdAt' : 'createdAt';
  }
}
