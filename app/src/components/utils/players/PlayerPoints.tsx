import { Player } from "@/store/game/types";
import { Size } from "@/scripts/references/playerLayouts";

interface PlayerPointsProps {
  player: Player;
  size?: Size;
}

export default function PlayerPoints({
  player,
  size = "medium",
}: PlayerPointsProps) {
  const sizeClasses = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
    xsmall: "text-xs",
    xxsmall: "text-xs",
  };

  return (
    <div className={`player-points text-white ${sizeClasses[size]}`}>
      {player.points}
    </div>
  );
}
