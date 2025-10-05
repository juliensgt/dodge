import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export const GameInfo = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const client = ctx.switchToWs().getClient();

  if (!client.data.gameId || !client.data.playerId) {
    throw new WsException('Missing gameId or playerId');
  }

  return {
    gameId: client.data.gameId as string,
    playerId: client.data.playerId as string,
  };
});

export interface GameInfo {
  gameId: string;
  playerId: string;
}
