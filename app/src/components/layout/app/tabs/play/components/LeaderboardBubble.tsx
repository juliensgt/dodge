import { motion } from "framer-motion";
import Image from "next/image";

interface LeaderboardBubbleProps {
  isMobile: boolean;
  onClick: () => void;
  userRank?: number;
}

export default function LeaderboardBubble({
  isMobile,
  onClick,
  userRank,
}: LeaderboardBubbleProps) {
  const getTrophyIcon = (size: number) => {
    return (
      <div
        className="flex items-center justify-center 
          bg-gradient-to-r from-yellow-500 to-orange-500 backdrop-blur-xl rounded-full
          border-2 border-yellow-400/75"
      >
        <Image
          src="/images/icons/ranking.png"
          alt="Ranking"
          width={size}
          height={size}
          className="drop-shadow-lg"
        />
      </div>
    );
  };

  if (isMobile) {
    return (
      <motion.button
        onClick={onClick}
        className="transition-all duration-300"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {getTrophyIcon(50)}
      </motion.button>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className="flex-1 transition-all duration-300"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-xl rounded-xl p-3 border border-white/20 hover:border-yellow-400 h-full">
        {getTrophyIcon(50)}
        <div className="text-left">
          <div className="text-white font-bold text-lg">Ligue</div>
          <div className="text-white/70 text-sm">
            {userRank ? `Rang #${userRank}` : "Non classé"}
          </div>
        </div>
      </div>
    </motion.button>
  );
}
