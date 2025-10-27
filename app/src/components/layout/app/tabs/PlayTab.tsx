import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import ChestSystem from "./play/components/ChestSystem";
import { useIsMobile } from "@/hooks/useIsMobile";
import PlayButtons from "./play/buttons/PlayButtons";
import PlayerProfileCard from "./play/components/PlayerProfileCard";
import MissionsBubble from "./play/components/MissionsBubble";
import LeaderboardBubble from "./play/components/LeaderboardBubble";
import BattlePassCard from "./play/components/BattlePassCard";

export default function PlayTab() {
  const isMobile = useIsMobile();
  const [showMissions, setShowMissions] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [currentTime, setCurrentTime] = useState(dayjs());

  // Update time every minute for countdown timers
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const battlePassProgress = {
    currentLevel: 8,
    experience: 5, // 40% progress to show left-to-right filling
    experienceToNext: 10,
    isPremium: true,
  };

  const missions = [
    {
      id: 1,
      title: "Gagner 3 parties",
      progress: 2,
      max: 3,
      reward: "100 pièces",
      completed: false,
    },
    {
      id: 2,
      title: "Jouer 5 parties",
      progress: 5,
      max: 5,
      reward: "50 gemmes",
      completed: true,
    },
    {
      id: 3,
      title: "Série de 3 victoires",
      progress: 1,
      max: 3,
      reward: "200 pièces",
      completed: false,
    },
  ];

  const leaderboard = [
    { rank: 1, name: "ProGamer", elo: 2450, level: 20 },
    { rank: 2, name: "CardMaster", elo: 2380, level: 19 },
    { rank: 3, name: "DodgeKing", elo: 2320, level: 18 },
    { rank: 4, name: "You", elo: 1850, level: 15 },
  ];

  type ChestType = "bronze" | "silver" | "gold" | "diamond";
  enum ChestState {
    LOCKED = "LOCKED",
    UNLOCKED = "UNLOCKED",
  }
  interface Chest {
    id: number;
    type: ChestType;
    unlockDate: Date;
    state: ChestState;
  }

  const chests: Chest[] = [
    {
      id: 1,
      type: "bronze",
      unlockDate: new Date("2025-10-20T22:00:00Z"),
      state: ChestState.UNLOCKED,
    },
    {
      id: 2,
      type: "silver",
      unlockDate: new Date("2025-10-22T00:00:00Z"),
      state: ChestState.UNLOCKED,
    },
    {
      id: 3,
      type: "gold",
      unlockDate: new Date("2025-10-26T00:00:00Z"),
      state: ChestState.UNLOCKED,
    },
  ];

  // Simplified responsive classes
  const containerHeight = isMobile ? "h-full" : "min-h-[calc(100vh-8rem)]";
  const containerOverflow = isMobile ? "" : "overflow-y-auto";
  const padding = isMobile ? "px-2 py-2" : "px-2 py-2";
  const maxWidth = isMobile ? "" : "max-w-4xl mx-auto";

  // Common sizes
  const smallTextSize = isMobile ? "text-xs" : "text-sm";

  return (
    <div className={`flex flex-col ${containerHeight} ${containerOverflow}`}>
      {/* Player Profile Card */}
      <PlayerProfileCard padding={padding} maxWidth={maxWidth} />

      {/* Battle Pass and Missions Row */}
      <div className={padding}>
        <div
          className={`flex ${isMobile ? "justify-between items-start" : "gap-2"} ${maxWidth}`}
        >
          {isMobile ? (
            <>
              {/* Mobile: Left column with Missions and Leaderboard stacked */}
              <div className="flex flex-col gap-2">
                <MissionsBubble
                  isMobile={isMobile}
                  onClick={() => setShowMissions(true)}
                  missionCount={missions.length}
                />
                <LeaderboardBubble
                  isMobile={isMobile}
                  onClick={() => setShowLeaderboard(true)}
                  userRank={leaderboard.find((p) => p.name === "You")?.rank}
                />
              </div>
              {/* Mobile: Right side with Battle Pass */}
              <BattlePassCard
                isMobile={isMobile}
                currentLevel={battlePassProgress.currentLevel}
                experience={battlePassProgress.experience}
                experienceToNext={battlePassProgress.experienceToNext}
                isPremium={battlePassProgress.isPremium}
              />
            </>
          ) : (
            <>
              {/* Desktop: All three side by side */}
              <MissionsBubble
                isMobile={isMobile}
                onClick={() => setShowMissions(true)}
                missionCount={missions.length}
              />
              <LeaderboardBubble
                isMobile={isMobile}
                onClick={() => setShowLeaderboard(true)}
                userRank={leaderboard.find((p) => p.name === "You")?.rank}
              />
              <BattlePassCard
                isMobile={isMobile}
                currentLevel={battlePassProgress.currentLevel}
                experience={battlePassProgress.experience}
                experienceToNext={battlePassProgress.experienceToNext}
                isPremium={battlePassProgress.isPremium}
              />
            </>
          )}
        </div>
      </div>

      {/* Main Action Buttons */}
      <div className={`${padding} ${isMobile ? "flex-1" : ""}`}>
        {/* Desktop Chest System */}
        {!isMobile && (
          <>
            <PlayButtons maxWidth={maxWidth} />
            <ChestSystem
              chests={chests}
              currentTime={currentTime}
              isMobile={isMobile}
              padding={padding}
              maxWidth={maxWidth}
            />
          </>
        )}
      </div>

      {/* Mobile Bottom Menu - Positioned above nav */}
      {isMobile && (
        <div>
          <div className={padding}>
            <PlayButtons maxWidth={maxWidth} />
          </div>
          <ChestSystem
            chests={chests}
            currentTime={currentTime}
            isMobile={isMobile}
            padding={padding}
            maxWidth={maxWidth}
          />
        </div>
      )}

      {/* Modals */}
      <AnimatePresence>
        {showMissions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowMissions(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`bg-gradient-to-b from-purple-900 to-blue-900 rounded-2xl ${isMobile ? "p-6" : "p-8"} w-full ${isMobile ? "max-w-sm" : "max-w-md"} border border-white/20`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3
                  className={`text-white font-bold ${isMobile ? "text-lg" : "text-xl"}`}
                >
                  Missions
                </h3>
                <button
                  onClick={() => setShowMissions(false)}
                  className={`text-white/70 hover:text-white ${isMobile ? "" : "text-xl"}`}
                >
                  ✕
                </button>
              </div>
              <div className={isMobile ? "space-y-2" : "space-y-3"}>
                {missions.map((mission) => (
                  <div
                    key={mission.id}
                    className={`bg-black/20 rounded-xl ${isMobile ? "p-3" : "p-4"} border border-white/10`}
                  >
                    <div
                      className={`flex items-center justify-between ${isMobile ? "mb-2" : "mb-3"}`}
                    >
                      <span
                        className={`text-white font-bold ${isMobile ? "text-sm" : "text-base"}`}
                      >
                        {mission.title}
                      </span>
                      <span className={`text-white/70 ${smallTextSize}`}>
                        {mission.progress}/{mission.max}
                      </span>
                    </div>
                    <div
                      className={`w-full bg-black/30 rounded-full ${isMobile ? "h-2" : "h-3"} ${isMobile ? "mb-2" : "mb-3"}`}
                    >
                      <div
                        className={`bg-gradient-to-r from-green-400 to-emerald-500 ${isMobile ? "h-2" : "h-3"} rounded-full transition-all duration-500`}
                        style={{
                          width: `${(mission.progress / mission.max) * 100}%`,
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-yellow-400 ${smallTextSize} font-bold`}
                      >
                        {mission.reward}
                      </span>
                      {mission.completed && (
                        <FontAwesomeIcon
                          icon={faStar}
                          className="text-yellow-400"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
        {showLeaderboard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowLeaderboard(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`bg-gradient-to-b from-purple-900 to-blue-900 rounded-2xl ${isMobile ? "p-6" : "p-8"} w-full ${isMobile ? "max-w-sm" : "max-w-md"} border border-white/20`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3
                  className={`text-white font-bold ${isMobile ? "text-lg" : "text-xl"}`}
                >
                  Classement
                </h3>
                <button
                  onClick={() => setShowLeaderboard(false)}
                  className={`text-white/70 hover:text-white ${isMobile ? "" : "text-xl"}`}
                >
                  ✕
                </button>
              </div>
              <div className={isMobile ? "space-y-2" : "space-y-3"}>
                {leaderboard.map((player) => (
                  <div
                    key={player.rank}
                    className={`flex items-center justify-between ${isMobile ? "p-3" : "p-4"} rounded-xl ${
                      player.name === "You"
                        ? "bg-yellow-400/20 border border-yellow-400/30"
                        : "bg-black/20 border border-white/10"
                    }`}
                  >
                    <div
                      className={`flex items-center ${isMobile ? "gap-3" : "gap-4"}`}
                    >
                      <div
                        className={`${isMobile ? "w-8 h-8 text-sm" : "w-10 h-10 text-base"} rounded-full flex items-center justify-center font-bold ${
                          player.rank <= 3
                            ? "bg-gradient-to-br from-yellow-400 to-orange-500 text-black"
                            : "bg-white/20 text-white"
                        }`}
                      >
                        {player.rank}
                      </div>
                      <div>
                        <div
                          className={`text-white font-bold ${isMobile ? "text-sm" : "text-base"}`}
                        >
                          {player.name}
                        </div>
                        <div className={`text-white/70 ${smallTextSize}`}>
                          Niveau {player.level}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-white font-bold ${isMobile ? "text-sm" : "text-base"}`}
                      >
                        {player.elo}
                      </div>
                      <div className={`text-white/70 ${smallTextSize}`}>
                        ELO
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
