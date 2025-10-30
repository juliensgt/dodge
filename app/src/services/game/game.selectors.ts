import { Game, Player } from "@/store/game/types";
import { GameState } from "@/types/game/game.types";

export function getPlayerById(
  state: Game,
  playerId?: string
): Player | undefined {
  if (!playerId) return undefined;
  return state.players.find((p) => p.id === playerId);
}

export function getCurrentPlayer(state: Game): Player | undefined {
  if (!state.currentPlayerId) return undefined;
  return getPlayerById(state, state.currentPlayerId);
}

export function getActionPoints(state: Game): number {
  return state.actionPoints ?? 0;
}

export function isGameState(state: Game, target: GameState): boolean {
  return state.state === target;
}

export function getPlayerHandCount(state: Game): number {
  // Fallback to options when hand is not materialized in store
  return state.options.nbCardsPerPlayer ?? 0;
}
