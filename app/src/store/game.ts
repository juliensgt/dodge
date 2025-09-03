import { create } from "zustand";

export interface Player {
  id: string;
  name: string;
  points: number;
  currentTime: number;
  skinCards: string;
}

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
  action: any;
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
  actionsHistory: { players: any[]; datas: any[] };
  game: Game;
  options: GameOptions;
  players: Player[];

  // Actions
  setGameState: (state: string) => void;
  setFocusMode: (state: boolean) => void;
  addPlayer: (player: Player) => void;
  getPlayerById: (playerId: string) => Player | undefined;
  isCurrentPlayerIsPlaying: () => boolean;
  initGame: (currentPlayerId: string, game: any) => void;
  clear: () => void;
  dodge: () => void;
  distributionCoupOeil: () => void;
  startCountdownActionPlayer: () => void;
  addPlayerToHistorique: (player: any) => void;
  addActionToHistorique: (action: any) => void;
  setLastActionToHistorique: (message: string) => void;
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
  ],

  setGameState: (state: string) => {
    set((state) => ({
      game: { ...state.game, gameState: state },
    }));

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

  initGame: (currentPlayerId: string, game: any) => {
    set({
      currentPlayerId,
      players: [],
      game: {
        id: game.id,
        gameState: game.gameState,
        round: game.round,
      },
      options: {
        timeToPlay: game.options.timeToPlay,
        nbCards: game.options.nbCards,
        maxPlayers: 6,
      },
      currentAction: {
        time: game.options.timeToPlay,
        countdownState: false,
        idTimer: 0,
        action: null,
      },
      focusMode: false,
    });

    // Ajouter tous les joueurs
    game.players.forEach((player: Player) => {
      get().addPlayer(player);
    });
  },

  clear: () => {
    set({
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
      options: { nbCards: 0, timeToPlay: 0, maxPlayers: 8 },
      players: [],
    });
  },

  dodge: () => {
    console.log("dodge");
    // TODO: socket.emit('dodge_player', game.id);
  },

  distributionCoupOeil: () => {
    // TODO: Implémenter l'animation de distribution
    console.log("distributionCoupOeil");
  },

  startCountdownActionPlayer: () => {
    const state = get();
    const timeToPlay = state.options.timeToPlay * 2; // car il y a 2 actions minimums
    const newId = state.currentAction.idTimer + 1;

    set({
      currentAction: {
        ...state.currentAction,
        time: timeToPlay,
        idTimer: newId,
      },
    });

    setTimeout(() => {
      const currentState = get();
      if (currentState.currentAction.idTimer === newId) {
        set({
          currentAction: {
            ...currentState.currentAction,
            time: 0,
            countdownState: false,
          },
        });
      }
    }, state.options.timeToPlay * 1000);
  },

  addPlayerToHistorique: (player: any) => {
    set((state) => {
      const newPlayers = [...state.actionsHistory.players];
      const newDatas = [...state.actionsHistory.datas];

      const lastPlayer = newPlayers.length - 1;
      if (lastPlayer >= 0) {
        newPlayers[lastPlayer] = {
          ...newPlayers[lastPlayer],
          finishTour: true,
        };
      }

      newPlayers.push(player);
      newDatas.push([]);

      return {
        actionsHistory: {
          players: newPlayers,
          datas: newDatas,
        },
      };
    });
  },

  addActionToHistorique: (action: any) => {
    set((state) => {
      const newDatas = [...state.actionsHistory.datas];
      const nbPlayers = state.actionsHistory.players.length;

      if (newDatas[nbPlayers - 1]) {
        newDatas[nbPlayers - 1] = [...newDatas[nbPlayers - 1], action];
      }

      return {
        actionsHistory: {
          ...state.actionsHistory,
          datas: newDatas,
        },
      };
    });
  },

  setLastActionToHistorique: (message: string) => {
    set((state) => {
      const newDatas = [...state.actionsHistory.datas];
      const nbPlayers = state.actionsHistory.players.length;
      const nbActions = newDatas[nbPlayers - 1]?.length || 0;

      if (newDatas[nbPlayers - 1] && newDatas[nbPlayers - 1][nbActions - 1]) {
        newDatas[nbPlayers - 1][nbActions - 1] = {
          ...newDatas[nbPlayers - 1][nbActions - 1],
          message,
        };
      }

      return {
        actionsHistory: {
          ...state.actionsHistory,
          datas: newDatas,
        },
      };
    });
  },
}));

export { useGameStore };
