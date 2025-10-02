import { Types } from 'mongoose';

export interface BroadcastData {
  [key: string]: any;
}

export enum ConnectionType {
  SPECTATOR = 'spectator',
  PLAYER = 'player',
}

export interface GameConnection {
  socketId: string;
  type: ConnectionType;
  gameId: string;
  userId: Types.ObjectId;
  playerId?: string;
}
