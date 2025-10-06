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

export interface GameOptionsBo {
  pointsForActionError: number;
  limitPoints: number;
  maxPlayers: number;
  nbSeeFirstCards: number;
  timeToPlay: number;
  timeToStartGame: number;
  timeToSeeCards: number;
  nbCards: number;
}

export interface GameCardData {
  _id: string;
  state: GameState;
  round: number;
  players: Player[];
  options: GameOptionsBo;
}

export enum GameState {
  WAITING = "WAITING",
  IN_GAME = "IN_GAME",
  END_GAME = "END_GAME",
}
