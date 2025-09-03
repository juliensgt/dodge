import { Player } from "@/store/game";

interface CardContainerProps {
  player: Player;
  position: number;
  style?: React.CSSProperties;
  className?: string;
}

export default function CardContainer({
  player,
  position,
  style,
  className = "",
}: CardContainerProps) {
  return (
    <div
      className={`card-container absolute select-none ${className}`}
      style={style}
    >
      <div className="player-card bg-white/10 backdrop-blur-sm rounded-lg p-4 min-w-[120px]">
        <div className="player-name text-white font-semibold text-center mb-2">
          {player.name}
        </div>
        <div className="player-score text-white/80 text-sm text-center">
          Score: {player.points || 0}
        </div>
        {/* TODO: Ajouter l'affichage des cartes du joueur */}
      </div>
    </div>
  );
}
