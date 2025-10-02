import { ConnectionType } from './connection.types';

export interface JoinGameRequest {
  gameId: string;
  type: ConnectionType;
}

export interface JoinGameResponse {
  success: boolean;
  gameData?: any;
  playerData?: any;
  error?: string;
}
