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
  nbCardsPerPlayer: number;
  nbSeeFirstCards: number;
  timeToPlay: number;
  timeToStartGame: number;
  timeToSeeCards: number;
}

export interface GameCardData {
  _id: string;
  state: GameState;
  round: number;
  players: Player[];
  options: GameOptionsBo;
}

export const isInGame = (state: GameState) => {
  return (
    state === GameState.STARTED ||
    state === GameState.IN_GAME ||
    state === GameState.COUP_OEIL
  );
};

export enum GameState {
  WAITING = "WAITING",
  STARTED = "STARTED",
  COUP_OEIL = "COUP_OEIL",
  IN_GAME = "IN_GAME",
  END_GAME = "END_GAME",
}
