import { create } from "zustand";
import { useGameStore } from "./game/game";
import { CardAnimationType } from "@/enums/card-animation-type.enum";

export interface CardAnimationData {
  cardValue?: number;
  cardImage?: string;
}

export type GameStoreMethod = keyof ReturnType<typeof useGameStore.getState>;
export interface PendingGameUpdate {
  method: GameStoreMethod;
  args: unknown[];
}

export interface CardAnimationState {
  isActive: boolean;
  fromId: string;
  toId: string;
  cardData: CardAnimationData | null;
  pendingUpdates: PendingGameUpdate[];
  animationType: CardAnimationType;
}

export interface AnimationState {
  isBannerVisible: boolean;
  bannerText: string;
  bannerDuration: number; // Durée en millisecondes
  isCardDistributionActive: boolean;
  cardsPerPlayer: number;
  cardAnimation: CardAnimationState;

  // Actions pour contrôler les animations
  showBanner: (text: string, duration?: number) => void;
  hideBanner: () => void;
  startCardDistribution: (cardsPerPlayer?: number) => void;
  stopCardDistribution: () => void;
  animateCardMovement: (
    fromId: string,
    toId: string,
    cardData: CardAnimationData,
    pendingUpdates?: PendingGameUpdate[],
    animationType?: CardAnimationType
  ) => void;
  clearCardAnimation: () => void;
  onAnimationComplete: () => void;
}

const useAnimationStore = create<AnimationState>((set, get) => ({
  // État initial
  isBannerVisible: false,
  bannerText: "",
  bannerDuration: 3000, // Durée par défaut de 3 secondes
  isCardDistributionActive: false,
  cardsPerPlayer: 4,
  cardAnimation: {
    isActive: false,
    fromId: "",
    toId: "",
    cardData: null,
    pendingUpdates: [],
    animationType: CardAnimationType.DEFAULT,
  },

  // Actions générales
  showBanner: (text: string, duration: number = 3000) => {
    set({
      isBannerVisible: true,
      bannerText: text,
      bannerDuration: duration,
    });
  },

  hideBanner: () => {
    set({
      isBannerVisible: false,
      bannerText: "",
    });
  },

  // Actions pour la distribution des cartes
  startCardDistribution: (cardsPerPlayer: number = 4) => {
    console.log("Store: Démarrage de la distribution", { cardsPerPlayer });
    set({
      isCardDistributionActive: true,
      cardsPerPlayer,
    });
  },

  stopCardDistribution: () => {
    console.log("Store: Arrêt de la distribution");
    set({
      isCardDistributionActive: false,
    });
  },

  // Actions pour les animations de cartes
  animateCardMovement: (
    fromId: string,
    toId: string,
    cardData: CardAnimationData,
    pendingUpdates: PendingGameUpdate[] = [],
    animationType: CardAnimationType = CardAnimationType.DEFAULT
  ) => {
    set({
      cardAnimation: {
        isActive: true,
        fromId,
        toId,
        cardData,
        pendingUpdates,
        animationType,
      },
    });
  },

  clearCardAnimation: () => {
    set({
      cardAnimation: {
        isActive: false,
        fromId: "",
        toId: "",
        cardData: null,
        pendingUpdates: [],
        animationType: CardAnimationType.DEFAULT,
      },
    });
  },

  onAnimationComplete: () => {
    const currentState = get();
    if (!currentState.cardAnimation.isActive) {
      return;
    }

    // Appliquer toutes les mises à jour en attente immédiatement
    const gameStore = useGameStore.getState();
    currentState.cardAnimation.pendingUpdates.forEach((update) => {
      try {
        const method = gameStore[update.method];
        if (typeof method === "function") {
          (method as (...args: unknown[]) => void)(...update.args);
        } else {
          console.error(`Method ${update.method} is not a function`);
        }
      } catch (error) {
        console.error(`Error executing ${update.method}:`, error);
      }
    });

    // Marquer que les updates ont été appliqués mais garder l'animation active
    // pour permettre le nettoyage final dans CardAnimationLayer
    set({
      cardAnimation: {
        ...currentState.cardAnimation,
        pendingUpdates: [], // Vider les updates pour éviter les doubles exécutions
      },
    });
  },
}));

export { useAnimationStore };
