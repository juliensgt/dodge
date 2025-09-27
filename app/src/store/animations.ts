import { create } from "zustand";

export interface AnimationState {
  isBannerVisible: boolean;
  bannerText: string;
  bannerDuration: number; // Durée en millisecondes
  isCardDistributionActive: boolean;
  cardsPerPlayer: number;

  // Actions pour contrôler les animations
  showBanner: (text: string, duration?: number) => void;
  hideBanner: () => void;
  startCardDistribution: (cardsPerPlayer?: number) => void;
  stopCardDistribution: () => void;
}

const useAnimationStore = create<AnimationState>((set) => ({
  // État initial
  isBannerVisible: false,
  bannerText: "",
  bannerDuration: 3000, // Durée par défaut de 3 secondes
  isCardDistributionActive: false,
  cardsPerPlayer: 4,

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
}));

export { useAnimationStore };
