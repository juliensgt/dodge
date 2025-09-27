import { create } from "zustand";
import { Player } from "./player";

export interface GameOptions {
  nbCards: number;
  timeToPlay: number;
  maxPlayers: number;
}

export interface Game {
  id: number;
  gameState: string;
  round: number;
}

export interface ActionPlayer {
  time: number;
  countdownState: boolean;
  idTimer: number;
  action: string | null;
}

export interface GameState {
  currentPlayerId: string;
  playerIdWhoPlays: string;
  focusMode: boolean;
  actionQueue: Array<{
    type: string;
    choice: string;
    playerId: string;
    cardId: number;
  }>;
  currentAction: ActionPlayer;
  actionsHistory: { players: Player[]; datas: unknown[] };
  game: Game;
  options: GameOptions;
  players: Player[];

  // Actions
  setGameState: (state: string) => void;
  setFocusMode: (state: boolean) => void;
  addPlayer: (player: Player) => void;
  getPlayerById: (playerId: string) => Player | undefined;
  isCurrentPlayerIsPlaying: () => boolean;
  initGame: (currentPlayerId: string, game: Game) => void;
  getReorderedPlayers: (players: Player[], currentPlayerId: string) => Player[];
}

const useGameStore = create<GameState>((set, get) => ({
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
  game: { id: 0, gameState: "WAITING", round: 0 },
  options: { nbCards: 0, timeToPlay: 0, maxPlayers: 6 },
  players: [
    { id: "", name: "jujudeluxe", points: 0, currentTime: 0, skinCards: "" },
    { id: "", name: "maxlamenace", points: 0, currentTime: 0, skinCards: "" },
    { id: "", name: "Beboudeuse", points: 0, currentTime: 0, skinCards: "" },
    { id: "", name: "Riskoonay", points: 0, currentTime: 0, skinCards: "" },
    { id: "", name: "Dowbe", points: 0, currentTime: 0, skinCards: "" },
    { id: "", name: "VaiMoto", points: 0, currentTime: 0, skinCards: "" },
  ],

  setGameState: (state: string) => {
    /*set((state) => ({
      game: { ...state.game, gameState: state },
    }));*/

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

  addPlayer: (player: Player) => {
    set((state) => ({
      players: [...state.players, player],
    }));
    // TODO: initCards
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

  getReorderedPlayers: (players: Player[], currentPlayerId: string) => {
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
}));

export { useGameStore };
