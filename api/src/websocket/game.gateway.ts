import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayDisconnect,
  OnGatewayConnection,
  OnGatewayInit,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { UseFilters } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { WsException } from '@nestjs/websockets';
import { socketService } from './services/socket.service';
import { GameService } from 'src/routes/game/game.service';
import { ConnectionType } from './types/connection.types';
import { GameEvents } from './events/game.events';
import { TurnEvents } from './events/turn.events';
import { ActionType } from 'src/enums/action-type.enum';
import { UserService } from 'src/routes/user/user.service';
import { PlayerDto } from 'src/routes/players/dto/player.dto';
import { GameDto } from 'src/routes/game/dto/game.dto';
import { ChatEvents } from './events/chat.events';
import { WsAuthGuard } from './guards/ws-auth.guard';
import { UseGuards } from '@nestjs/common';
import { GameInfo } from './decorators/game-info.decorator';
import { MessageService } from 'src/routes/message/message.service';
import { MessageDto } from 'src/routes/message/dto/message.dto';
import { PlayerService } from 'src/routes/players/player.service';
import { GameState } from 'src/enums/game-state.enum';
import { WsExceptionFilter, WsAllExceptionsFilter } from 'src/common/filters/ws-exception.filter';
import { User } from 'src/routes/user/user.schema';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@UseFilters(WsAllExceptionsFilter, WsExceptionFilter)
export class GameGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly gameService: GameService,
    private readonly userService: UserService,
    private readonly messageService: MessageService,
    private readonly playerService: PlayerService,
  ) {}

  afterInit(server: Server) {
    console.log('WebSocket Gateway initialized');
    socketService.setServer(server);
  }

  async handleDisconnect(client: Socket) {
    const supabaseId = client.handshake.query.userId as string;
    const gameId = client.handshake.query.gameId as string;

    if (!supabaseId || !gameId) {
      console.log('handleDisconnect: Missing supabaseId or gameId');
      socketService.unregisterConnection(client.id);
      return;
    }

    try {
      const game = await this.gameService.findOne(gameId);
      if (!game) {
        console.log('handleDisconnect: Game not found');
        socketService.unregisterConnection(client.id);
        return;
      }

      if (game.state === GameState.WAITING || game.state === GameState.STARTED) {
        const response = await this.gameService.removePlayer(gameId, supabaseId);
        socketService.broadcastToGame(gameId, GameEvents.PLAYER_LEFT, {
          gameData: GameDto.fromGame(response.gameData!),
          playerData: PlayerDto.fromPlayer(response.playerData!, response.playerData!.user),
        });
      }
      socketService.unregisterConnection(client.id);
      console.log('handleDisconnect');
    } catch (error) {
      console.error('Error in handleDisconnect:', error);
      socketService.unregisterConnection(client.id);
    }
  }

  async handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;
    const gameId = client.handshake.query.gameId as string;

    if (!userId || !gameId) {
      client.emit('error', { message: 'Missing userId or gameId' });
      client.disconnect();
      return;
    }

    try {
      const user = await this.userService.findBySupabaseId(userId);
      if (!user) {
        client.emit('error', { message: 'User not found' });
        client.disconnect();
        return;
      }

      const response = await this.gameService.addPlayer(gameId, user);

      // Register the connection
      socketService.registerConnection({
        socketId: client.id,
        type: ConnectionType.PLAYER,
        gameId: gameId,
        userId: userId,
      });
      await client.join('dgd-' + gameId);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      client.data.gameId = gameId;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      client.data.playerId = response.playerData!._id.toString();

      // Send the player data to the client
      // Use player.user instead of user to ensure collection is populated
      const playerUser = response.playerData!.user as User & { collection?: any };
      socketService.broadcastToGame(gameId, GameEvents.PLAYER_JOINED, {
        gameData: GameDto.fromGame(response.gameData!),
        playerData: PlayerDto.fromPlayer(response.playerData!, playerUser),
      });

      // If the game is full, change the game state to STARTED
      if (
        response.gameData!.state === GameState.WAITING &&
        response.gameData!.players.length === response.gameData!.options.maxPlayers
      ) {
        await this.gameService.startWaitingGame(gameId).catch(() => {
          throw new WsException('Error starting game');
        });
      }
      console.log('handleConnection');
    } catch (error) {
      console.error('Error in handleConnection:', error);
      client.emit('error', {
        message: (error as Error).message || 'Error connecting to game',
        code: (error as unknown as { code?: string }).code || 'CONNECTION_ERROR',
      });
      client.disconnect();
      return;
    }
  }

  @SubscribeMessage(ChatEvents.CHAT_MESSAGE_SENT)
  @UseGuards(WsAuthGuard)
  async handleSendMessage(
    @MessageBody() data: { message: string },
    @GameInfo() gameInfo: GameInfo,
  ) {
    const player = await this.playerService.findOne(gameInfo.playerId);

    const message = await this.messageService.create({
      gameId: gameInfo.gameId,
      player,
      message: data.message,
    });

    const messageDto = MessageDto.fromMessage(message);

    this.server.to(`dgd-${gameInfo.gameId}`).emit(ChatEvents.CHAT_MESSAGE_SENT, messageDto);
  }

  @SubscribeMessage(TurnEvents.CARD_SOURCE_CHOSEN)
  @UseGuards(WsAuthGuard)
  async handleCardSourceChosen(
    @MessageBody() data: { choice: ActionType.GET_CARD_IN_DECK | ActionType.GET_CARD_IN_DEFAUSSE },
    @GameInfo() gameInfo: { gameId: string; playerId: string },
  ) {
    await this.gameService.handleCardSourceChosen(gameInfo.gameId, gameInfo.playerId, data.choice);
  }

  @SubscribeMessage(TurnEvents.CARD_SWITCHED)
  @UseGuards(WsAuthGuard)
  async handleCardSwitched(
    @MessageBody() data: { choice: ActionType; targetCardIndex?: number },
    @GameInfo() gameInfo: { gameId: string; playerId: string },
  ) {
    await this.gameService.handleCardSwitched(
      gameInfo.gameId,
      gameInfo.playerId,
      data.choice,
      data.targetCardIndex,
    );
  }
}
