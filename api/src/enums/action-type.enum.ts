export enum ActionType {
  // Phase 1: Get card in deck or defausse
  GET_CARD_IN_DECK = 'GET_CARD_IN_DECK',
  GET_CARD_IN_DEFAUSSE = 'GET_CARD_IN_DEFAUSSE',

  // Phase 2: Switch with deck or defausse
  SWITCH_FROM_DECK_TO_DEFAUSSE = 'SWITCH_FROM_DECK_TO_DEFAUSSE', // Switch from deck to defausse
  SWITCH_FROM_DECK_TO_PLAYER = 'SWITCH_FROM_DECK_TO_PLAYER', // Switch from deck to player
  SWITCH_FROM_DEFAUSSE_TO_PLAYER = 'SWITCH_FROM_DEFAUSSE_TO_PLAYER', // Switch from defausse to player

  // Phase 3: Special card detected
  VISION = 'VISION',
  SWITCH = 'SWITCH',
  BLOCKER = 'BLOCKER',
  MIX_MAIN = 'MIX_MAIN',

  // Phase 4: Intervention
  INTERVENTION = 'INTERVENTION',
}
