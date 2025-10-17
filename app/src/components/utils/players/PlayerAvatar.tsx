import { Player } from "@/store/game/types";
import { useTheme } from "@/contexts/ThemeContext";
import { Size } from "@/scripts/references/playerLayouts";
import { motion, AnimatePresence } from "framer-motion";

interface PlayerAvatarProps {
  player: Player;
  size?: Size;
  isPlayerWhoPlays?: boolean;
  playerTimer?: number;
  maxTime?: number;
}

const SIZE_CONFIG = {
  xsmall: { avatarSize: 32, fontSize: "text-xs", badgeText: "text-[8px]" },
  small: { avatarSize: 40, fontSize: "text-sm", badgeText: "text-[9px]" },
  medium: { avatarSize: 56, fontSize: "text-lg", badgeText: "text-xs" },
  large: { avatarSize: 72, fontSize: "text-2xl", badgeText: "text-sm" },
} as const;

export default function PlayerAvatar({
  player,
  size = "medium",
  isPlayerWhoPlays = false,
  playerTimer = 0,
  maxTime = 30,
}: PlayerAvatarProps) {
  const { getCurrentThemeColors } = useTheme();
  const themeColors = getCurrentThemeColors();
  const config = SIZE_CONFIG[size];
  const { avatarSize } = config;

  // Timer SVG calculations
  const padding = 4;
  const strokeWidth = 4;
  const svgSize = avatarSize + padding * 2;
  const center = svgSize / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  const timerPercentage = Math.min(
    Math.max((playerTimer / maxTime) * 100, 0),
    100
  );
  const progress = (timerPercentage / 100) * circumference;

  const getTimerColor = () => {
    if (timerPercentage > 50) return "#22c55e";
    if (timerPercentage > 25) return "#eab308";
    return "#ef4444";
  };

  const timerColor = getTimerColor();
  const isUrgent = timerPercentage < 25;

  return (
    <div
      className="relative block"
      style={{ width: avatarSize, height: avatarSize }}
    >
      {/* Timer SVG */}
      <AnimatePresence>
        {isPlayerWhoPlays && (
          <motion.svg
            className="absolute"
            style={{
              top: -padding,
              left: -padding,
              pointerEvents: "none",
            }}
            width={svgSize}
            height={svgSize}
            viewBox={`0 0 ${svgSize} ${svgSize}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth={strokeWidth}
              transform={`rotate(-90 ${center} ${center})`}
            />
            <motion.circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={timerColor}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: circumference - progress }}
              transition={{ duration: 1, ease: "linear" }}
              transform={`rotate(-90 ${center} ${center})`}
            />
          </motion.svg>
        )}
      </AnimatePresence>

      {/* Glow urgent */}
      {isPlayerWhoPlays && isUrgent && (
        <motion.div
          className="absolute blur-lg rounded-full"
          style={{
            top: -4,
            left: -4,
            width: avatarSize + 8,
            height: avatarSize + 8,
            backgroundColor: timerColor,
            pointerEvents: "none",
          }}
          animate={{ opacity: [0.25, 0.75, 0.25], scale: [0.6, 1, 0.6] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Avatar */}
      <motion.div
        className={`absolute top-0 left-0 flex items-center justify-center rounded-full text-white font-bold shadow-lg ${config.fontSize}`}
        style={{
          width: avatarSize,
          height: avatarSize,
          background: `linear-gradient(135deg, ${themeColors.primary}, ${themeColors.secondary})`,
        }}
        animate={isPlayerWhoPlays && isUrgent ? { scale: [1, 1.05, 1] } : {}}
        transition={
          isPlayerWhoPlays && isUrgent
            ? { duration: 0.6, repeat: Infinity, ease: "easeInOut" }
            : {}
        }
      >
        {player.name?.charAt(0)?.toUpperCase() || "?"}
      </motion.div>

      {/* Badge */}
      <AnimatePresence>
        {isPlayerWhoPlays && (
          <motion.div
            className={`absolute -top-1 -right-1 text-white font-bold rounded-full px-2 py-0.5 ${config.badgeText}`}
            style={{
              backgroundColor: themeColors.primary,
              boxShadow: `0 2px 8px ${themeColors.primary}60`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
          >
            Joue
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
