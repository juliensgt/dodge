import { useGradient } from "@/hooks/useGradient";
import { useAnimationStore } from "@/store/animations";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export default function AnimatedBanner() {
  const { isBannerVisible, bannerText, bannerDuration, hideBanner } =
    useAnimationStore();
  const gradient = useGradient();

  // Auto-hide après la durée spécifiée
  useEffect(() => {
    if (isBannerVisible) {
      const timer = setTimeout(() => {
        hideBanner();
      }, bannerDuration);

      return () => clearTimeout(timer);
    }
  }, [isBannerVisible, bannerDuration, hideBanner]);

  return (
    <AnimatePresence>
      {isBannerVisible && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          <motion.div
            className={`
              absolute flex items-center justify-center
              top-[35%] left-[-20%] w-[140%] h-[25%] transform
              ${gradient.getGradient(gradient.GradientType.PRIMARY, "to-br")} text-white
              backdrop-blur-sm shadow-2xl
            `}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
            }}
          >
            {/* Texte principal avec animation de rebond */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{
                delay: 0.4,
                duration: 0.6,
                ease: "easeOut",
              }}
            >
              <h2 className="text-2xl md:text-4xl font-bold tracking-wider uppercase drop-shadow-lg">
                {bannerText}
              </h2>
            </motion.div>

            {/* Particules flottantes */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 bg-white/50 rounded-full"
                  style={{
                    left: `${15 + i * 20}%`,
                    top: `${25 + (i % 2) * 40}%`,
                  }}
                  animate={{
                    y: [-10, 0, -10],
                    opacity: [0.4, 0.8, 0.4],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3,
                  }}
                />
              ))}
            </div>

            {/* Effet de vague énergétique */}
            <motion.div
              className="absolute hinset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{
                x: ["-100%", "100%"],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ transform: "skewX(-15deg)" }}
            />

            {/* Effet de pulsation */}
            <motion.div
              className="absolute inset-0 border-4 border-white/30 rounded-lg"
              animate={{
                scale: [1, 1.02, 1],
                borderColor: [
                  "rgba(255, 255, 255, 0.3)",
                  "rgba(255, 255, 255, 0.8)",
                  "rgba(255, 255, 255, 0.3)",
                ],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
