// Configuration des layouts de joueurs basée sur CSS Grid
// Plus maintenable et responsive que les positions absolues

export type PlayerLayout = {
  container: string; // Classes CSS pour le conteneur principal
  positions: string[]; // Classes CSS pour chaque position de joueur
  profileAlignments: string[]; // Classes d'alignement pour les profils
};

export const playerLayouts: Record<number, PlayerLayout> = {
  2: {
    container: "grid grid-cols-3 grid-rows-3 gap-4 h-full w-full p-8",
    positions: [
      "col-start-2 row-start-3 flex items-center justify-center", // Joueur 1 (joueur courant - bas)
      "col-start-2 row-start-1 flex items-center justify-center", // Joueur 2 (haut-milieu)
    ],
    profileAlignments: ["justify-center", "justify-start"],
  },
  3: {
    container: "grid grid-cols-3 grid-rows-3 gap-4 h-full w-full p-8",
    positions: [
      "col-start-1 col-span-3 row-start-3 flex items-center justify-center", // Joueur 1 (joueur courant - bas)
      "col-start-1 row-start-2 flex items-center justify-start", // Joueur 2 (gauche-bas)
      "col-start-3 row-start-2 flex items-center justify-end", // Joueur 3 (droite-bas)
    ],
    profileAlignments: ["justify-center", "justify-start", "justify-end"],
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
  },
};

// Fonction utilitaire pour obtenir la configuration d'un layout
export function getPlayerLayout(numPlayers: number): PlayerLayout {
  return playerLayouts[numPlayers] || playerLayouts[6]; // Fallback sur 6 joueurs
}

// Fonction utilitaire pour obtenir les classes d'un joueur à une position donnée
export function getPlayerClasses(numPlayers: number, position: number) {
  const layout = getPlayerLayout(numPlayers);
  return {
    container: layout.positions[position] || layout.positions[0],
    profileAlignment:
      layout.profileAlignments[position] || layout.profileAlignments[0],
  };
}
