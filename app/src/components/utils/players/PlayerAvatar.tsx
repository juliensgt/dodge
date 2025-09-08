import { Player } from "@/store/game";
import { useGradient } from "@/hooks/useGradient";
import { Size } from "@/scripts/references/playerLayouts";
interface PlayerAvatarProps {
  player: Player;
  size?: Size;
}

export default function PlayerAvatar({
  player,
  size = "medium",
}: PlayerAvatarProps) {
  const { getGradient, GradientType } = useGradient();

  const sizeClasses = {
    small: "w-8 h-8 text-sm",
    medium: "w-12 h-12 text-base",
    large: "w-16 h-16 text-lg",
    xsmall: "w-6 h-6 text-xs",
  };

  return (
    <div
      className={`player-avatar ${sizeClasses[size]} ${getGradient(GradientType.AVATAR_DEFAULT, "to-br")} rounded-full flex items-center justify-center`}
    >
      <span className="text-white font-bold">
        {player.name?.charAt(0)?.toUpperCase() || "?"}
      </span>
    </div>
  );
}
