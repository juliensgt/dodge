import { useCardStore } from "./cards.store";
import { GameState } from "@/types/game/game.types";
import { Game } from "@/store/game/types";
import {
  getCurrentPlayer,
  getPlayerHandCount,
  getActionPoints,
} from "@/services/game/game.selectors";
import { ActionType } from "@/enums/action-type.enum";

export function applyClickabilityForState(gameState: GameState, game: Game) {
  const cardStore = useCardStore.getState();

  // Default: clear everything
  cardStore.clearAllCliquable();

  switch (gameState) {
    case GameState.COUP_OEIL: {
      const current = getCurrentPlayer(game);
      if (!current) return;
      const ap = getActionPoints(game);
      if (ap <= 0) return;

      const count = getPlayerHandCount(game);
      if (count <= 0) return;

      // Enable all indices for now; components should still guard by CARD_BACK when calling onClick
      cardStore.setAllCardsCliquable(current.id, true);
      return;
    }
    default:
      return;
  }
}

export function applyClickabilityForChoices(
  nextChoices: ActionType[],
  game: Game
) {
  const cardStore = useCardStore.getState();
  const current = getCurrentPlayer(game);

  if (!current || !nextChoices || nextChoices.length === 0) {
    // If no current player or no choices, clear everything
    cardStore.clearAllCliquable();
    return;
  }

  // Clear all first
  cardStore.clearAllCliquable();

  if (nextChoices.includes(ActionType.GET_CARD_IN_DECK)) {
    cardStore.setDeckCliquable(true);
  }
  if (nextChoices.includes(ActionType.GET_CARD_IN_DEFAUSSE)) {
    cardStore.setDefausseCliquable(true);
  }
  // Apply clickability rules for player cards based on available choices
  if (nextChoices.includes(ActionType.SWITCH_FROM_DECK_TO_DEFAUSSE)) {
    // If SWITCH_FROM_DECK_TO_DEFAUSSE is available:
    // - All player cards are clickable
    cardStore.setDefausseCliquable(true);
  }
  if (
    nextChoices.includes(ActionType.SWITCH_FROM_DECK_TO_PLAYER) ||
    nextChoices.includes(ActionType.SWITCH_FROM_DEFAUSSE_TO_PLAYER)
  ) {
    // If SWITCH_FROM_DECK_TO_PLAYER is available:
    // - All player cards are clickable
    cardStore.setAllCardsCliquable(current.id, true);
  }
  // Add more cases here as needed for other choices
}
