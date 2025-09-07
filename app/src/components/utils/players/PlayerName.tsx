import { Player } from "@/store/game";

interface PlayerNameProps {
  player: Player;
  size?: "small" | "medium" | "large";
}

export default function PlayerName({
  player,
  size = "medium",
}: PlayerNameProps) {
  const sizeClasses = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
  };

  return (
    <div className={`player-name text-white ${sizeClasses[size]}`}>
      {player.name}
    </div>
  );
}
