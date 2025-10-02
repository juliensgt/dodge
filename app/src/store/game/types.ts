export interface GameOptions {
  nbCards: number;
  timeToPlay: number;
  maxPlayers: number;
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

export interface Game {
  id: string;
  state: string;
  round: number;
  players: Player[];
  currentPlayerId: string;
  playerIdWhoPlays: string;
  focusMode: boolean;
  actionQueue: ActionQueueItem[];
  currentAction: ActionPlayer;
  actionsHistory: ActionsHistory;
  options: GameOptions;
}
