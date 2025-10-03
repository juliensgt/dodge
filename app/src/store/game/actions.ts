import { StateCreator } from "zustand";
import { Game, Player } from "./types";

export interface GameActions {
  // Game state management
  setGame: (game: Game, playerCurrentId?: string) => void;

  // Player management
  addPlayer: (player: Player) => void;
  removePlayer: (playerId: string) => void;
  getPlayerById: (playerId: string) => Player | undefined;

  // Utility functions
  isCurrentPlayerIsPlaying: () => boolean;
  getReorderedPlayers: (currentPlayerId: string) => Player[];
}

export const createGameActions: StateCreator<Game, [], [], GameActions> = (
  set,
  get,
  store
) => ({
  setGame: (game: Game, playerCurrentId?: string) => {
    set({
      id: game.id,
      state: game.state,
      round: game.round,
      players: game.players,
      currentPlayerId: playerCurrentId,
    });
  },

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
      id: game.id,
      state: game.state,
      round: game.round,
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
    game.players.forEach((player: Player) => {
      set((state) => {
        const newPlayers = [...state.players, player];
        return { players: newPlayers };
      });
    });
  },

  getReorderedPlayers: (currentPlayerId: string) => {
    const players = get().players;

    console.log("players", players);

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
