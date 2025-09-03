import { useGameStore } from "@/store/game";
import StartingBoard from "./state/StartingBoard";
import CoupOeilBoard from "./state/CoupOeilBoard";
import InGameBoard from "./state/InGameBoard";
import EndRoundBoard from "./state/EndRoundBoard";
import Countdown from "../countdown/Countdown";

export default function Board() {
  const { game } = useGameStore();

  // TODO: récupérer via les options de la partie le nombre max de joueurs
  const numberOfPlayers = 8; // Par exemple, 8 joueurs

  const renderBoardState = () => {
    switch (game.gameState) {
      case "WAITING":
        return <StartingBoard />;
      case "COUP_OEIL":
        return <CoupOeilBoard />;
      case "IN_GAME":
        return <InGameBoard numberOfPlayers={numberOfPlayers} />;
      case "END_ROUND":
        return <EndRoundBoard />;
      default:
        return <StartingBoard />;
    }
  };

  return (
    <div className="h-[calc(100vh-20px)] w-full overflow-hidden rounded-lg select-none">
      <Countdown visible={false} time={0} />
      {renderBoardState()}
    </div>
  );
}
