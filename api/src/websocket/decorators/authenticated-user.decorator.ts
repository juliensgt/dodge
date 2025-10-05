import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { User } from 'src/routes/user/user.schema';
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export const AuthenticatedUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const client = ctx.switchToWs().getClient();

  if (!client.user) {
    throw new WsException('Missing user');
  }

  return client.user as User;
});
