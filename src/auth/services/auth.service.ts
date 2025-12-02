import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'bson';
import * as bcrypt from 'bcrypt';
import { ThrowGQL, GQLThrowType } from '@app/gqlerr';
import { GetUserService } from '../../users/services/get-user.service';
import { TokenService } from './token.service';
import { LoginInput } from '../dto/inputs/login.input';
import { PublicRegisterInput } from '../dto/inputs/public-register.input';
import { User, UserDocument } from '../../users/models/user';
import { UserRole } from '../../users/enums/user-role.enum';
import { parseUserToView } from '../../users/models/parser';

@Injectable()
export class AuthService {
  constructor(
    private getUserService: GetUserService,
    private tokenService: TokenService,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async login(input: LoginInput): Promise<any> {
    try {
      // Find user by email
      const user = await this.getUserService.findByEmail(input.email);
      if (!user) {
        throw new ThrowGQL('Invalid credentials', GQLThrowType.NOT_AUTHORIZED);
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(
        input.password,
        user.password,
      );
      if (!isPasswordValid) {
        throw new ThrowGQL('Invalid credentials', GQLThrowType.NOT_AUTHORIZED);
      }

      // Generate tokens
      const accessToken = this.tokenService.generateAccessToken(
        user._id,
        user.email,
      );
      const refreshToken = this.tokenService.generateRefreshToken(
        user._id,
        user.email,
      );

      return {
        accessToken,
        refreshToken,
        user: parseUserToView(user),
      };
    } catch (error) {
      if (error instanceof ThrowGQL) {
        throw error;
      }
      throw new ThrowGQL(error, GQLThrowType.UNPROCESSABLE);
    }
  }

  async refreshToken(token: string): Promise<any> {
    try {
      // Verify refresh token
      const payload = this.tokenService.verifyRefreshToken(token);
      if (!payload) {
        throw new ThrowGQL(
          'Invalid refresh token',
          GQLThrowType.NOT_AUTHORIZED,
        );
      }

      // Get user
      const user = await this.getUserService.findById(payload.sub);
      if (!user) {
        throw new ThrowGQL('User not found', GQLThrowType.NOT_FOUND);
      }

      // Generate new tokens
      const accessToken = this.tokenService.generateAccessToken(
        user._id,
        user.email,
      );
      const refreshToken = this.tokenService.generateRefreshToken(
        user._id,
        user.email,
      );

      return {
        accessToken,
        refreshToken,
        user,
      };
    } catch (error) {
      if (error instanceof ThrowGQL) {
        throw error;
      }
      throw new ThrowGQL(error, GQLThrowType.UNPROCESSABLE);
    }
  }

  async logout(): Promise<boolean> {
    // In a production system, you might want to blacklist the token
    // For now, we'll just return true as the client will remove the token
    return true;
  }

  async publicRegister(input: PublicRegisterInput): Promise<any> {
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

      // Create user with VIEWER role
      const user = await this.userModel.create({
        _id: new ObjectId().toString(),
        email: input.email,
        name: input.name,
        password: hashedPassword,
        role: UserRole.VIEWER,
      });

      // Generate tokens
      const accessToken = this.tokenService.generateAccessToken(
        user._id,
        user.email,
      );
      const refreshToken = this.tokenService.generateRefreshToken(
        user._id,
        user.email,
      );

      return {
        accessToken,
        refreshToken,
        user: parseUserToView(user),
      };
    } catch (error) {
      if (error instanceof ThrowGQL) {
        throw error;
      }
      throw new ThrowGQL(error, GQLThrowType.UNPROCESSABLE);
    }
  }
}
