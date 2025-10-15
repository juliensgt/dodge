import { Player } from "@/store/game/types";
import { useGradient } from "@/hooks/useGradient";
import { Size } from "@/scripts/references/playerLayouts";
import { motion } from "framer-motion";

interface PlayerAvatarProps {
  player: Player;
  size?: Size;
  isPlayerWhoPlays?: boolean;
  playerTimer?: number; // secondes écoulées
  maxTime?: number; // durée totale
}

export default function PlayerAvatar({
  player,
  size = "medium",
  isPlayerWhoPlays = false,
  playerTimer = 0,
  maxTime = 30,
}: PlayerAvatarProps) {
  const { getGradient, GradientType } = useGradient();

  const timerPercentage = Math.min(
    Math.max((playerTimer / maxTime) * 100, 0),
    100
  );

  // Couleur dynamique selon progression
  const getBorderColor = () => {
    if (timerPercentage > 50) return "#22c55e"; // vert
    if (timerPercentage > 25) return "#eab308"; // jaune
    return "#ef4444"; // rouge
  };

  const sizeMap = {
    xsmall: 32,
    small: 40,
    medium: 56,
    large: 72,
  };
  const avatarSize = sizeMap[size];
  const borderThickness = 6;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: avatarSize, height: avatarSize }}
    >
      {isPlayerWhoPlays && (
        <motion.div
          className="absolute rounded-full"
          style={{
            width: avatarSize + borderThickness * 2,
            height: avatarSize + borderThickness * 2,
            background: `conic-gradient(${getBorderColor()} ${timerPercentage * 3.6}deg, rgba(255,255,255,0.1) ${timerPercentage * 3.6}deg)`,
          }}
          animate={{
            background: `conic-gradient(${getBorderColor()} ${timerPercentage * 3.6}deg, rgba(255,255,255,0.1) ${timerPercentage * 3.6}deg)`,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      )}

      {/* Avatar */}
      <div
        className={`relative flex items-center justify-center rounded-full text-white font-bold shadow-md ${getGradient(
          GradientType.AVATAR_DEFAULT,
          "to-br"
        )}`}
        style={{
          width: avatarSize,
          height: avatarSize,
        }}
      >
        {player.name?.charAt(0)?.toUpperCase() || "?"}
      </div>

      {/* Badge "Joue" */}
      {isPlayerWhoPlays && (
        <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md">
          Joue
        </div>
      )}
    </div>
  );
}
