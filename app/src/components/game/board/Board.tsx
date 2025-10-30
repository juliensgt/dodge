import { useGameStore } from "@/store/game/game";
import StartingBoard from "./state/StartingBoard";
import CoupOeilBoard from "./state/CoupOeilBoard";
import InGameBoard from "./state/InGameBoard";
import EndRoundBoard from "./state/EndRoundBoard";
import GameContainer from "./GameContainer";
import { GameState } from "@/types/game/game.types";
import { useMemo } from "react";

export default function Board() {
  const { state } = useGameStore();

  // Map state to display state - STARTED should also show StartingBoard
  const displayState = useMemo(() => {
    if (state === GameState.STARTED || state === GameState.WAITING) {
      return GameState.WAITING;
    }
    return state;
  }, [state]);

  const gameTabs = useMemo(
    () => [
      {
        id: GameState.WAITING as GameState,
        content: <StartingBoard />,
      },
      {
        id: GameState.COUP_OEIL as GameState,
        content: <CoupOeilBoard />,
      },
      {
        id: GameState.IN_GAME as GameState,
        content: <InGameBoard />,
      },
      {
        id: "END_ROUND" as GameState, // END_ROUND is not in enum but used as state value
        content: <EndRoundBoard />,
      },
    ],
    []
  );

  return (
    <div className="h-full w-full overflow-hidden rounded-lg select-none font-['MT']">
      <GameContainer activeState={displayState as GameState} tabs={gameTabs} />
    </div>
  );
}
