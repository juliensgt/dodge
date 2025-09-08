import { useGameStore } from "@/store/game";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function GameVersion() {
  const game = useGameStore();
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="absolute flex flex-row top-0 left-0 gap-1 text-xs text-white select-none">
        <div className="text-xs font-bold">DODGE-GAME.NET</div>
        <div className="text-xs">
          Round {game.game.round} ({game.players.length}/
          {game.options.maxPlayers})
        </div>
      </div>
    );
  }

  return (
    <div className="absolute bottom-2 left-2 text-xs text-white/60 select-none">
      <div className="text-xs">
        {/* TODO: Récupérer l'ID du socket */}
        Socket ID
      </div>
      <div className="text-xs">
        Round {game.game.round} ({game.players.length}/{game.options.maxPlayers}
        )
      </div>
      <div className="text-sm font-bold">DODGE-GAME.NET</div>
    </div>
  );
}
