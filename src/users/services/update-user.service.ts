import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { ThrowGQL, GQLThrowType } from '@app/gqlerr';
import { User, UserDocument } from '../models/user';
import { UpdateUserInput } from '../dto/inputs/update-user.input';
import { parseUserToView } from '../models/parser';

@Injectable()
export class UpdateUserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async update(id: string, input: UpdateUserInput): Promise<any> {
    try {
      const updateData: any = {};

      if (input.name) {
        updateData.name = input.name;
      }

      if (input.password) {
        updateData.password = await bcrypt.hash(input.password, 10);
      }

      if (input.role) {
        updateData.role = input.role;
      }

      const user = await this.userModel.findOneAndUpdate(
        { _id: id },
        { $set: updateData },
        { new: true },
      );

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
}
