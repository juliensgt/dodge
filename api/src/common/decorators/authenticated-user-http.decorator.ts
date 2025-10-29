import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../../routes/user/user.schema';

export const AuthenticatedUserHttp = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request & { user: User }>();
    const user: User = request.user;

    if (!user) {
      throw new Error('User not found in request');
    }

    return user;
  },
);
