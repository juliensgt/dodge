import { useRouter } from "next/router";
import GameList from "@/components/game-list/GameList";
import TabContainer from "./TabContainer";

export default function AdminTab() {
  const router = useRouter();

  const handleJoinGame = (gameId: string) => {
    router.push(`/app/game/${gameId}`);
  };

  const handleSpectateGame = (gameId: string) => {
    router.push(`/app/game/${gameId}`);
  };

  const handleCreateGame = () => {
    router.push("/app/create-game");
  };

  return (
    <TabContainer>
      <div className="py-6">
        <GameList
          onJoinGame={handleJoinGame}
          onSpectateGame={handleSpectateGame}
          onCreateGame={handleCreateGame}
        />
      </div>
    </TabContainer>
  );
}

