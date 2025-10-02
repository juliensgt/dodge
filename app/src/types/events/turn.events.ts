export enum TurnEvents {
  // Étape 1: Début du tour - le joueur commence son tour
  TURN_STARTED = 'turn:started',

  // Étape 2: Le joueur choisit entre deck ou défausse (GET_CARD_IN_DECK_OR_DEFAUSSE)
  CARD_SOURCE_CHOSEN = 'turn:card-source-chosen',

  // Étape 3: Échange de cartes (SWITCH_WITH_DECK ou SWITCH_WITH_DEFAUSSE)
  CARD_SWITCHED = 'turn:card-switched',

  // Étape 4: Détection d'une carte spéciale après l'échange
  SPECIAL_CARD_DETECTED = 'turn:special-card-detected',

  // Étape 5: Ouverture de la phase d'interventions pour les autres joueurs
  INTERVENTION_PHASE_OPENED = 'turn:intervention-phase-opened',

  // Étape 6: Fermeture de la phase d'interventions
  INTERVENTION_PHASE_CLOSED = 'turn:intervention-phase-closed',

  // Étape 7: Fin du tour - passage au joueur suivant
  TURN_ENDED = 'turn:ended',
}
