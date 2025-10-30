import { useGameStore } from "@/store/game/game";
import Countdown from "@/components/game/countdown/Countdown";
import PlayerVisitCard from "@/components/utils/players/PlayerVisitCard";
import PlayerSkeletonCard from "@/components/utils/players/PlayerVisitCardSkeleton";
import { useTranslation } from "@/hooks/useTranslation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GameState } from "@/types/game/game.types";
import { useTimer } from "@/hooks/useTimer";
import { useIsMobile } from "@/hooks/useIsMobile";
import { motion, AnimatePresence } from "framer-motion";
import TipsCarousel from "./components/TipsCarousel";

export default function StartingBoard() {
  const router = useRouter();
  const { t } = useTranslation();
  const { players, options, state } = useGameStore();
  const isMobile = useIsMobile();

  const [time, setTime] = useState(options.timeToStartGame);

  const maxPlayers = options.maxPlayers;

  // Responsive classes following PlayTab.tsx patterns
  const padding = isMobile ? "px-3 py-3" : "px-4 py-4";
  const maxWidth = isMobile ? "" : "max-w-4xl mx-auto";

  useTimer({
    initialTime: options.timeToStartGame,
    isActive: state === GameState.STARTED,
    onTimeUpdate: setTime,
  });

  const leaveGame = () => {
    router.push("/app");
  };

  if (isMobile) {
    return (
      <div className="relative w-full h-full rounded-5 overflow-hidden">
        <Countdown visible={true} title={t("Salle d'attente")} time={time} />

        {/* Container with fixed height structure */}
        <div className="h-full flex flex-col">
          {/* Players list - Scrollable center section */}
          <div
            className="flex-1 overflow-y-auto scrollbar-hide"
            style={{
              paddingTop: "5rem", // Space for Countdown
              paddingBottom: "180px", // Space for bottom section (Quit button + Tips)
              paddingLeft: "0.75rem",
              paddingRight: "0.75rem",
              touchAction: "pan-y",
            }}
          >
            <div className="grid grid-cols-1 gap-3 px-1">
              <AnimatePresence mode="popLayout">
                {Array.from({ length: maxPlayers }, (_, index) => {
                  const player = players[index];
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.1,
                        ease: "easeOut",
                      }}
                      layout
                    >
                      {player ? (
                        <PlayerVisitCard player={player} />
                      ) : (
                        <PlayerSkeletonCard />
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom section - Fixed at bottom */}
          <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-3 px-3 pt-4 pointer-events-none">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 flex flex-col gap-3 items-center pointer-events-auto">
              {/* Quit button - Pastel red */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={leaveGame}
                className="px-4 py-3 bg-red-400/30 hover:bg-red-400/40 backdrop-blur-sm rounded-xl border border-red-300/40 hover:border-red-300/60 text-white font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                {t("Quitter")}
              </motion.button>

              {/* Tips carousel */}
              <div
                className={`${isMobile ? "mb-3" : "mb-4"} w-full max-w-md mx-auto`}
              >
                <TipsCarousel />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop version
  return (
    <div className="relative h-full rounded-5 overflow-hidden">
      <Countdown visible={true} title={t("Salle d'attente")} time={time} />

      <div className={`flex flex-col h-full ${padding} pt-24`}>
        {/* Players list */}
        <div
          className={`flex-1 ${maxWidth} mx-auto`}
          style={{
            paddingBottom: "140px", // Space for bottom section
          }}
        >
          <div className="grid grid-cols-2 gap-2.5">
            <AnimatePresence mode="popLayout">
              {Array.from({ length: maxPlayers }, (_, index) => {
                const player = players[index];
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.1,
                      ease: "easeOut",
                    }}
                    layout
                  >
                    {player ? (
                      <PlayerVisitCard player={player} />
                    ) : (
                      <PlayerSkeletonCard />
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom section - Fixed at bottom */}
        <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-3 px-4 pt-4 pointer-events-none">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent pointer-events-none" />

          {/* Content */}
          <div className="relative z-10 flex flex-col gap-3 items-center pointer-events-auto">
            {/* Quit button - Pastel red */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={leaveGame}
              className="px-4 py-3 bg-red-400/30 hover:bg-red-400/40 backdrop-blur-sm rounded-xl border border-red-300/40 hover:border-red-300/60 text-white font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              {t("Quitter")}
            </motion.button>

            {/* Tips carousel */}
            <div
              className={`${isMobile ? "mb-3" : "mb-4"} w-full max-w-md mx-auto`}
            >
              <TipsCarousel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
