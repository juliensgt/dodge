import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import Card, { CardState } from "@/components/game/cards/card/Card";
import { useCollection } from "@/contexts/CollectionContext";
import { GradientType } from "@/enums/themes/list/PurpleTheme";

const loadingTips = [
  "Préparez votre stratégie...",
  "Mélangez votre deck...",
  "La chance sourit aux audacieux...",
  "Bluffez pour mieux gagner...",
  "Chaque carte compte...",
];

export default function LoadingGame() {
  const router = useRouter();
  const { getCurrentSkin, getCurrentTheme } = useCollection();
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentTip, setCurrentTip] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    // Change tip every 2 seconds
    const tipInterval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % loadingTips.length);
    }, 2000);

    // Start animation, then redirect after animation completes
    const timer = setTimeout(() => {
      // TODO: Replace with actual game ID
      router.push("/app/game/68f4ddb89d19232ad7b67e70");
    }, 10000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(tipInterval);
      clearTimeout(timer);
    };
  }, [router]);

  return (
    <div className="fixed inset-0 overflow-hidden font-display">
      {/* Animated background gradient */}
      <motion.div
        className={`fixed inset-0 bg-gradient-to-br ${getCurrentTheme().getGradient(GradientType.PRIMARY, "to-r")}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      />

      {/* Main content container */}
      <div
        className="fixed inset-0 flex flex-col items-center justify-center px-8"
        style={{ zIndex: 10 }}
      >
        {/* Logo/Title */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16"
        >
          <span className="text-7xl md:text-8xl text-white drop-shadow-2xl text-center font-lucky">
            DODGE
          </span>
        </motion.div>

        {/* Cards animation */}
        <motion.div
          className="relative flex items-center gap-6 mb-20"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Card 1 - Floating animation */}
          <motion.div
            animate={{
              y: [-10, 10, -10],
              rotate: [-5, 5, -5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Card
              cardState={CardState.CARD_BACK}
              size="small"
              skinId={getCurrentSkin().id}
            />
          </motion.div>

          {/* Card 2 - Floating animation with offset */}
          <motion.div
            animate={{
              y: [10, -10, 10],
              rotate: [5, -5, 5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          >
            <Card
              cardState={CardState.CARD_BACK}
              size="small"
              skinId={getCurrentSkin().id}
            />
          </motion.div>

          {/* Card 3 - Floating animation */}
          <motion.div
            animate={{
              y: [-10, 10, -10],
              rotate: [-5, 5, -5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          >
            <Card
              cardState={CardState.CARD_BACK}
              size="small"
              skinId={getCurrentSkin().id}
            />
          </motion.div>
        </motion.div>

        {/* Loading bar */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "100%", opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="w-full max-w-md mb-8"
        >
          <div className="relative">
            {/* Progress bar background */}
            <div className="w-full h-4 bg-black/30 rounded-full overflow-hidden backdrop-blur-sm border border-white/20">
              {/* Progress bar fill */}
              <motion.div
                className="h-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full relative"
                initial={{ width: "0%" }}
                animate={{ width: `${loadingProgress}%` }}
                transition={{ duration: 0.3 }}
              >
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ["-100%", "200%"],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </motion.div>
            </div>

            {/* Percentage text */}
            <div className="text-center mt-3">
              <span className="text-white text-2xl font-bold drop-shadow-lg font-passionone">
                {loadingProgress}%
              </span>
            </div>
          </div>
        </motion.div>

        {/* Loading tips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center h-12"
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={currentTip}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-white/90 text-xl font-medium drop-shadow-lg font-passionone"
            >
              {loadingTips[currentTip]}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* Animated spinner/dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex gap-2 mt-8"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-white rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
