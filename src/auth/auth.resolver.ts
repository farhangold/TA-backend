/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { LoginInput } from './dto/inputs/login.input';
import { PublicRegisterInput } from './dto/inputs/public-register.input';
import { AuthPayload } from './dto/views/auth-payload.view';
import { JwtAuthGuard } from '../common/guards';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthPayload, { name: 'login' })
  async login(@Args('input') input: LoginInput): Promise<AuthPayload> {
    return this.authService.login(input);
  }

  @Mutation(() => AuthPayload, { name: 'publicRegister' })
  async publicRegister(
    @Args('input') input: PublicRegisterInput,
  ): Promise<AuthPayload> {
    return this.authService.publicRegister(input);
  }

  @Mutation(() => AuthPayload, { name: 'refreshToken' })
  async refreshToken(@Args('token') token: string): Promise<AuthPayload> {
    return this.authService.refreshToken(token);
  }

  @Mutation(() => Boolean, { name: 'logout' })
  @UseGuards(JwtAuthGuard)
  async logout(): Promise<boolean> {
    return this.authService.logout();
  }
}
