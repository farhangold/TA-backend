import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'bson';
import * as bcrypt from 'bcrypt';
import { ThrowGQL, GQLThrowType } from '@app/gqlerr';
import { User, UserDocument } from '../models/user';
import { RegisterUserInput } from '../dto/inputs/register-user.input';
import { parseUserToView } from '../models/parser';

@Injectable()
export class CreateUserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async create(input: RegisterUserInput): Promise<any> {
    try {
      // Check if user already exists
      const existingUser = await this.userModel.findOne({ email: input.email });
      if (existingUser) {
        throw new ThrowGQL(
          'User with this email already exists',
          GQLThrowType.DUPLICATE,
        );
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(input.password, 10);

      // Create user
      const user = await this.userModel.create({
        _id: new ObjectId().toString(),
        email: input.email,
        name: input.name,
        password: hashedPassword,
        role: input.role,
      });

      return parseUserToView(user);
    } catch (error) {
      if (error instanceof ThrowGQL) {
        throw error;
      }
      throw new ThrowGQL(error, GQLThrowType.UNPROCESSABLE);
    }
  }
}
