import { useCardStore } from "./cards.store";
import { GameState } from "@/types/game/game.types";
import { Game } from "@/store/game/types";
import {
  getCurrentPlayer,
  getPlayerHandCount,
  getActionPoints,
} from "@/services/game/game.selectors";

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
