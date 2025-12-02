import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserView } from '../../users/dto/views/user.view';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): UserView => {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext<{ req: { user: UserView } }>().req;
    return request.user;
  },
);
