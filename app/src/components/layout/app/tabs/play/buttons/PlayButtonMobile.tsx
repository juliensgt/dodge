import { motion } from "framer-motion";
import Image from "next/image";
import ModeBadge from "./ModeBadge";
import GlowingEffect from "./GlowingEffect";
import Particles from "./Particles";

interface PlayButtonMobileProps {
  onClick: () => void;
  onModeClick: (e: React.MouseEvent) => void;
}

export default function PlayButtonMobile({
  onClick,
  onModeClick,
}: PlayButtonMobileProps) {
  return (
    <motion.div
      className="group relative w-full cursor-pointer"
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <ModeBadge modeName="Standard" isMobile={true} onClick={onModeClick} />

      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-yellow-500 via-orange-500 to-red-600 p-[3px] shadow-[0_0_30px_rgba(251,146,60,0.5)]">
        <div className="relative rounded-2xl bg-gradient-to-r from-slate-900 via-orange-950 to-slate-900 px-4 py-3 flex items-center justify-center gap-4">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl" />

          <GlowingEffect />
          <Particles count={3} />

          {/* Logo */}
          <div className="relative z-10">
            <Image
              src="/images/logos/play_game.png"
              alt="Play"
              width={80}
              height={80}
            />
          </div>

          {/* Titre */}
          <div className="relative z-10 flex-1 text-center">
            <h3
              className="text-3xl font-lucky text-white"
              style={{
                textShadow:
                  "0 0 20px rgba(251,146,60,0.8), 0 0 40px rgba(251,146,60,0.6), 2px 2px 4px rgba(0,0,0,0.8)",
              }}
            >
              Jouer
            </h3>
            <p className="text-sm text-orange-200 font-passionone">
              Commencer une partie
            </p>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-1.5 group-hover:h-2 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 transition-all" />
        </div>
      </div>
    </motion.div>
  );
}
