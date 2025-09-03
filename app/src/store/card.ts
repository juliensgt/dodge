import { create } from "zustand";

export interface Card {
  cardState: string;
  cardImage: string;
  cardValue: number;
}

interface CardState {
  cards: Record<string, Card[]>;

  // Actions
  initCards: (playerId: string, nbCards: number) => void;
  flipCardPlayer: (playerId: string, cardIndex: number) => boolean;
  removeCard: (playerId: string, cardIndex: number) => void;
  setAllCardsCliquable: (playerId: string, cliquable: boolean) => void;
  clear: () => void;
}

const useCardStore = create<CardState>((set, get) => ({
  cards: {},

  initCards: (playerId: string, nbCards: number) => {
    const newCards: Card[] = [];
    for (let i = 0; i < nbCards; i++) {
      newCards.push({
        cardState: "hidden",
        cardImage: "/images/cards/default/small-cover.png",
        cardValue: Math.floor(Math.random() * 10) + 1,
      });
    }

    set((state) => ({
      cards: {
        ...state.cards,
        [playerId]: newCards,
      },
    }));
  },

  flipCardPlayer: (playerId: string, cardIndex: number) => {
    const state = get();
    const playerCards = state.cards[playerId];

    if (!playerCards || !playerCards[cardIndex]) {
      return false;
    }

    set((state) => ({
      cards: {
        ...state.cards,
        [playerId]: state.cards[playerId].map((card, index) =>
          index === cardIndex ? { ...card, cardState: "visible" } : card
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
