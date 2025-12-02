import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ThrowGQL, GQLThrowType } from '@app/gqlerr';
import { AuditLog, AuditLogDocument } from '../models/audit-log';
import { AuditLogFilterInput } from '../dto/inputs/audit-log-filter.input';
import { PaginationInput } from '../../common/types';

@Injectable()
export class GetAuditLogsService {
  constructor(
    @InjectModel(AuditLog.name)
    private auditLogModel: Model<AuditLogDocument>,
  ) {}

  async findAll(
    filter?: AuditLogFilterInput,
    pagination?: PaginationInput,
  ): Promise<any> {
    try {
      const query: any = {};

      if (filter?.userId) {
        query.user = filter.userId;
      }

      if (filter?.action && filter.action.length > 0) {
        query.action = { $in: filter.action };
      }

      if (filter?.entity && filter.entity.length > 0) {
        query.entity = { $in: filter.entity };
      }

      if (filter?.dateRange) {
        query.timestamp = {
          $gte: filter.dateRange.from,
          $lte: filter.dateRange.to,
        };
      }

      const page = pagination?.page || 1;
      const limit = pagination?.limit || 20;
      const skip = (page - 1) * limit;

      const [logs, totalCount] = await Promise.all([
        this.auditLogModel
          .find(query)
          .populate('user')
          .sort({ timestamp: -1 })
          .skip(skip)
          .limit(limit)
          .exec(),
        this.auditLogModel.countDocuments(query),
      ]);

      const edges = logs.map((log, index) => ({
        node: log.toObject(),
        cursor: Buffer.from(`${skip + index}`).toString('base64'),
      }));

      return {
        edges,
        pageInfo: {
          hasNextPage: skip + logs.length < totalCount,
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
}
