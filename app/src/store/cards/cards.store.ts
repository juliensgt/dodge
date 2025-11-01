import { create } from "zustand";
import { Card, CardState } from "./cards.type";
import { useGameStore } from "../game/game";

interface CardStore {
  cards: Record<string, Card[]>;
  cliquableByPlayer: Record<string, boolean[]>;
  deckCliquable: boolean;
  defausseCliquable: boolean;

  // Actions
  initCards: () => void;
  flipCardPlayer: (playerId: string, cardIndex: number, card: Card) => boolean;
  removeCard: (playerId: string, cardIndex: number) => void;

  // Clickability APIs
  setAllCardsCliquable: (playerId: string, cliquable: boolean) => void;
  setCardsCliquable: (
    playerId: string,
    indices: number[],
    cliquable: boolean
  ) => void;
  setCardCliquable: (
    playerId: string,
    cardIndex: number,
    cliquable: boolean
  ) => void;
  isCardCliquable: (playerId: string, cardIndex: number) => boolean;
  setDeckCliquable: (cliquable: boolean) => void;
  setDefausseCliquable: (cliquable: boolean) => void;
  isDeckCliquable: () => boolean;
  isDefausseCliquable: () => boolean;
  clearAllCliquable: () => void;

  clear: () => void;
}

const useCardStore = create<CardStore>((set, get) => ({
  cards: {},
  cliquableByPlayer: {},
  deckCliquable: false,
  defausseCliquable: false,

  initCards: () => {
    const game = useGameStore.getState();
    const nbCards = game.options.nbCardsPerPlayer;
    for (const playerId of game.players.map((player) => player.id)) {
      const playerCards: Card[] = [];
      for (let i = 0; i < nbCards; i++) {
        playerCards.push({
          cardState: CardState.CARD_BACK,
          valeur: undefined,
        });
      }
      set((state) => ({
        cards: {
          ...state.cards,
          [playerId]: playerCards,
        },
        cliquableByPlayer: {
          ...state.cliquableByPlayer,
          [playerId]: Array.from({ length: nbCards }, () => false),
        },
      }));
    }
  },

  flipCardPlayer: (playerId: string, index: number, card: Card) => {
    const state = get();
    const playerCards = state.cards[playerId];

    if (!playerCards || !playerCards[index]) {
      return false;
    }

    set((state) => ({
      cards: {
        ...state.cards,
        [playerId]: playerCards.map((cardPlayer, indexPlayer) =>
          indexPlayer === index
            ? {
                ...cardPlayer,
                cardState: CardState.CARD_FRONT,
                valeur: card.valeur,
              }
            : cardPlayer
        ),
      },
    }));

    return true;
  },

  removeCard: (playerId: string, cardIndex: number) => {
    set((state) => ({
      cards: {
        ...state.cards,
        [playerId]: state.cards[playerId].filter(
          (_, index) => index !== cardIndex
        ),
      },
    }));
  },

  setAllCardsCliquable: (playerId: string, cliquable: boolean) => {
    const state = get();
    const count = state.cards[playerId]?.length ?? 0;
    if (count === 0) return;
    set((s) => ({
      cliquableByPlayer: {
        ...s.cliquableByPlayer,
        [playerId]: Array.from({ length: count }, () => cliquable),
      },
    }));
  },

  setCardsCliquable: (
    playerId: string,
    indices: number[],
    cliquable: boolean
  ) => {
    const current = get().cliquableByPlayer[playerId] || [];
    const next = [...current];
    for (const i of indices) {
      if (i >= 0 && i < next.length) next[i] = cliquable;
    }
    set((s) => ({
      cliquableByPlayer: {
        ...s.cliquableByPlayer,
        [playerId]: next,
      },
    }));
  },

  setCardCliquable: (
    playerId: string,
    cardIndex: number,
    cliquable: boolean
  ) => {
    const current = get().cliquableByPlayer[playerId] || [];
    if (cardIndex < 0 || cardIndex >= current.length) return;
    const next = [...current];
    next[cardIndex] = cliquable;
    set((s) => ({
      cliquableByPlayer: {
        ...s.cliquableByPlayer,
        [playerId]: next,
      },
    }));
  },

  isCardCliquable: (playerId: string, cardIndex: number) => {
    const arr = get().cliquableByPlayer[playerId];
    return !!arr && !!arr[cardIndex];
  },

  setDeckCliquable: (cliquable: boolean) => {
    set({ deckCliquable: cliquable });
  },

  setDefausseCliquable: (cliquable: boolean) => {
    set({ defausseCliquable: cliquable });
  },

  isDeckCliquable: () => {
    return get().deckCliquable;
  },

  isDefausseCliquable: () => {
    return get().defausseCliquable;
  },

  clearAllCliquable: () => {
    set({
      cliquableByPlayer: {},
      deckCliquable: false,
      defausseCliquable: false,
    });
  },

  clear: () => {
    set({
      cards: {},
      cliquableByPlayer: {},
      deckCliquable: false,
      defausseCliquable: false,
    });
  },
}));

export { useCardStore };
