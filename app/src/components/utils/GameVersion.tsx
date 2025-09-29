import { useGameStore } from "@/store/game/game";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function GameVersion() {
  const { game, players, options, socketConnected } = useGameStore();
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="absolute flex flex-row top-0 left-0 gap-1 text-xs text-white select-none">
        <div className="text-xs font-bold">DODGE-GAME.NET</div>
        <div className="text-xs">
          Socket: {socketConnected ? "Connected" : "Disconnected"}
        </div>
        <div className="text-xs">
          Round {game.round} ({players.length}/{options.maxPlayers})
        </div>
      </div>
    );
  }

  return (
    <div className="absolute bottom-2 left-2 text-xs text-white/60 select-none">
      <div className="text-xs">
        Socket: {socketConnected ? "Connected" : "Disconnected"}
      </div>
      <div className="text-xs">
        Round {game.round} ({players.length}/{options.maxPlayers})
      </div>
      <div className="text-sm font-bold">DODGE-GAME.NET</div>
    </div>
  );
}
