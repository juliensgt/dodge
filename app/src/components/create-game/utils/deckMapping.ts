import { DeckType } from "../types";

/**
 * Maps a DeckType to its corresponding modeDeJeu value
 */
export const getModeDeJeuFromDeckType = (deckType: DeckType): string[] => {
  // Simple mapping: standard -> default, others stay the same
  const modeDeJeu = deckType === DeckType.STANDARD ? "default" : deckType;
  return [modeDeJeu];
};

/**
 * Gets the current DeckType from modeDeJeu array
 */
export const getDeckTypeFromModeDeJeu = (modeDeJeu: string[]): DeckType => {
  const mode = modeDeJeu[0];
  // Simple reverse mapping: default -> standard, others stay the same
  return mode === "default" ? DeckType.STANDARD : (mode as DeckType);
};

/**
 * Checks if a deck is selected based on modeDeJeu
 */
export const isDeckSelected = (
  deck: { id: DeckType },
  modeDeJeu: string[]
): boolean => {
  const expectedMode = deck.id === DeckType.STANDARD ? "default" : deck.id;
  return modeDeJeu[0] === expectedMode;
};
