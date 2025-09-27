import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

export interface BroadcastData {
  [key: string]: any;
}

@Injectable()
export class BroadcastService {
  private server: Server;

  setServer(server: Server) {
    this.server = server;
  }

  broadcastToGame(gameId: string, event: string, data: BroadcastData): void {
    if (!this.server) {
      throw new Error('WebSocket server not initialized');
    }

    this.server.to(gameId).emit(event, {
      ...data,
      timestamp: Date.now(),
    });
  }

  broadcastToPlayer(gameId: string, playerId: string, event: string, data: BroadcastData): void {
    if (!this.server) {
      throw new Error('WebSocket server not initialized');
    }

    this.server.to(gameId).emit(event, {
      ...data,
      targetPlayerId: playerId,
      timestamp: Date.now(),
    });
  }

  broadcastToAll(event: string, data: BroadcastData): void {
    if (!this.server) {
      throw new Error('WebSocket server not initialized');
    }

    this.server.emit(event, {
      ...data,
      timestamp: Date.now(),
    });
  }
}
