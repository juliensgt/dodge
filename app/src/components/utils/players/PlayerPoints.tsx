import { Player } from "@/store/game";

interface PlayerPointsProps {
  player: Player;
  size?: "small" | "medium" | "large";
}

export default function PlayerPoints({
  player,
  size = "medium",
}: PlayerPointsProps) {
  const sizeClasses = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
  };

  return (
    <div className={`player-points text-white ${sizeClasses[size]}`}>
      {player.points}
    </div>
  );
}
