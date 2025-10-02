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
  userId: string;
  playerId?: string;
}
