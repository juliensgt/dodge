import { motion } from "framer-motion";
import Image from "next/image";

interface MissionsBubbleProps {
  isMobile: boolean;
  onClick: () => void;
  missionCount?: number;
}

export default function MissionsBubble({
  isMobile,
  onClick,
  missionCount = 3,
}: MissionsBubbleProps) {
  const getQuestIcon = (size: number) => {
    return (
      <div
        className="flex items-center justify-center 
          bg-gradient-to-r from-green-500 to-emerald-500 backdrop-blur-xl rounded-full
          border-2 border-green-400/75"
      >
        <Image
          src="/images/icons/quest.png"
          alt="Book"
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
        {getQuestIcon(50)}
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
      <div className="flex items-center gap-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-xl rounded-xl p-3 border border-white/20 hover:border-green-400 h-full">
        {getQuestIcon(55)}
        <div className="text-left">
          <div className="text-white font-bold text-lg">Missions</div>
          <div className="text-white/70 text-sm">
            {missionCount} disponibles
          </div>
        </div>
      </div>
    </motion.button>
  );
}
