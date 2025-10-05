import { Game, Player } from "@/store/game/types";

export enum ConnectionType {
  SPECTATOR = "spectator",
  PLAYER = "player",
}

export interface GameMessage {
  id: string;
  gameId: string;
  player: Player;
  message: string;
  date: Date;
}

export interface JoinGameRequest {
  gameId: string;
  type: ConnectionType;
}

export interface GameAndPlayerResponse {
  gameData?: Game;
  playerData?: Player;
}
