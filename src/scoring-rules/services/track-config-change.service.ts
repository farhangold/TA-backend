import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'bson';
import { ThrowGQL, GQLThrowType } from '@app/gqlerr';
import { ConfigHistory, ConfigHistoryDocument } from '../models/config-history';
import { parseConfigHistoryToView } from '../models/parser';
import { ConfigType } from '../enums/config-type.enum';
import { AttributeType } from '../enums/attribute-type.enum';
import { PaginationInput } from '../../common/types';
import { ConfigHistoryView } from '../dto/views/config-history.view';
import { ConfigHistoryConnection } from '../dto/views/config-history-connection.view';

@Injectable()
export class TrackConfigChangeService {
  constructor(
    @InjectModel(ConfigHistory.name)
    private configHistoryModel: Model<ConfigHistoryDocument>,
  ) {}

  async track(
    type: ConfigType,
    changes: any,
    userId: string,
    attribute?: AttributeType,
    reason?: string,
  ): Promise<ConfigHistoryView> {
    try {
      const history = await this.configHistoryModel.create({
        _id: new ObjectId().toString(),
        type,
        attribute,
        changes,
        changedBy: userId,
        changedAt: new Date(),
        reason,
      });

      return parseConfigHistoryToView(history);
    } catch (error) {
      throw new ThrowGQL(error, GQLThrowType.UNPROCESSABLE);
    }
  }

  async getHistory(
    pagination?: PaginationInput,
  ): Promise<ConfigHistoryConnection> {
    try {
      const page = pagination?.page || 1;
      const limit = pagination?.limit || 20;
      const skip = (page - 1) * limit;

      const [history, totalCount] = await Promise.all([
        this.configHistoryModel
          .find()
          .populate('changedBy')
          .sort({ changedAt: -1 })
          .skip(skip)
          .limit(limit)
          .exec(),
        this.configHistoryModel.countDocuments(),
      ]);

      const edges = history.map((item, index) => ({
        node: parseConfigHistoryToView(item),
        cursor: Buffer.from(`${skip + index}`).toString('base64'),
      }));

      return {
        edges,
        pageInfo: {
          hasNextPage: skip + history.length < totalCount,
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
