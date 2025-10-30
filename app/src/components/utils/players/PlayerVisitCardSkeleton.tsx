import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import CardSkeleton from "@/components/game/cards/card/CardSkeleton";

export default function PlayerSkeletonCard() {
  const isMobile = useIsMobile();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`relative group ${isMobile ? "p-4" : "p-5"} rounded-2xl overflow-hidden shadow-2xl animate-pulse`}
    >
      {/* Background gradient skeleton */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-600/40 via-gray-700/40 to-gray-600/40 opacity-90" />

      {/* Animated background shimmer skeleton */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50" />

      {/* Clash Royale style border effects */}
      <div className="absolute inset-0 rounded-2xl border-2 border-white/20"></div>
      <div className="absolute inset-1 rounded-xl border border-white/10"></div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-between">
        {/* Player name section */}
        <div className="flex-1 min-w-0">
          <div className="relative">
            {/* Name shadow/glow effect skeleton */}
            <div
              className={`absolute inset-0 ${isMobile ? "text-sm" : "text-base"} font-bold text-white/10 blur-sm font-['MT']`}
            >
              &nbsp;
            </div>
            {/* Placeholder pour le pseudo */}
            <div
              className={`relative bg-white/30 rounded ${isMobile ? "h-4 w-24" : "h-5 w-32"} drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]`}
            />
          </div>
        </div>

        {/* Skin preview - 2 cartes en V superposées skeleton */}
        <div className="relative flex items-center justify-center ml-3">
          {/* Glow behind cards skeleton */}
          <div className="absolute inset-0 bg-white/10 rounded-lg blur-md scale-125" />

          <div className="relative" style={{ width: "48px", height: "52px" }}>
            {/* Première carte placeholder - rotation gauche */}
            <motion.div
              className="absolute"
              style={{
                transform: "rotate(-15deg)",
                transformOrigin: "bottom center",
                zIndex: 1,
              }}
            >
              <div className="drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]">
                <CardSkeleton size="xxsmall" />
              </div>
            </motion.div>

            {/* Deuxième carte placeholder - rotation droite */}
            <motion.div
              className="absolute"
              style={{
                transform: "rotate(15deg)",
                transformOrigin: "bottom center",
                zIndex: 2,
                left: "14px",
              }}
            >
              <div className="drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]">
                <CardSkeleton size="xxsmall" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom accent line skeleton */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </motion.div>
  );
}
