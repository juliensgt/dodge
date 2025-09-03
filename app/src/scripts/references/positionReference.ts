// src/scripts/positionReferences.ts

const profilePositions = {
  2: [
    { x: "10%", y: "50%" }, // Position for player 1
    { x: "90%", y: "50%" }, // Position for player 2
  ],
  4: [
    { x: "10%", y: "20%" }, // Position for player 1
    { x: "90%", y: "20%" }, // Position for player 2
    { x: "10%", y: "80%" }, // Position for player 3
    { x: "90%", y: "80%" }, // Position for player 4
  ],
  6: [
    { x: "10%", y: "20%" }, // Position for player 1
    { x: "90%", y: "20%" }, // Position for player 2
    { x: "10%", y: "80%" }, // Position for player 3
    { x: "90%", y: "80%" }, // Position for player 4
    { x: "10%", y: "80%" }, // Position for player 3
    { x: "90%", y: "80%" }, // Position for player 4
  ],
  8: [
    { x: "-10%", y: "70%" }, // Position for player 1
    { x: "135%", y: "50%" },
    { x: "135%", y: "50%" }, // Ligne gauche
    { x: "-30%", y: "35%" },
    { x: "50%", y: "125%" },
    { x: "130%", y: "35%" }, // Ligne haut
    { x: "-35%", y: "50%" },
    { x: "-35%", y: "50%" }, // Ligne droit
  ],
};

// Points de référence prédéfinis pour chaque configuration
const cardsPositions = {
  2: [
    { x: "25%", y: "50%" },
    { x: "75%", y: "50%" },
  ],
  4: [
    { x: "50%", y: "10%" },
    { x: "90%", y: "50%" },
    { x: "50%", y: "90%" },
    { x: "10%", y: "50%" },
  ],
  6: [
    { x: "50%", y: "10%" },
    { x: "90%", y: "30%" },
    { x: "90%", y: "70%" },
    { x: "50%", y: "90%" },
    { x: "10%", y: "70%" },
    { x: "10%", y: "30%" },
  ],
  8: [
    { x: "50%", y: "87%" }, //MainPlayer
    { x: "8%", y: "64%" },
    { x: "8%", y: "36%" }, //Coté gauche
    { x: "28%", y: "16%" },
    { x: "50%", y: "16%" },
    { x: "70%", y: "16%" }, //Ligne Haut
    { x: "92%", y: "36%" },
    { x: "92%", y: "64%" }, //Coté droit
  ],
  // Ajoutez d'autres configurations si nécessaire
};

// Points de référence prédéfinis pour chaque configuration
const namesPositions = {
  2: [
    { x: "10%", y: "50%" }, // Position for player 1
    { x: "90%", y: "50%" }, // Position for player 2
  ],
  4: [
    { x: "10%", y: "20%" }, // Position for player 1
    { x: "90%", y: "20%" }, // Position for player 2
    { x: "10%", y: "80%" }, // Position for player 3
    { x: "90%", y: "80%" }, // Position for player 4
  ],
  6: [
    { x: "10%", y: "20%" }, // Position for player 1
    { x: "90%", y: "20%" }, // Position for player 2
    { x: "10%", y: "80%" }, // Position for player 3
    { x: "90%", y: "80%" }, // Position for player 4
    { x: "10%", y: "80%" }, // Position for player 3
    { x: "90%", y: "80%" }, // Position for player 4
  ],
  8: [
    { x: "0%", y: "105%", align: "left" }, // MainPlayer
    { x: "0%", y: "105%", align: "left" },
    { x: "0%", y: "-35%", align: "left" }, // Ligne gauche
    { x: "-35%", y: "-15%", align: "left" },
    { x: "0%", y: "-15%", align: "center" },
    { x: "36%", y: "-15%", align: "right" }, // Ligne haut
    { x: "0%", y: "-31%", align: "right" },
    { x: "0%", y: "105%", align: "right" }, // Ligne droit
  ],
};

// Points de référence prédéfinis pour chaque configuration
const pointsPositions = {
  2: [
    { x: "10%", y: "50%" }, // Position for player 1
    { x: "90%", y: "50%" }, // Position for player 2
  ],
  4: [
    { x: "10%", y: "20%" }, // Position for player 1
    { x: "90%", y: "20%" }, // Position for player 2
    { x: "10%", y: "80%" }, // Position for player 3
    { x: "90%", y: "80%" }, // Position for player 3
    { x: "10%", y: "80%" }, // Position for player 3
    { x: "90%", y: "80%" }, // Position for player 4
  ],
  6: [
    { x: "10%", y: "20%" }, // Position for player 1
    { x: "90%", y: "20%" }, // Position for player 2
    { x: "10%", y: "80%" }, // Position for player 3
    { x: "90%", y: "80%" }, // Position for player 4
    { x: "10%", y: "80%" }, // Position for player 3
    { x: "90%", y: "80%" }, // Position for player 4
  ],
  8: [
    { x: "95%", y: "105%", align: "right" }, // MainPlayer
    { x: "0%", y: "120%", align: "left" },
    { x: "0%", y: "-20%", align: "left" }, // Ligne gauche
    { x: "-35%", y: "0%", align: "left" },
    { x: "-20%", y: "0%", align: "left" },
    { x: "123%", y: "0%", align: "left" }, // Ligne haut
    { x: "86%", y: "-18%", align: "right" },
    { x: "86%", y: "118%", align: "right" }, // Ligne droit
  ],
};

export { cardsPositions, profilePositions, namesPositions, pointsPositions };
