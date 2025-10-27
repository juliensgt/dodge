import { motion } from "framer-motion";

interface ModeBadgeProps {
  modeName: string;
  isMobile: boolean;
  onClick: (e: React.MouseEvent) => void;
}

export default function ModeBadge({
  modeName,
  isMobile,
  onClick,
}: ModeBadgeProps) {
  return (
    <motion.button
      className={`absolute ${isMobile ? "-top-3" : "-top-3"} left-1/2 -translate-x-1/2 z-40
                 ${isMobile ? "px-4" : "px-6 py-1.5"} bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500
                 text-white rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)]
                 transition-all border-2 border-cyan-300/50 font-passionone ${isMobile ? "text-base" : "text-sm"}`}
      whileHover={!isMobile ? { scale: 1.1 } : {}}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {modeName}
    </motion.button>
  );
}
