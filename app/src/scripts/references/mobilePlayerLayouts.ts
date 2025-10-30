import { PlayerLayout } from "./playerLayouts";

// Layouts mobiles optimisés
export const mobilePlayerLayouts: Record<number, PlayerLayout> = {
  2: {
    container: "grid grid-cols-2 grid-rows-5 gap-2 h-full w-full px-4 py-20",
    positions: [
      "col-start-1 col-span-2 row-start-5 flex items-center justify-center", // Joueur 1 (joueur courant - bas, ne change jamais)
      "col-start-1 col-span-2 row-start-1 flex items-start justify-center", // Joueur 2 (haut, collé en haut)
    ],
    profileAlignments: ["justify-center", "justify-center"],
    deckContainer:
      "flex items-center justify-center gap-2 col-start-1 col-span-2 row-start-3",
    cardLayouts: {
      mainPlayer: "flex gap-1 w-fit",
      otherPlayers: "flex gap-1 w-fit", // 4 cartes en ligne pour l'autre joueur
    },
    profileLayouts: {
      mainPlayer: {
        layout: "inline",
        position: "after", // Profil après les cartes pour le joueur courant
      },
      otherPlayers: {
        layout: "inline", // Nom/points sur la même ligne
        position: "before", // Profil avant les cartes pour l'autre joueur
      },
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
        card: "medium",
      },
    },
  },
  3: {
    container: "grid grid-cols-2 grid-rows-5 gap-2 h-full w-full px-4 py-15",
    positions: [
      "col-start-1 col-span-2 row-start-5 flex items-center justify-center", // Joueur 1 (joueur courant - bas)
      "col-start-1 col-span-2 row-start-1 flex items-center justify-center", // Joueur 2 (gauche-milieu)
      "col-start-1 col-span-2 row-start-2 flex items-center justify-center", // Joueur 3 (droite-milieu)
    ],
    profileAlignments: ["justify-center", "justify-start", "justify-end"],
    deckContainer:
      "flex items-center justify-center gap-2 col-start-1 col-span-2 row-start-3 row-span-2",
    cardLayouts: {
      mainPlayer: "flex gap-1 w-fit",
      otherPlayers: "flex gap-1 w-fit",
    },
    profileLayouts: {
      mainPlayer: {
        layout: "inline",
        position: "after", // Profil après les cartes pour le joueur courant
      },
      otherPlayers: {
        layout: "inline", // Nom/points sur la même ligne
        position: "before", // Profil avant les cartes pour l'autre joueur
      },
    },
    sizes: {
      mainPlayer: {
        card: "medium",
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
        card: "medium",
      },
    },
  },
  4: {
    container: "grid grid-cols-2 grid-rows-4 gap-2 h-full w-full p-2",
    positions: [
      "col-start-1 col-span-2 row-start-4 flex items-center justify-center", // Joueur 1 (joueur courant - bas)
      "col-start-1 row-start-2 flex items-center justify-start", // Joueur 2 (gauche-milieu)
      "col-start-2 row-start-2 flex items-center justify-end", // Joueur 3 (droite-milieu)
      "col-start-1 col-span-2 row-start-1 flex items-center justify-center", // Joueur 4 (haut)
    ],
    profileAlignments: [
      "justify-center",
      "justify-start",
      "justify-end",
      "justify-center",
    ],
    deckContainer:
      "flex items-center justify-center gap-2 col-start-1 col-span-2 row-start-3",
    cardLayouts: {
      mainPlayer: "flex gap-1 w-fit",
      otherPlayers: "grid grid-cols-2 gap-1 w-fit",
    },
    sizes: {
      mainPlayer: {
        card: "medium",
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
        card: "small",
      },
    },
  },
  5: {
    container: "grid grid-cols-2 grid-rows-4 gap-2 h-full w-full p-2",
    positions: [
      "col-start-1 col-span-2 row-start-4 flex items-center justify-center", // Joueur 1 (joueur courant - bas)
      "col-start-1 row-start-2 flex items-center justify-start", // Joueur 2 (gauche-milieu)
      "col-start-2 row-start-2 flex items-center justify-end", // Joueur 3 (droite-milieu)
      "col-start-1 row-start-1 flex items-center justify-center", // Joueur 4 (gauche-haut)
      "col-start-2 row-start-1 flex items-center justify-center", // Joueur 5 (droite-haut)
    ],
    profileAlignments: [
      "justify-center",
      "justify-start",
      "justify-end",
      "justify-center",
      "justify-center",
    ],
    deckContainer:
      "flex items-center justify-center gap-2 col-start-1 col-span-2 row-start-3",
    cardLayouts: {
      mainPlayer: "flex gap-1 w-fit",
      otherPlayers: "grid grid-cols-2 gap-1 w-fit",
    },
    sizes: {
      mainPlayer: {
        card: "medium",
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
        card: "small",
      },
    },
  },
  6: {
    container: "grid grid-cols-2 grid-rows-4 gap-2 h-full w-full p-2",
    positions: [
      "col-start-1 col-span-2 row-start-4 flex items-center justify-center", // Joueur 1 (joueur courant - bas)
      "col-start-1 row-start-2 flex items-center justify-start", // Joueur 2 (gauche-milieu)
      "col-start-2 row-start-2 flex items-center justify-end", // Joueur 3 (droite-milieu)
      "col-start-1 row-start-1 flex items-center justify-start", // Joueur 4 (gauche-haut)
      "col-start-2 row-start-1 flex items-center justify-end", // Joueur 5 (droite-haut)
      "col-start-1 col-span-2 row-start-3 flex items-center justify-center", // Joueur 6 (milieu)
    ],
    profileAlignments: [
      "justify-center",
      "justify-start",
      "justify-end",
      "justify-start",
      "justify-end",
      "justify-center",
    ],
    deckContainer:
      "flex items-center justify-center gap-2 col-start-1 col-span-2 row-start-2",
    cardLayouts: {
      mainPlayer: "grid grid-cols-4 gap-1 w-fit",
      otherPlayers: "grid grid-cols-2 gap-1 w-fit",
    },
    sizes: {
      mainPlayer: {
        card: "medium",
        avatar: "xsmall",
        name: "small",
        points: "small",
      },
      otherPlayers: {
        card: "xsmall",
        avatar: "xsmall",
        name: "xsmall",
        points: "xsmall",
      },
      deck: {
        card: "small",
      },
    },
  },
};

// Fonction utilitaire pour obtenir la configuration d'un layout mobile
export function getMobilePlayerLayout(numPlayers: number): PlayerLayout {
  return mobilePlayerLayouts[numPlayers] || mobilePlayerLayouts[6]; // Fallback sur 6 joueurs
}
