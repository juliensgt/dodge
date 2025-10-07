import { StateCreator } from "zustand";
import { Game, GameOptions, Player } from "./types";
import { GameState } from "@/types/game/game.types";

export interface GameActions {
  // Game state management
  setGame: (game: Game, playerCurrentId?: string) => void;
  setOptions: (options: GameOptions) => void;
  setGameState: (state: GameState) => void;
  setPlayers: (players: Player[]) => void;
  resetGame: () => void;

  // Player management
  addPlayer: (player: Player) => void;
  removePlayer: (playerId: string) => void;
  getPlayerById: (playerId: string) => Player | undefined;
  setCurrentPlayerId: (playerId: string) => void;
  getCurrentPlayerId: () => string | undefined;

  // Utility functions
  isCurrentPlayerIsPlaying: () => boolean;
  getPlayers: () => Player[];
}

export const createGameActions: StateCreator<Game, [], [], GameActions> = (
  set,
  get
) => ({
  setGame: (game: Game, playerCurrentId?: string) => {
    console.log("Setting game", game);
    set({
      id: game.id,
      state: game.state,
      round: game.round,
      players: game.players,
      currentPlayerId: playerCurrentId,
      playerWhoPlays: game.playerWhoPlays,
      options: game.options,
    });
  },

  setOptions: (options: GameOptions) => {
    set({ options });
  },

  resetGame: () => {
    set({
      id: "",
      state: "WAITING",
      round: 0,
      players: [],
      currentPlayerId: "",
      playerWhoPlays: undefined,
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
        nbCards: 0,
        timeToPlay: 0,
        maxPlayers: 6,
        nbSeeFirstCards: 2,
        pointsForActionError: 5,
        limitPoints: 150,
        timeToStartGame: 10,
        timeToSeeCards: 10,
      },
    });
  },

  setGameState: (state: GameState) => {
    set({ state });
  },

  setPlayers: (players: Player[]) => {
    set({ players });
  },

  setCurrentPlayerId: (playerId: string) => {
    set({ currentPlayerId: playerId });
  },

  getCurrentPlayerId: () => {
    return get().currentPlayerId;
  },

  addPlayer: (player: Player) => {
    set((state) => {
      // Check if player already exists
      const existingPlayer = state.players.find((p) => p.id === player.id);
      if (existingPlayer) {
        return state; // Don't add duplicate
      }
      return {
        players: [...state.players, player],
      };
    });
  },

  removePlayer: (playerId: string) => {
    set((state) => ({
      players: state.players.filter((player) => player.id !== playerId),
    }));
  },

  getPlayerById: (playerId: string) => {
    const state = get();
    return state.players.find((player) => player.id === playerId);
  },

  isCurrentPlayerIsPlaying: () => {
    const state = get();
    return state.playerWhoPlays.id === state.currentPlayerId;
  },

  initGame: (currentPlayerId: string, game: Game) => {
    set({
      currentPlayerId,
      players: [],
      id: game.id,
      state: game.state,
      round: game.round,
      options: {
        timeToPlay: 0, //game.options.timeToPlay,
        nbCards: 0, //game.options.nbCards,
        maxPlayers: 6,
        nbSeeFirstCards: 2,
        pointsForActionError: 5,
        limitPoints: 150,
        timeToStartGame: 10,
        timeToSeeCards: 10,
      },
      currentAction: {
        time: 0, //game.options.timeToPlay,
        countdownState: false,
        idTimer: 0,
        action: null,
      },
      focusMode: false,
    });

    // Ajouter tous les joueurs
    game.players.forEach((player: Player) => {
      set((state) => {
        const newPlayers = [...state.players, player];
        return { players: newPlayers };
      });
    });
  },

  getPlayers: () => {
    const players = get().players;

    const currentPlayerIndex = players.findIndex(
      (player) => player.id === get().currentPlayerId
    );

    console.log(
      "currentPlayerIndex",
      currentPlayerIndex,
      "for currentPlayerId",
      get().currentPlayerId
    );

    if (currentPlayerIndex === -1) {
      return players;
    }

    return players
      .slice(currentPlayerIndex)
      .concat(players.slice(0, currentPlayerIndex));
  },
});
