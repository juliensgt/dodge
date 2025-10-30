import { useGameStore } from "@/store/game/game";
import { useCardStore } from "@/store/cards/cards.store";

export function addActionPoints(actionPoints: number = 0): void {
  const game = useGameStore.getState();
  if (actionPoints === 0) return;
  useGameStore.setState({
    actionPoints: (game.actionPoints || 0) + actionPoints,
  });
}

export function removeActionPoints(actionPoints: number = 1): void {
  const game = useGameStore.getState();
  if (actionPoints === 0) return;
  const next = Math.max(0, (game.actionPoints || 0) - actionPoints);
  useGameStore.setState({ actionPoints: next });
  if (next <= 0) {
    useCardStore.getState().clearAllCliquable();
  }
}
