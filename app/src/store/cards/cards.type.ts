export enum CardState {
  CARD_BACK = "CARD_BACK",
  CARD_FRONT = "CARD_FRONT",
  CARD_REMOVED = "CARD_REMOVED",
}

export enum CardValue {
  CARD_VALUE_UNDEFINED = -1,
}

export interface Card {
  cardState: CardState;
  valeur: string | undefined;
}
