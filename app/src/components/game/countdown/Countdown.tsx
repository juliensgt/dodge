import { useTheme } from "@/contexts/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

interface CountdownProps {
  visible: boolean;
  time: number;
  title?: string;
  subtitle?: string;
}

export default function Countdown({
  visible,
  time,
  title,
  subtitle,
}: CountdownProps) {
  const { getCurrentThemeColors } = useTheme();
  const themeColors = getCurrentThemeColors();

  const isUrgent = time <= 3 && time > 0;

  const circumference = 2 * Math.PI * 45;
  const progress = (time / 10) * circumference;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="relative w-full select-none p-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Contenu du countdown */}
          <div className="relative z-10 h-full flex flex-col justify-center items-center text-center gap-2">
            {title && (
              <motion.h1
                className="uppercase text-3xl md:text-5xl font-semibold tracking-wide text-white/90 drop-shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                {title}
              </motion.h1>
            )}

            {/* Timer circulaire - TOUJOURS ROND avec aspect-square */}
            <div className="relative w-22 md:w-26 aspect-square">
              {/* SVG Progress Ring */}
              <svg
                className="absolute inset-0 w-full h-full transform -rotate-90"
                viewBox="0 0 100 100"
              >
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke={isUrgent ? "#ef4444" : themeColors.primary}
                  strokeOpacity="0.25"
                  strokeWidth="5"
                />
                {/* Progress circle */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke={isUrgent ? "#ef4444" : themeColors.primary}
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset: circumference - progress }}
                  transition={{ duration: 1, ease: "linear" }}
                />
              </svg>

              {/* Cercle central avec le chiffre */}
              <motion.div
                className="absolute inset-4 rounded-full flex items-center justify-center backdrop-blur-sm border-2"
                style={{
                  backgroundColor: isUrgent
                    ? "#ef4444dd"
                    : `${themeColors.primary}dd`,
                  borderColor: isUrgent ? "#fca5a5" : `${themeColors.primary}`,
                  boxShadow: `0 4px 15px ${
                    isUrgent ? "#ef444440" : themeColors.primary + "40"
                  }`,
                }}
                animate={
                  isUrgent
                    ? {
                        scale: [1, 1.05, 1],
                      }
                    : {}
                }
                transition={
                  isUrgent
                    ? {
                        duration: 0.6,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                    : {}
                }
              >
                <AnimatePresence mode="wait">
                  <motion.h2
                    key={time}
                    className="text-3xl md:text-4xl font-black text-white"
                    style={{
                      textShadow: isUrgent
                        ? "0 0 10px rgba(255, 255, 255, 0.8), 0 2px 8px rgba(0, 0, 0, 0.5)"
                        : "0 2px 8px rgba(0, 0, 0, 0.3)",
                    }}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 1.5, opacity: 0 }}
                    transition={{
                      duration: 0.2,
                      ease: "easeOut",
                    }}
                  >
                    {time}
                  </motion.h2>
                </AnimatePresence>
              </motion.div>
            </div>

            {subtitle && (
              <motion.p
                className="text-sm md:text-base text-white/80 font-medium max-w-xs md:max-w-md"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
