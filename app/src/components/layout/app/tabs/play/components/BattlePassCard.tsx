import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";

interface BattlePassCardProps {
  isMobile: boolean;
  currentLevel: number;
  experience: number;
  experienceToNext: number;
  isPremium?: boolean;
}

export default function BattlePassCard({
  isMobile,
  currentLevel,
  experience,
  experienceToNext,
}: BattlePassCardProps) {
  const progressPercentage = (experience / experienceToNext) * 100;

  if (isMobile) {
    return (
      <div className="flex flex-col">
        {/* Header: Crown + Level */}
        <div className="flex text-center justify-center items-center">
          <span className="text-white/90 text-sm font-bold font-lucky mb-1">
            Game pass
          </span>
        </div>
        <div className="min-w-30">
          {/* Progress bar with level circles */}
          <div className="relative flex items-center">
            {/* Current level circle - positioned at start */}
            <div className="absolute flex items-center justify-center left-0 z-10 w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500">
              <span className="relative top-[2px] text-white text-lg font-lucky">
                {currentLevel}
              </span>
            </div>

            {/* Progress bar */}
            <div className="relative flex-1">
              <div className="bg-black/40 rounded-full h-6 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full transition-all duration-1000 relative overflow-hidden"
                  style={{
                    width: `${progressPercentage}%`,
                  }}
                ></div>
              </div>
              {/* XP text centered on the bar */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="relative text-white text-sm font-lucky top-[2px]">
                  {experience} / {experienceToNext}
                </span>
              </div>
            </div>

            {/* Next level circle - positioned at end */}
            <div className="absolute flex items-center justify-center right-0 z-10 w-6 h-6 rounded-full bg-gradient-to-br from-slate-700 to-slate-800">
              <span className="relative top-[2px] text-white text-lg font-lucky">
                {currentLevel + 1}
              </span>
            </div>
          </div>

          <style jsx>{`
            @keyframes slideArrows {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(16px);
              }
            }
          `}</style>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-2 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-xl p-3 border border-white/20 h-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faCrown} className="text-yellow-400" />
          <span className="text-white font-bold text-lg">Passe de combat</span>
          <span className="text-white/70 text-sm">
            Jouer pour gagner des XP
          </span>
        </div>
      </div>
      <div className="relative">
        <div className="bg-black/30 rounded-full h-6 flex items-center">
          <div
            className="bg-gradient-to-r from-yellow-400 to-orange-500 h-6 rounded-full transition-all duration-1000 ease-out flex items-center justify-center relative overflow-hidden"
            style={{
              width: `${progressPercentage}%`,
            }}
          >
            <span className="text-black/80 font-bold text-sm z-10 drop-shadow-sm">
              {experience}/{experienceToNext}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
