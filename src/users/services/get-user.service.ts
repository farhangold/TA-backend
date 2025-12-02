import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ThrowGQL, GQLThrowType } from '@app/gqlerr';
import { User, UserDocument } from '../models/user';
import { parseUserToView } from '../models/parser';
import { UserFilterInput } from '../dto/inputs/user-filter.input';
import { PaginationInput } from '../../common/types';
import { UserView } from '../dto/views/user.view';

@Injectable()
export class GetUserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async findById(id: string): Promise<UserView> {
    try {
      const user = await this.userModel.findOne({ _id: id });
      if (!user) {
        throw new ThrowGQL('User not found', GQLThrowType.NOT_FOUND);
      }
      return parseUserToView(user);
    } catch (error) {
      if (error instanceof ThrowGQL) {
        throw error;
      }
      throw new ThrowGQL(error, GQLThrowType.UNPROCESSABLE);
    }
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    try {
      return await this.userModel.findOne({ email });
    } catch (error) {
      throw new ThrowGQL(error, GQLThrowType.UNPROCESSABLE);
    }
  }

  async findAll(
    filter?: UserFilterInput,
    pagination?: PaginationInput,
  ): Promise<any> {
    try {
      const query: any = {};

      if (filter?.role) {
        query.role = filter.role;
      }

      const page = pagination?.page || 1;
      const limit = pagination?.limit || 20;
      const skip = (page - 1) * limit;

      const [users, totalCount] = await Promise.all([
        this.userModel.find(query).skip(skip).limit(limit).exec(),
        this.userModel.countDocuments(query),
      ]);

      const edges = users.map((user, index) => ({
        node: parseUserToView(user),
        cursor: Buffer.from(`${skip + index}`).toString('base64'),
      }));

      return {
        edges,
        pageInfo: {
          hasNextPage: skip + users.length < totalCount,
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
