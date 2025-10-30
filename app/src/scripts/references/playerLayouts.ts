// Configuration des layouts de joueurs basée sur CSS Grid
// Plus maintenable et responsive que les positions absolues

import { getMobilePlayerLayout } from "./mobilePlayerLayouts";

export type Size = "xxsmall" | "xsmall" | "small" | "medium" | "large";

export type ProfileLayout = "default" | "inline"; // default: normal, inline: nom/points sur même ligne
export type ProfilePosition = "before" | "after"; // before: avant les cartes, after: après les cartes

export type PlayerLayout = {
  container: string; // Classes CSS pour le conteneur principal
  positions: string[]; // Classes CSS pour chaque position de joueur
  profileAlignments: string[]; // Classes d'alignement pour les profils
  deckContainer: string; // Classes CSS pour le DeckContainer
  cardLayouts: {
    mainPlayer: string; // Classes CSS pour le layout des cartes du joueur principal
    otherPlayers: string; // Classes CSS pour le layout des cartes des autres joueurs
  };
  profileLayouts?: {
    mainPlayer?: {
      layout?: ProfileLayout; // Layout du profil pour le joueur principal
      position?: ProfilePosition; // Position du profil (before/after cards)
    };
    otherPlayers?: {
      layout?: ProfileLayout; // Layout du profil pour les autres joueurs
      position?: ProfilePosition; // Position du profil (before/after cards)
    };
  };
  sizes: {
    mainPlayer: {
      card: Size;
      avatar: Size;
      name: Size;
      points: Size;
    };
    otherPlayers: {
      card: Size;
      avatar: Size;
      name: Size;
      points: Size;
    };
    deck: {
      card: Size;
    };
  };
};

export const playerLayouts: Record<number, PlayerLayout> = {
  2: {
    container: "grid grid-cols-3 grid-rows-3 gap-4 h-full w-full p-4",
    positions: [
      "col-start-2 row-start-3 flex items-center justify-center", // Joueur 1 (joueur courant - bas, ne change jamais)
      "col-start-2 row-start-1 flex items-start justify-center", // Joueur 2 (haut-milieu, collé en haut)
    ],
    profileAlignments: ["justify-start", "justify-start"],
    deckContainer:
      "flex items-center justify-center gap-4 col-start-2 row-start-2",
    cardLayouts: {
      mainPlayer: "flex gap-2 w-fit",
      otherPlayers: "flex gap-2 w-fit", // 4 cartes en ligne pour l'autre joueur
    },
    sizes: {
      mainPlayer: {
        card: "medium",
        avatar: "medium",
        name: "medium",
        points: "medium",
      },
      otherPlayers: {
        card: "medium",
        avatar: "medium",
        name: "medium",
        points: "medium",
      },
      deck: {
        card: "large",
      },
    },
  },
  3: {
    container: "grid grid-cols-3 grid-rows-3 gap-4 h-full w-full p-8",
    positions: [
      "col-start-1 col-span-3 row-start-3 flex items-center justify-center", // Joueur 1 (joueur courant - bas)
      "col-start-1 row-start-2 flex items-center justify-start", // Joueur 2 (gauche-bas)
      "col-start-3 row-start-2 flex items-center justify-end", // Joueur 3 (droite-bas)
    ],
    profileAlignments: ["justify-center", "justify-start", "justify-end"],
    deckContainer:
      "flex items-center justify-center gap-4 col-start-2 row-start-2",
    cardLayouts: {
      mainPlayer: "flex gap-2 w-fit",
      otherPlayers: "grid grid-cols-2 gap-2 w-fit",
    },
    sizes: {
      mainPlayer: {
        card: "large",
        avatar: "medium",
        name: "medium",
        points: "medium",
      },
      otherPlayers: {
        card: "medium",
        avatar: "small",
        name: "small",
        points: "small",
      },
      deck: {
        card: "large",
      },
    },
  },
  4: {
    container: "grid grid-cols-3 grid-rows-3 gap-4 h-full w-full p-8",
    positions: [
      "col-start-1 col-span-3 row-start-3 flex items-center justify-center", // Joueur 1 (joueur courant - bas)
      "col-start-1 row-start-2 flex items-center justify-start", // Joueur 2 (gauche-bas)
      "col-start-3 row-start-2 flex items-center justify-end", // Joueur 3 (droite-bas)
      "col-start-2 row-start-1 flex items-center justify-center", // Joueur 4 (gauche-milieu)
    ],
    profileAlignments: [
      "justify-center",
      "justify-start",
      "justify-end",
      "justify-center",
    ],
    deckContainer:
      "flex items-center justify-center gap-4 col-start-2 row-start-2",
    cardLayouts: {
      mainPlayer: "flex gap-2 w-fit",
      otherPlayers: "grid grid-cols-2 gap-2 w-fit",
    },
    sizes: {
      mainPlayer: {
        card: "large",
        avatar: "medium",
        name: "medium",
        points: "medium",
      },
      otherPlayers: {
        card: "medium",
        avatar: "small",
        name: "small",
        points: "small",
      },
      deck: {
        card: "large",
      },
    },
  },
  5: {
    container: "grid grid-cols-3 grid-rows-3 gap-4 h-full w-full p-8",
    positions: [
      "col-start-1 col-span-3 row-start-3 flex items-center justify-center", // Joueur 1 (joueur courant - bas)
      "col-start-1 row-start-2 flex items-center justify-start", // Joueur 2 (gauche-bas)
      "col-start-3 row-start-2 flex items-center justify-end", // Joueur 3 (droite-bas)
      "col-start-1 row-start-1 flex items-center justify-end", // Joueur 4 (gauche-haut)
      "col-start-3 row-start-1 flex items-center justify-start", // Joueur 5 (droite-haut)
    ],
    profileAlignments: [
      "justify-center",
      "justify-start",
      "justify-end",
      "justify-center",
      "justify-start",
    ],
    deckContainer:
      "flex items-center justify-center gap-4 col-start-2 row-start-2",
    cardLayouts: {
      mainPlayer: "flex gap-2 w-fit",
      otherPlayers: "grid grid-cols-2 gap-2 w-fit",
    },
    sizes: {
      mainPlayer: {
        card: "large",
        avatar: "medium",
        name: "medium",
        points: "medium",
      },
      otherPlayers: {
        card: "medium",
        avatar: "small",
        name: "small",
        points: "small",
      },
      deck: {
        card: "large",
      },
    },
  },
  6: {
    container: "grid grid-cols-3 grid-rows-3 gap-4 h-full w-full p-2",
    positions: [
      "col-start-1 col-span-3 row-start-3 flex items-center justify-center", // Joueur 1 (joueur courant - bas)
      "col-start-1 row-start-2 flex items-center justify-start", // Joueur 2 (gauche-bas)
      "col-start-3 row-start-2 flex items-center justify-end", // Joueur 3 (droite-bas)
      "col-start-1 row-start-1 flex items-center justify-center", // Joueur 4 (gauche-haut)
      "col-start-2 row-start-1 flex items-center justify-center", // Joueur 5 (milieu-haut)
      "col-start-3 row-start-1 flex items-center justify-center", // Joueur 6 (droite-haut)
    ],
    profileAlignments: ["", "", "", "", "", ""],
    deckContainer:
      "flex items-center justify-center gap-4 col-start-2 row-start-2",
    cardLayouts: {
      mainPlayer: "flex gap-2 w-fit",
      otherPlayers: "grid grid-cols-2 gap-2 w-fit",
    },
    sizes: {
      mainPlayer: {
        card: "large",
        avatar: "medium",
        name: "medium",
        points: "medium",
      },
      otherPlayers: {
        card: "small",
        avatar: "small",
        name: "small",
        points: "small",
      },
      deck: {
        card: "large",
      },
    },
  },
};

