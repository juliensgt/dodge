import { Player } from "@/store/game";
import { useGradient } from "@/hooks/useGradient";
interface PlayerVisitCardProps {
  player: Player;
}

export default function PlayerVisitCard({ player }: PlayerVisitCardProps) {
  const { getGradient, GradientType } = useGradient();

  return (
    <div className="player-visit-card bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/30 select-none">
      <div
        className={`player-avatar w-12 h-12 ${getGradient(GradientType.AVATAR_DEFAULT, "to-br")} rounded-full mx-auto mb-2 flex items-center justify-center`}
      >
        <span className="text-white font-bold text-lg">
          {player.name?.charAt(0)?.toUpperCase() || "?"}
        </span>
      </div>
      <div className="player-name text-white font-semibold text-center text-sm">
        {player.name || "Joueur"}
      </div>
      <div className="player-status text-white/70 text-xs text-center">
        En ligne
      </div>
    </div>
  );
}
