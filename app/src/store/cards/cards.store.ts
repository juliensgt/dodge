import { create } from "zustand";
import { Card, CardState } from "./cards.type";
import { useGameStore } from "../game/game";

interface CardStore {
  cards: Record<string, Card[]>;

  // Actions
  initCards: () => void;
  flipCardPlayer: (playerId: string, cardIndex: number, card: Card) => boolean;
  removeCard: (playerId: string, cardIndex: number) => void;
  setAllCardsCliquable: (playerId: string, cliquable: boolean) => void;
  clear: () => void;
}

const useCardStore = create<CardStore>((set, get) => ({
  cards: {},

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
    // TODO: Implémenter la logique pour rendre les cartes cliquables ou non
    console.log(`Setting cards cliquable for player ${playerId}: ${cliquable}`);
  },

  clear: () => {
    set({ cards: {} });
  },
}));

export { useCardStore };
