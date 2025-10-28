import Image from "next/image";

interface BattlePassCardProps {
  isMobile: boolean;
  experience: number;
  experienceToNext: number;
  isPremium?: boolean;
}

export default function BattlePassCard({
  isMobile,
  experience,
  experienceToNext,
}: BattlePassCardProps) {
  const progressPercentage = (experience / experienceToNext) * 100;

  if (isMobile) {
    return (
      <div className="flex flex-col relative overflow-hidden h-full">
        {/* Clash Royale style border effects */}
        <div className="absolute inset-0 rounded-2xl border-2 border-yellow-300/60"></div>
        <div className="absolute inset-1 rounded-xl border border-yellow-200/40"></div>

        {/* Content container */}
        <div className="relative z-10 pt-1 flex flex-col h-full">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-500/15 to-yellow-400/20 rounded-2xl"></div>

          {/* Header section with animated gradient */}
          <div className="relative overflow-hidden">
            <span className="relative flex items-center justify-center px-4 drop-shadow-lg">
              <Image
                src="/images/icons/pass_combat.png"
                alt="Game Pass"
                width={45}
                height={45}
                className="mr-1 drop-shadow-md"
              />
              <span
                className="bg-clip-text text-transparent text-xl font-passionone"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgb(254, 240, 138), white, rgb(254, 240, 138))",
                }}
              >
                GOLDEN PASS
              </span>
            </span>
          </div>

          {/* Progress section */}
          <div className="flex items-center mx-1 mb-1 flex-1 justify-end">
            {/* Progress bar */}
            <div className="relative flex-1">
              <div className="bg-gradient-to-r from-gray-800/90 to-gray-900/90 h-6 rounded-full overflow-hidden border-2 border-yellow-400/50 shadow-inner">
                <div
                  className="h-full relative overflow-hidden transition-all duration-1000 ease-out"
                  style={{
                    width: `${progressPercentage}%`,
                    background:
                      "linear-gradient(to right, rgb(250, 204, 21), rgb(249, 115, 22), rgb(250, 204, 21))",
                  }}
                >
                  {/* Animated shimmer effect */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to right, transparent, rgba(255, 255, 255, 0.4), transparent)",
                      animation: "shimmer_battle_pass 2s infinite",
                    }}
                  ></div>

                  {/* Inner highlight */}
                  <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent"></div>
                </div>

                {/* XP text */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-white font-lucky text-sm drop-shadow-lg mt-0.5">
                    {experience} / {experienceToNext} XP
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes shimmer_battle_pass {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="flex-2 relative overflow-hidden rounded-2xl h-full">
      {/* Clash Royale style border effects */}
      <div className="absolute inset-0 rounded-2xl border-2 border-yellow-300/60"></div>
      <div className="absolute inset-1 rounded-xl border border-yellow-200/40"></div>

      {/* Content container */}
      <div className="relative z-10 pt-2">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-500/15 to-yellow-400/20 rounded-2xl"></div>

        {/* Header section */}
        <div className="relative overflow-hidden mb-2">
          <span className="relative flex items-center justify-center px-4 drop-shadow-lg">
            <Image
              src="/images/icons/pass_combat.png"
              alt="Game Pass"
              width={45}
              height={45}
              className="mr-1 drop-shadow-md"
            />
            <span
              className="bg-clip-text text-transparent text-2xl font-passionone"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgb(254, 240, 138), white, rgb(254, 240, 138))",
              }}
            >
              GOLDEN PASS
            </span>
          </span>
        </div>

        {/* Progress section */}
        <div className="flex items-center mx-1 mb-1">
          {/* Progress bar */}
          <div className="relative flex-1">
            <div className="bg-gradient-to-r from-gray-800/90 to-gray-900/90 h-6 rounded-full overflow-hidden border-2 border-yellow-400/50 shadow-inner">
              <div
                className="h-full relative overflow-hidden transition-all duration-1000 ease-out"
                style={{
                  width: `${progressPercentage}%`,
                  background:
                    "linear-gradient(to right, rgb(250, 204, 21), rgb(249, 115, 22), rgb(250, 204, 21))",
                }}
              >
                {/* Animated shimmer effect */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to right, transparent, rgba(255, 255, 255, 0.4), transparent)",
                    animation: "shimmer_battle_pass 2s infinite",
                  }}
                ></div>

                {/* Inner highlight */}
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent"></div>
              </div>

              {/* XP text */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-white font-lucky text-sm drop-shadow-lg mt-0.5">
                  {experience} / {experienceToNext} XP
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer_battle_pass {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
