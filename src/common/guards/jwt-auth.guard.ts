/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ThrowGQL, GQLThrowType } from '@app/gqlerr';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext): any {
    const ctx = GqlExecutionContext.create(context);
    const gqlContext = ctx.getContext();
    return gqlContext.req;
  }

  handleRequest(err: any, user: any): any {
    if (err || !user) {
      throw new ThrowGQL(
        'Unauthorized: You must be logged in to access this resource',
        GQLThrowType.NOT_AUTHORIZED,
      );
    }
    return user;
  }
}
