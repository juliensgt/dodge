import { ActionType } from "@/enums/action-type.enum";
import { Card } from "../cards/cards.type";

export interface GameOptions {
  maxPlayers: number;
  nbCardsPerPlayer: number;
  nbSeeFirstCards: number;
  pointsForActionError: number;
  limitPoints: number;
  timeToPlay: number;
  timeToStartGame: number;
  timeToSeeCards: number;
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
  collection: {
    skin: string;
    theme: string;
  };
  ready: boolean;
}

export interface Game {
  id: string;
  state: string;
  round: number;
  players: Player[];
  options: GameOptions;
  currentPlayerId: string | undefined;
  playerWhoPlays: Player;
  actionPoints: number;
  focusMode: boolean;
  actionQueue: ActionQueueItem[];
  currentAction: ActionPlayer;
  actionsHistory: ActionsHistory;
  playerTimer: number;
  playerTimerId: ReturnType<typeof setInterval> | null;
  deck: Card | undefined;
  defausse: Card[] | undefined;
  choices: ActionType[];
}
