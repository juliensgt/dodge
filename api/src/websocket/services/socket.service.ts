import { Server } from 'socket.io';
import { BroadcastData, ConnectionType, GameConnection } from '../types/connection.types';

class SocketService {
  private server: Server;
  private connections: GameConnection[] = [];

  setServer(server: Server) {
    this.server = server;
  }

  registerConnection(gameConnection: GameConnection) {
    this.connections.push(gameConnection);
  }

  unregisterConnection(socketId: string) {
    this.connections = this.connections.filter((conn) => conn.socketId !== socketId);
  }

  getConnectionBySocketId(socketId: string) {
    return this.connections.find((conn) => conn.socketId === socketId);
  }

  // Broadcast à tous les membres de la partie (spectateurs + joueurs)
  broadcastToGame(gameId: string, event: string, data: BroadcastData): void {
    if (!this.server) {
      throw new Error('WebSocket server not initialized');
    }

    this.server.to(`dgd-${gameId}`).emit(event, {
      ...data,
      timestamp: Date.now(),
    });
  }

  // Broadcast uniquement aux joueurs actifs de la partie
  broadcastToPlayers(gameId: string, event: string, data: BroadcastData): void {
    if (!this.server) {
      throw new Error('WebSocket server not initialized');
    }

    // Trouver tous les sockets des joueurs actifs de cette partie
    const playerSockets = this.connections
      .filter((conn) => conn.gameId === gameId && conn.type === ConnectionType.PLAYER)
      .map((conn) => conn.socketId);

    playerSockets.forEach((socketId) => {
      const socket = this.server.sockets.sockets.get(socketId.toString());
      if (socket) {
        socket.emit(event, {
          ...data,
          timestamp: Date.now(),
        });
      }
    });
  }

  // Broadcast uniquement aux spectateurs de la partie
  broadcastToSpectators(gameId: string, event: string, data: BroadcastData): void {
    if (!this.server) {
      throw new Error('WebSocket server not initialized');
    }

    // Trouver tous les sockets des spectateurs de cette partie
    const spectatorSockets = this.connections
      .filter((conn) => conn.gameId === gameId && conn.type === ConnectionType.SPECTATOR)
      .map((conn) => conn.socketId);

    spectatorSockets.forEach((socketId) => {
      const socket = this.server.sockets.sockets.get(socketId.toString());
      if (socket) {
        socket.emit(event, {
          ...data,
          timestamp: Date.now(),
        });
      }
    });
  }

  // Broadcast à un joueur spécifique
  broadcastToPlayer(gameId: string, playerId: string, event: string, data: BroadcastData): void {
    if (!this.server) {
      throw new Error('WebSocket server not initialized');
    }

    // Trouver le socket du joueur spécifique
    const playerSocket = this.connections.find(
      (conn) =>
        conn.gameId === gameId && conn.type === ConnectionType.PLAYER && conn.playerId === playerId,
    );

    if (playerSocket) {
      const socket = this.server.sockets.sockets.get(playerSocket.socketId.toString());
      if (socket) {
        socket.emit(event, {
          ...data,
          targetPlayerId: playerId,
          timestamp: Date.now(),
        });
      }
    }
  }

  // Broadcast global (tous les clients connectés)
  broadcastToAll(event: string, data: BroadcastData): void {
    if (!this.server) {
      throw new Error('WebSocket server not initialized');
    }

    this.server.emit(event, {
      ...data,
      timestamp: Date.now(),
    });
  }

  // Obtenir les statistiques des connexions
  getGameStats(gameId: string) {
    const gameConnections = this.connections.filter((conn) => conn.gameId === gameId);

    return {
      totalConnections: gameConnections.length,
      players: gameConnections.filter((conn) => conn.type === ConnectionType.PLAYER).length,
      spectators: gameConnections.filter((conn) => conn.type === ConnectionType.SPECTATOR).length,
    };
  }
}

export const socketService = new SocketService();
