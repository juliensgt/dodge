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
    currentPlayerId: "",
    playerIdWhoPlays: "",
    focusMode: false,
    actionQueue: [],
    currentAction: {
      time: 0,
      countdownState: false,
      idTimer: 0,
      action: null,
    },
    actionsHistory: { players: [], datas: [] },
    options: { nbCards: 0, timeToPlay: 0, maxPlayers: 6 },

    // Game actions
    ...gameActions,
  };
});

export { useGameStore };
