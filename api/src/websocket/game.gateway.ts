import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayDisconnect,
  OnGatewayConnection,
  OnGatewayInit,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WsException } from '@nestjs/websockets';
import { socketService } from './services/socket.service';
import { GameService } from 'src/routes/game/game.service';
import { ConnectionType } from './types/connection.types';
import { GameEvents } from './events/game.events';
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

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
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
      throw new WsException('Missing supabaseId or gameId');
    }

    const game = await this.gameService.findOne(gameId);
    if (!game) {
      throw new WsException('Game not found');
    }

    if (game.state === GameState.WAITING) {
      await this.gameService
        .removePlayer(gameId, supabaseId)
        .then((response) => {
          socketService.broadcastToGame(gameId, GameEvents.PLAYER_LEFT, {
            gameData: GameDto.fromGame(response.gameData!),
            playerData: PlayerDto.fromPlayer(response.playerData!, response.playerData!.user),
          });
        })
        .catch((error) => {
          console.error('error', error);
        });
    }
    socketService.unregisterConnection(client.id);
    console.log('handleDisconnect');
  }

  async handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;
    const gameId = client.handshake.query.gameId as string;

    if (!userId || !gameId) {
      throw new WsException('Missing userId or gameId');
    }

    const user = await this.userService.findBySupabaseId(userId);

    this.gameService
      .addPlayer(gameId, user)
      .then(async (response) => {
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
        socketService.broadcastToGame(gameId, GameEvents.PLAYER_JOINED, {
          gameData: GameDto.fromGame(response.gameData!),
          playerData: PlayerDto.fromPlayer(response.playerData!, user),
        });
      })
      .catch((error: WsException) => {
        console.error('error', error);
        client.emit('error', { message: error.message || 'Connection failed' });
        client.disconnect();
      });
    console.log('handleConnection');
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

  /*@SubscribeMessage('leaveGame')
  @UseGuards(WsAuthGuard)
  handleLeaveGame(
    @MessageBody() data: { gameId: string },
    @ConnectedSocket() client: Socket,
    @AuthenticatedUser() user: any,
  ) {
    try {
      const connection = this.connectionManager.getConnection(client.id);
      if (!connection || !connection.gameId) {
        return { success: false, error: 'Not connected to any game' };
      }

      // Quitter la partie
      this.connectionManager.leaveGame(client.id, data.gameId);

      // Notifier les autres joueurs
      this.connectionManager.broadcastToGame(data.gameId, 'playerLeft', {
        gameId: data.gameId,
        userId: (user as any).supabaseId,
        gameStats: this.gameManager.getGameStats(data.gameId),
      });

      return { success: true };
    } catch (error) {
      console.error('Error in handleLeaveGame:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  @SubscribeMessage('getGameStats')
  @UseGuards(WsAuthGuard)
  handleGetGameStats(
    @MessageBody() data: { gameId: string },
    @ConnectedSocket() client: Socket,
    @AuthenticatedUser() user: any,
  ) {
    try {
      const stats = this.gameManager.getGameStats(data.gameId);
      if (!stats) {
        return { success: false, error: 'Game not found' };
      }

      return { success: true, stats };
    } catch (error) {
      console.error('Error in handleGetGameStats:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  @SubscribeMessage('getUserGames')
  @UseGuards(WsAuthGuard)
  handleGetUserGames(@ConnectedSocket() client: Socket, @AuthenticatedUser() user: any) {
    try {
      const userGames = this.gameManager.getUserGames((user as any).supabaseId);

      const gamesData = userGames.map((game) => ({
        id: game.id,
        state: game.state,
        round: game.round,
        currentPlayerIndex: game.currentPlayerIndex,
        activePlayers: this.gameManager.getActivePlayers(game.id).length,
        spectators: game.spectators.size,
        createdAt: game.createdAt,
        lastActivity: game.lastActivity,
      }));

      return { success: true, games: gamesData };
    } catch (error) {
      console.error('Error in handleGetUserGames:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // ===== GAME ACTIONS =====
  // Les actions de jeu seront implémentées dans les handlers spécialisés
  // et utiliseront les nouveaux services GameManager et ConnectionManager

  */
}
