import { motion } from "framer-motion";
import Image from "next/image";
import ModeBadge from "./ModeBadge";
import GlowingEffect from "./GlowingEffect";
import Particles from "./Particles";

interface PlayButtonDesktopProps {
  onClick: () => void;
  onModeClick: (e: React.MouseEvent) => void;
}

export default function PlayButtonDesktop({
  onClick,
  onModeClick,
}: PlayButtonDesktopProps) {
  return (
    <motion.div
      className="group relative flex-[2] cursor-pointer"
      initial={{ scale: 1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <ModeBadge modeName="Standard" isMobile={false} onClick={onModeClick} />

      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-yellow-500 via-orange-500 to-red-600 p-[3px] shadow-[0_0_40px_rgba(251,146,60,0.6)]">
        <div className="relative rounded-2xl bg-gradient-to-r from-slate-900 via-orange-950 to-slate-900 px-10 py-8 flex items-center justify-center gap-8">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 group-hover:from-orange-500/40 group-hover:to-red-500/40 transition-all duration-500 rounded-2xl" />

          <GlowingEffect />
          <Particles count={5} />

          {/* Logo */}
          <div className="relative z-10 group-hover:scale-110 transition-transform duration-500">
            <Image
              src="/images/logos/play_game.png"
              alt="Play"
              width={140}
              height={140}
            />
          </div>

          {/* Contenu central */}
          <div className="relative z-10 flex-1 text-center space-y-2">
            <h3
              className="text-5xl font-lucky text-white group-hover:scale-105 transition-all duration-300"
              style={{
                textShadow:
                  "0 0 30px rgba(251,146,60,0.8), 0 0 60px rgba(251,146,60,0.6), 2px 2px 4px rgba(0,0,0,0.8)",
              }}
            >
              Jouer
            </h3>
            <p className="text-base text-orange-200 font-passionone">
              Commencer une partie maintenant
            </p>

            {/* Stats compactes */}
            <div className="flex justify-center gap-4 pt-2">
              <div className="px-3 py-1.5 bg-orange-900/50 rounded-lg border border-orange-500/40">
                <p className="text-md text-orange-300 font-passionone">
                  En ligne
                </p>
                <p className="text-sm font-lucky text-orange-200">1,234</p>
              </div>
              <div className="px-3 py-1.5 bg-orange-900/50 rounded-lg border border-orange-500/40">
                <p className="text-md text-orange-300 font-passionone">
                  Parties
                </p>
                <p className="text-sm font-lucky text-orange-200">89</p>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-1.5 group-hover:h-2 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 transition-all" />
        </div>
      </div>
    </motion.div>
  );
}
