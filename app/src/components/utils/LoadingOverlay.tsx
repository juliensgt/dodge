import { motion } from "framer-motion";

interface LoadingOverlayProps {
  isLoading: boolean;
}

export default function LoadingOverlay({ isLoading }: LoadingOverlayProps) {
  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-purple-800"
    >
      {/* Particules animées en arrière-plan */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-yellow-400/30 to-pink-500/30 blur-xl"
            style={{
              width: `${40 + i * 20}px`,
              height: `${40 + i * 20}px`,
              left: `${20 + i * 15}%`,
              top: `${20 + i * 12}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
              x: [0, 30, 0],
              y: [0, 30, 0],
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

      {/* Contenu principal */}
      <div className="relative flex flex-col items-center gap-8 z-10">
        {/* Spinner principal avec gradient animé */}
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
            className="w-24 h-24 rounded-full border-4 border-transparent"
            style={{
              background: `conic-gradient(from 0deg, #fbbf24, #ec4899, #8b5cf6, #3b82f6, #fbbf24)`,
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "xor",
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              padding: "4px",
            }}
          />
          {/* Cercle intérieur avec glow */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-4 rounded-full bg-gradient-to-br from-yellow-400/20 to-pink-500/20 blur-md"
          />
          {/* Centre blanc */}
          <div className="absolute inset-6 rounded-full bg-white/10 backdrop-blur-sm" />
        </div>

        {/* Logo avec animations */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.8,
              ease: [0.34, 1.56, 0.64, 1], // Easing bounce
            }}
            className="relative"
          >
            {/* Texte principal */}
            <motion.div
              animate={{
                textShadow: [
                  "0 0 20px rgba(251, 191, 36, 0.5)",
                  "0 0 40px rgba(236, 72, 153, 0.8)",
                  "0 0 20px rgba(251, 191, 36, 0.5)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="font-lucky text-5xl md:text-6xl text-white drop-shadow-2xl"
            >
              DODGE
            </motion.div>

            {/* Glow sous le texte */}
            <motion.div
              animate={{
                opacity: [0.4, 0.8, 0.4],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 font-lucky text-5xl md:text-6xl text-yellow-400 blur-xl -z-10"
              style={{ opacity: 0.6 }}
            >
              DODGE
            </motion.div>
          </motion.div>

          {/* Points de chargement */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex items-center justify-center gap-2 mt-4"
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-yellow-400"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
