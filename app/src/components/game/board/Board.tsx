import { useGameStore } from "@/store/game/game";
import StartingBoard from "./state/StartingBoard";
import CoupOeilBoard from "./state/CoupOeilBoard";
import InGameBoard from "./state/InGameBoard";
import EndRoundBoard from "./state/EndRoundBoard";

export default function Board() {
  const { state } = useGameStore();

  const renderBoardState = () => {
    switch (state) {
      case "WAITING":
        return <InGameBoard />;
      case "COUP_OEIL":
        return <CoupOeilBoard />;
      case "IN_GAME":
        return <InGameBoard />;
      case "END_ROUND":
        return <EndRoundBoard />;
      default:
        return <StartingBoard />;
    }
  };

  return (
    <div className="h-[calc(100vh-20px)] w-full overflow-hidden rounded-lg select-none font-['MT']">
      {renderBoardState()}
    </div>
  );
}
