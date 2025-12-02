import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard, RolesGuard } from '../common/guards';
import { Roles, CurrentUser } from '../common/decorators';
import { CreateUserService } from './services/create-user.service';
import { GetUserService } from './services/get-user.service';
import { UpdateUserService } from './services/update-user.service';
import { UserView } from './dto/views/user.view';
import { UserConnection } from './dto/views/user-connection.view';
import { RegisterUserInput } from './dto/inputs/register-user.input';
import { UpdateUserInput } from './dto/inputs/update-user.input';
import { UserFilterInput } from './dto/inputs/user-filter.input';
import { PaginationInput } from '../common/types';

@Resolver(() => UserView)
export class UsersResolver {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly getUserService: GetUserService,
    private readonly updateUserService: UpdateUserService,
  ) {}

  @Query(() => UserView, { name: 'me' })
  @UseGuards(JwtAuthGuard)
  async getCurrentUser(@CurrentUser() user: any): Promise<UserView> {
    return this.getUserService.findById(user._id);
  }

  @Query(() => UserConnection, { name: 'users' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async getUsers(
    @Args('filter', { nullable: true }) filter?: UserFilterInput,
    @Args('pagination', { nullable: true }) pagination?: PaginationInput,
  ): Promise<UserConnection> {
    return this.getUserService.findAll(filter, pagination);
  }

  @Mutation(() => UserView, { name: 'register' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async register(@Args('input') input: RegisterUserInput): Promise<UserView> {
    return this.createUserService.create(input);
  }

  @Mutation(() => UserView, { name: 'updateUser' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async updateUser(
    @Args('id') id: string,
    @Args('input') input: UpdateUserInput,
  ): Promise<UserView> {
    return this.updateUserService.update(id, input);
  }
}
