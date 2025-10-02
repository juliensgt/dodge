import { Game, Player } from "@/store/game/game";

export enum ConnectionType {
  SPECTATOR = "spectator",
  PLAYER = "player",
}

export interface JoinGameRequest {
  gameId: string;
  type: ConnectionType;
}

export interface JoinGameResponse {
  gameData?: Game;
  playerData?: Player;
}
