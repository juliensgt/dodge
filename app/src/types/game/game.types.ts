import { PlayerData } from "./player.types";

export enum ConnectionType {
  SPECTATOR = "spectator",
  PLAYER = "player",
}
export interface GameData {
  id: string;
  gameState: string;
  round: number;
  players: Array<PlayerData>;
}

export interface JoinGameRequest {
  gameId: string;
  type: ConnectionType;
  playerId?: string;
}

export interface JoinGameResponse {
  success: boolean;
  gameData?: GameData;
  playerData?: PlayerData;
  error?: string;
}
