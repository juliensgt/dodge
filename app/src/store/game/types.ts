export interface GameOptions {
  nbCards: number;
  timeToPlay: number;
  maxPlayers: number;
}

export interface Game {
  id: string;
  gameState: string;
  round: number;
}

export interface ActionPlayer {
  time: number;
  countdownState: boolean;
  idTimer: number;
  action: string | null;
}

export interface ActionQueueItem {
  type: string;
  choice: string;
  playerId: string;
  cardId: number;
}

export interface ActionsHistory {
  players: Player[];
  datas: unknown[];
}

export interface Player {
  id: string;
  name: string;
  points: number;
  currentTime: number;
  skinCards: string;
}

export interface GameState {
  currentPlayerId: string;
  playerIdWhoPlays: string;
  focusMode: boolean;
  actionQueue: ActionQueueItem[];
  currentAction: ActionPlayer;
  actionsHistory: ActionsHistory;
  game: Game;
  options: GameOptions;
  players: Player[];
  gameId: string;
  socketConnected: boolean;
}
