import { useGameStore } from "@/store/game";

export default function GameVersion() {
  const game = useGameStore();

  return (
    <div className="game-version absolute bottom-2 left-2 text-xs text-white/60 font-['MT'] select-none">
      <div className="text-[0.8vw]">
        {/* TODO: Récupérer l'ID du socket */}
        Socket ID
      </div>
      <div className="text-[0.8vw]">
        Round {game.game.round} ({game.players.length}/{game.options.maxPlayers}
        )
      </div>
      <div className="text-[1vw] font-bold">DODGE-GAME.NET</div>
    </div>
  );
}
