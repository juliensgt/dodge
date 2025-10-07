import { Player } from "@/store/game/types";
import PlayerAvatar from "./PlayerAvatar";
interface PlayerVisitCardProps {
  player: Player;
}

export default function PlayerVisitCard({ player }: PlayerVisitCardProps) {
  return (
    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/30 select-none flex flex-row items-center gap-2">
      <PlayerAvatar player={player} />
      <div className="text-white font-semibold text-sm flex flex-col items-start">
        {player.name || "Joueur"}
        <div className="text-white/70 text-xs">
          {player.ready ? "PRÊT" : "? Victoires"}
        </div>
      </div>
    </div>
  );
}