// Fonction utilitaire pour obtenir la configuration d'un layout
export function getPlayerLayout(numPlayers: number): PlayerLayout {
  return playerLayouts[numPlayers] || playerLayouts[6]; // Fallback sur 6 joueurs
}

// Fonction utilitaire pour obtenir les classes d'un joueur à une position donnée
export function getPlayerClasses(
  numPlayers: number,
  position: number,
  isMobile: boolean = false
) {
  const layout = isMobile
    ? getMobilePlayerLayout(numPlayers)
    : getPlayerLayout(numPlayers);
  return {
    container: layout.positions[position] || layout.positions[0],
    profileAlignment:
      layout.profileAlignments[position] || layout.profileAlignments[0],
  };
}

// Fonction utilitaire pour obtenir les classes du DeckContainer
export function getDeckContainerClasses(
  numPlayers: number,
  isMobile: boolean = false
) {
  const layout = isMobile
    ? getMobilePlayerLayout(numPlayers)
    : getPlayerLayout(numPlayers);
  return layout.deckContainer;
}

// Fonction utilitaire pour obtenir les layouts des cartes
export function getCardLayouts(numPlayers: number, isMobile: boolean = false) {
  const layout = isMobile
    ? getMobilePlayerLayout(numPlayers)
    : getPlayerLayout(numPlayers);
  return layout.cardLayouts;
}

// Fonction utilitaire pour obtenir les tailles des éléments
export function getElementSizes(numPlayers: number, isMobile: boolean = false) {
  const layout = isMobile
    ? getMobilePlayerLayout(numPlayers)
    : getPlayerLayout(numPlayers);
  return layout.sizes;
}

// Fonction utilitaire pour obtenir les tailles du joueur principal
export function getMainPlayerSizes(
  numPlayers: number,
  isMobile: boolean = false
) {
  const sizes = getElementSizes(numPlayers, isMobile);
  return sizes.mainPlayer;
}

// Fonction utilitaire pour obtenir les tailles des autres joueurs
export function getOtherPlayersSizes(
  numPlayers: number,
  isMobile: boolean = false
) {
  const sizes = getElementSizes(numPlayers, isMobile);
  return sizes.otherPlayers;
}

// Fonction utilitaire pour obtenir les tailles du deck
export function getDeckSizes(numPlayers: number, isMobile: boolean = false) {
  const sizes = getElementSizes(numPlayers, isMobile);
  return sizes.deck;
}

// Fonction utilitaire pour obtenir le layout du profil
export function getProfileLayout(
  numPlayers: number,
  position: number,
  isMobile: boolean = false
): "default" | "inline" {
  const layout = isMobile
    ? getMobilePlayerLayout(numPlayers)
    : getPlayerLayout(numPlayers);
  const isMainPlayer = position === 0;
  const profileConfig = isMainPlayer
    ? layout.profileLayouts?.mainPlayer
    : layout.profileLayouts?.otherPlayers;
  return profileConfig?.layout || "default";
}

// Fonction utilitaire pour obtenir la position du profil
export function getProfilePosition(
  numPlayers: number,
  position: number,
  isMobile: boolean = false
): "before" | "after" {
  const layout = isMobile
    ? getMobilePlayerLayout(numPlayers)
    : getPlayerLayout(numPlayers);
  const isMainPlayer = position === 0;
  const profileConfig = isMainPlayer
    ? layout.profileLayouts?.mainPlayer
    : layout.profileLayouts?.otherPlayers;
  return profileConfig?.position || (isMainPlayer ? "after" : "before");
}
