import { Player } from "@/store/game/types";
import { Size } from "@/scripts/references/playerLayouts";

interface PlayerNameProps {
  player: Player;
  size?: Size;
}

export default function PlayerName({
  player,
  size = "medium",
}: PlayerNameProps) {
  const sizeClasses = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
    xsmall: "text-xs",
  };

  return (
    <div className={`player-name text-white ${sizeClasses[size]}`}>
      {player.name}
    </div>
  );
}
