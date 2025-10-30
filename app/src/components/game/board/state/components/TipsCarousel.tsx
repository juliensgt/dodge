import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

const tips = [
  "Regardez attentivement les cartes de vos adversaires !",
  "Utilisez les pouvoirs spéciaux au bon moment pour maximiser vos chances.",
  "Gérer votre temps est crucial pour gagner.",
  "Observez les patterns de jeu de vos adversaires.",
  "Ne révélez pas vos stratégies trop tôt dans la partie.",
  "Planifiez vos coups plusieurs tours à l'avance.",
];

export default function TipsCarousel() {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % tips.length);
    }, 3000); // Change tip every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${isMobile ? "mx-4" : "mx-4 my-2"}`}
    >
      {/* Clash Royale style border effects - same as BattlePassCard */}
      <div className="absolute inset-0 rounded-2xl border-2 border-yellow-300/60"></div>
      <div className="absolute inset-1 rounded-xl border border-yellow-200/40"></div>

      {/* Content container */}
      <div className={`relative z-10 ${isMobile ? "p-3" : "p-4"}`}>
        {/* Background pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-500/15 to-yellow-400/20 rounded-2xl"></div>

        {/* Title */}
        <div className="text-center mb-2">
          <span
            className={`text-yellow-200 ${isMobile ? "text-xs" : "text-sm"} font-bold uppercase tracking-wider drop-shadow-lg`}
            style={{
              textShadow: "0 0 10px rgba(254, 240, 138, 0.5)",
            }}
          >
            💡 Conseils
          </span>
        </div>

        {/* Tips carousel */}
        <div
          className={`relative flex items-center justify-center ${isMobile ? "h-[32px]" : "h-[40px]"}`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTipIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <span
                className={`text-yellow-100 ${isMobile ? "text-xs" : "text-sm"} font-medium drop-shadow-lg`}
              >
                {tips[currentTipIndex]}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
