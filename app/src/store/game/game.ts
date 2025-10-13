import { create } from "zustand";
import { Game } from "./types";
import { createGameActions, GameActions } from "./actions";

// Export types for external use
export type {
  Game,
  Player,
  GameOptions,
  ActionPlayer,
  ActionQueueItem,
} from "./types";

// Combined store type
type GameStore = Game & GameActions;

const useGameStore = create<GameStore>((set, get, store) => {
  const gameActions = createGameActions(set, get, store);

  return {
    id: "",
    state: "WAITING",
    round: 0,
    players: [],
    currentPlayerId: undefined,
    playerWhoPlays: {
      id: "",
      name: "",
      avatar: "",
      points: 0,
      currentTime: 0,
      skinCards: "",
      ready: false,
      actionPoints: 0,
    },
    focusMode: false,
    actionQueue: [],
    currentAction: {
      time: 0,
      countdownState: false,
      idTimer: 0,
      action: null,
    },
    actionsHistory: { players: [], datas: [] },
    options: {
      maxPlayers: 0,
      limitPoints: 150,
      pointsForActionError: 5,
      nbCards: 0,
      nbSeeFirstCards: 2,
      timeToPlay: 0,
      timeToStartGame: 10,
      timeToSeeCards: 10,
    },

    // Game actions
    ...gameActions,
  };
});

export { useGameStore };
