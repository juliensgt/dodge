import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import Card from "@/components/game/cards/card/Card";
import { CardState } from "@/store/cards/cards.type";
import { getTheme } from "@/enums/themes/ThemeManager";
import { ThemeType } from "@/enums/themes/Theme";
import { Player } from "@/store/game/types";

interface PlayerVisitCardProps {
  player: Player;
}

export default function PlayerVisitCard({ player }: PlayerVisitCardProps) {
  const isMobile = useIsMobile();

  // Convert theme string to ThemeType enum, ensuring it's valid
  const themeString = player.collection?.theme?.toLowerCase() || "";
  const themeId =
    themeString && Object.values(ThemeType).includes(themeString as ThemeType)
      ? (themeString as ThemeType)
      : ThemeType.PURPLE;

  const theme = getTheme(themeId);
  const skinId = player.collection?.skin || "default";

  // Get theme gradient class using ITheme interface
  const themeGradient = theme.getGradient(theme.GradientType.PRIMARY, "to-r");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`relative group ${isMobile ? "p-4" : "p-5"} rounded-2xl overflow-hidden shadow-2xl`}
    >
      {/* Background gradient with theme */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${themeGradient} opacity-90`}
      />

      {/* Animated background shimmer - Only on mobile */}
      {isMobile && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-500" />
      )}

      {/* Outer glow effect - Only on mobile */}
      {isMobile && (
        <div
          className={`absolute inset-0 bg-gradient-to-r ${themeGradient} opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-300 -z-10`}
        />
      )}

      {/* Clash Royale style border effects */}
      <div
        className={`absolute inset-0 rounded-2xl border-2 ${isMobile ? "border-white/30 group-hover:border-white/50" : "border-white/30"} transition-all duration-300`}
      ></div>
      <div
        className={`absolute inset-1 rounded-xl border ${isMobile ? "border-white/20 group-hover:border-white/30" : "border-white/20"} transition-all duration-300`}
      ></div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-between">
        {/* Player name section */}
        <div className="flex-1 min-w-0">
          <div className="relative">
            {/* Name shadow/glow effect */}
            <div
              className={`absolute inset-0 ${isMobile ? "text-sm" : "text-base"} font-bold text-white/30 blur-sm font-['MT']`}
              style={{ textShadow: "0 0 10px rgba(255,255,255,0.5)" }}
            >
              {player.name || "Joueur"}
            </div>
            <span
              className={`relative ${isMobile ? "text-sm" : "text-base"} font-bold text-white truncate font-['MT'] block drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]`}
              style={{
                textShadow:
                  "0 0 10px rgba(255,255,255,0.3), 0 2px 4px rgba(0,0,0,0.5)",
              }}
            >
              {player.name || "Joueur"}
            </span>
          </div>
        </div>

        {/* Skin preview - 2 cartes en V superposées with enhanced effects */}
        <div className="relative flex items-center justify-center ml-3">
          {/* Glow behind cards - Only on mobile */}
          {isMobile && (
            <div className="absolute inset-0 bg-white/20 rounded-lg blur-md group-hover:bg-white/30 transition-all duration-300 scale-125" />
          )}

          <div className="relative" style={{ width: "48px", height: "52px" }}>
            {/* Première carte - rotation gauche */}
            <div
              className="absolute"
              style={{
                transform: "rotate(-15deg)",
                transformOrigin: "bottom center",
                zIndex: 1,
              }}
            >
              <div className="drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]">
                <Card
                  cardState={CardState.CARD_BACK}
                  size="xxsmall"
                  skinId={skinId}
                />
              </div>
            </div>

            {/* Deuxième carte - rotation droite */}
            <div
              className="absolute"
              style={{
                transform: "rotate(15deg)",
                transformOrigin: "bottom center",
                zIndex: 2,
                left: "14px",
              }}
            >
              <div className="drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]">
                <Card
                  cardState={CardState.CARD_BACK}
                  size="xxsmall"
                  skinId={skinId}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom accent line - Only on mobile */}
      {isMobile && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
    </motion.div>
  );
}
