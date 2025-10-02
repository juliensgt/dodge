import { create } from "zustand";
import { GameState } from "./types";
import { createGameActions, GameActions } from "./actions";

// Export types for external use
export type {
  GameState,
  Player,
  Game,
  GameOptions,
  ActionPlayer,
  ActionQueueItem,
} from "./types";

// Combined store type
type GameStore = GameState & GameActions;

const useGameStore = create<GameStore>((set, get, store) => {
  const gameActions = createGameActions(set, get, store);

  return {
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
    game: { id: "", gameState: "WAITING", round: 0 },
    options: { nbCards: 0, timeToPlay: 0, maxPlayers: 6 },
    players: [],
    gameId: "",
    socketConnected: false,

    // Game actions
    ...gameActions,
  };
});

export { useGameStore };
