export enum CardEvents {
  // ===== ACTIONS SUR LES CARTES =====

  // Tirer une carte (depuis deck ou défausse)
  CARD_DRAWN = 'card:drawn',

  // Déposer une carte dans la défausse
  CARD_DISCARDED = 'card:discarded',

  // Jouer une carte de sa main vers la défausse
  CARD_PLAYED = 'card:played',

  // Utiliser l'effet spécial d'une carte (VISION, SWITCH, BLOCKER, MIX_MAIN)
  SPECIAL_CARD_USED = 'card:special-used',

  // Un joueur dodge
  // TODO : look at this
  PLAYER_DODGED = 'card:player-dodged',

  // Échanger une carte avec une autre (dans le contexte des interventions)
  // TODO : look at this
  CARD_SWAPPED = 'card:swapped',
}
