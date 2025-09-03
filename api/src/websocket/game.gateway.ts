import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GameService } from '../routes/game/game.service';
import { UserService } from '../routes/user/user.service';
import { MessageService } from '../routes/message/message.service';
import { PlayerWithId } from '../routes/players/player.schema';
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly gameService: GameService,
    private readonly userService: UserService,
    private readonly messageService: MessageService,
  ) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinGame')
  async handleJoinGame(
    @MessageBody() data: { gameId: string; userId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const player = await this.gameService.addPlayer({
      gameId: data.gameId,
      userId: data.userId,
      sessionId: client.id,
    });
    await client.join(data.gameId);

    // Notify all players in the game
    this.server.to(data.gameId).emit('playerJoined', {
      playerId: (player as PlayerWithId)._id,
      userId: data.userId,
    });

    return { success: true, playerId: (player as PlayerWithId)._id };
  }

  @SubscribeMessage('leaveGame')
  async handleLeaveGame(
    @MessageBody() data: { gameId: string; playerId: string },
    @ConnectedSocket() client: Socket,
  ) {
    await client.leave(data.gameId);

    // Notify all players in the game
    this.server.to(data.gameId).emit('playerLeft', {
      playerId: data.playerId,
    });

    return { success: true };
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @MessageBody() data: { gameId: string; playerId: string; message: string },
  ) {
    const message = await this.messageService.create({
      gameId: data.gameId,
      playerId: data.playerId,
      message: data.message,
    });

    // Broadcast message to all players in the game
    this.server.to(data.gameId).emit('newMessage', message);

    return { success: true, message };
  }

  @SubscribeMessage('playCard')
  async handlePlayCard(
    @MessageBody() data: { gameId: string; playerId: string; cardId: string },
  ) {
    const isPlayerTurn = await this.gameService.isTourOfPlayer(
      data.gameId,
      data.playerId,
    );
    if (!isPlayerTurn) {
      return { success: false, error: 'Not your turn' };
    }

    // Implement card playing logic here
    // This would involve game state management, card effects, etc.

    // Notify all players in the game
    this.server.to(data.gameId).emit('cardPlayed', {
      playerId: data.playerId,
      cardId: data.cardId,
    });

    return { success: true };
  }

  @SubscribeMessage('dodge')
  async handleDodge(@MessageBody() data: { gameId: string; playerId: string }) {
    await this.gameService.dodge(data.gameId, data.playerId);

    this.server.to(data.gameId).emit('playerDodged', {
      playerId: data.playerId,
    });

    return { success: true };
  }
}
