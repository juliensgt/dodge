import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import CardComponent from "@/components/game/cards/card/Card";
import { CardState } from "@/store/cards/cards.type";
import { getTheme } from "@/enums/themes/ThemeManager";
import { ThemeType } from "@/enums/themes/Theme";
import { Player } from "@/store/game/types";

interface PlayerCardProps {
  player: Player;
  isCurrentPlayer?: boolean;
}

export default function PlayerCard({
  player,
  isCurrentPlayer = false,
}: PlayerCardProps) {
  const isMobile = useIsMobile();
  const themeId = (player.collection?.theme || ThemeType.PURPLE) as ThemeType;
  const theme = getTheme(themeId);
  const skinId = player.collection?.skin || "default";

  // Get theme gradient class using ITheme interface
  const themeGradient = theme.getGradient(theme.GradientType.PRIMARY, "to-r");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`relative bg-gradient-to-r ${themeGradient} rounded-xl p-3 border border-white/20 hover:border-white/40 transition-all duration-300 ${
        isCurrentPlayer ? "ring-2 ring-yellow-400 ring-opacity-50" : ""
      }`}
    >
      {/* Player Banner */}
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <span
            className={`${isMobile ? "text-sm" : "text-base"} font-bold text-white truncate font-['MT'] block`}
          >
            {player.name}
          </span>
        </div>

        {/* Skin preview - 2 cartes en V superposées */}
        <div className="relative flex items-center justify-center ml-2">
          <div className="relative" style={{ width: "40px", height: "44px" }}>
            {/* Première carte - rotation gauche */}
            <div
              className="absolute"
              style={{
                transform: "rotate(-15deg)",
                transformOrigin: "bottom center",
                zIndex: 1,
              }}
            >
              <CardComponent
                cardState={CardState.CARD_BACK}
                size="xxsmall"
                skinId={skinId}
              />
            </div>

            {/* Deuxième carte - rotation droite */}
            <div
              className="absolute"
              style={{
                transform: "rotate(15deg)",
                transformOrigin: "bottom center",
                zIndex: 2,
                left: "12px",
              }}
            >
              <CardComponent
                cardState={CardState.CARD_BACK}
                size="xxsmall"
                skinId={skinId}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
