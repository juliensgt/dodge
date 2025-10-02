import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayDisconnect,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Types } from 'mongoose';
import { socketService } from './services/socket.service';
import { GameService } from 'src/routes/game/game.service';
import { ConnectionType, GameConnection } from './types/connection.types';
import { GameEvents } from './events/game.events';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly gameService: GameService) {
    socketService.setServer(this.server);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    socketService.unregisterConnection(client.id);
  }

  async handleConnection(client: Socket) {
    const userId = new Types.ObjectId(client.handshake.query.userId as string);
    const gameId = client.handshake.query.gameId as string;

    const { playerData } = await this.gameService.addPlayer(gameId);

    const gameConnection: GameConnection = {
      socketId: client.id,
      type: ConnectionType.PLAYER,
      gameId: gameId,
      userId: userId,
    };

    console.log(`User joined game: ${userId.toString()}`);

    // Register the connection
    socketService.registerConnection(gameConnection);

    // Broadcast to all players the join game
    socketService.broadcastToGame(gameId, GameEvents.PLAYER_JOINED, { playerData });
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
