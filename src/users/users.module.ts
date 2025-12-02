import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './models/user';
import { CreateUserService } from './services/create-user.service';
import { GetUserService } from './services/get-user.service';
import { UpdateUserService } from './services/update-user.service';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    CreateUserService,
    GetUserService,
    UpdateUserService,
    UsersResolver,
  ],
  exports: [CreateUserService, GetUserService, UpdateUserService],
})
export class UsersModule {}
