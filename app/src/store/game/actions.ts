import { StateCreator } from "zustand";
import { GameState, Player, Game } from "./types";

export interface GameActions {
  // Game state management
  setGameState: (state: string) => void;
  setFocusMode: (state: boolean) => void;
  setGameId: (gameId: string) => void;
  setSocketConnected: (connected: boolean) => void;

  // Player management
  addPlayer: (player: Player) => void;
  removePlayer: (playerId: string) => void;
  getPlayerById: (playerId: string) => Player | undefined;

  // Game initialization
  initGame: (currentPlayerId: string, game: Game) => void;

  // Utility functions
  isCurrentPlayerIsPlaying: () => boolean;
  getReorderedPlayers: (currentPlayerId: string) => Player[];
}

export const createGameActions: StateCreator<GameState, [], [], GameActions> = (
  set,
  get,
  store
) => ({
  setGameState: (state: string) => {
    switch (state) {
      case "IN_GAME":
        set({ focusMode: false });
        // TODO: setAllCardsCliquable
        break;
      default:
        break;
    }
  },

  setFocusMode: (state: boolean) => {
    set({ focusMode: state });
  },

  setGameId: (gameId: string) => {
    set({ gameId });
  },

  setSocketConnected: (connected: boolean) => {
    set({ socketConnected: connected });
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
    return state.playerIdWhoPlays === state.currentPlayerId;
  },

  initGame: (currentPlayerId: string, game: Game) => {
    set({
      currentPlayerId,
      players: [],
      game: {
        id: game.id,
        gameState: game.gameState,
        round: game.round,
      },
      options: {
        timeToPlay: 0, //game.options.timeToPlay,
        nbCards: 0, //game.options.nbCards,
        maxPlayers: 6,
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
    /*game.players.forEach((player: Player) => {
      get().addPlayer(player);
    });*/
  },

  getReorderedPlayers: (currentPlayerId: string) => {
    const players = get().players;
    const currentPlayerIndex = players.findIndex(
      (player) => player.id === currentPlayerId
    );

    if (currentPlayerIndex !== -1) {
      return players
        .slice(currentPlayerIndex)
        .concat(players.slice(0, currentPlayerIndex));
    } else {
      console.error("Joueur courant non trouvé dans la liste des joueurs.");
      return [];
    }
  },
});
