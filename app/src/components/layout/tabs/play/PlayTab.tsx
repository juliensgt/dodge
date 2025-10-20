import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import {
  faTrophy,
  faCrown,
  faStar,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import ChestSystem from "./components/ChestSystem";
import { useIsMobile } from "@/hooks/useIsMobile";

interface PlayTabProps {
  onShowGameList: () => void;
}

export default function PlayTab({ onShowGameList }: PlayTabProps) {
  const isMobile = useIsMobile();
  const router = useRouter();
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
    experience: 1800, // 40% progress to show left-to-right filling
    experienceToNext: 4500,
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
      unlockDate: new Date("2025-10-25T00:00:00Z"),
      state: ChestState.LOCKED,
    },
  ];

  const handleCreateGame = () => {
    router.push("/app/create-game");
  };

  const handleJoinGame = () => {
    const gameId = "66c3a1e23c0a6642ee088edc";
    router.push(`/app/game/${gameId}`);
  };

  // Simplified responsive classes
  const containerHeight = isMobile
    ? "h-[calc(100vh-3.5rem-4rem)]" // Account for top header (3.5rem) + bottom nav (4rem)
    : "min-h-[calc(100vh-8rem)]";
  const containerOverflow = isMobile ? "overflow-hidden" : "overflow-y-auto";
  const padding = isMobile ? "px-2 py-2" : "px-4 py-4";
  const maxWidth = isMobile ? "" : "max-w-4xl mx-auto";

  // Common sizes
  const textSize = isMobile ? "text-xs" : "text-lg";
  const smallTextSize = isMobile ? "text-xs" : "text-sm";
  const imageSize = isMobile ? 60 : 100;
  const gap = isMobile ? "gap-2" : "gap-6";

  return (
    <div className={`flex flex-col ${containerHeight} ${containerOverflow}`}>
      {/* Battle Pass and Missions Row */}
      <div className={padding}>
        <div className={`flex gap-2 ${maxWidth}`}>
          {/* Missions */}
          <motion.button
            onClick={() => setShowMissions(true)}
            className={`${isMobile ? "" : "flex-1"} transition-all duration-300`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isMobile ? (
              <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-green-500 to-emerald-500 backdrop-blur-xl rounded-full">
                <FontAwesomeIcon icon={faBook} className="text-white text-lg" />
              </div>
            ) : (
              <div className="flex items-center gap-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-xl rounded-xl p-3 border border-white/20 hover:border-green-400 h-full">
                <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-green-500 to-emerald-500 backdrop-blur-xl rounded-full">
                  <FontAwesomeIcon
                    icon={faBook}
                    className="text-white text-lg"
                  />
                </div>

                <div className="text-left">
                  <div className={`text-white font-bold ${textSize}`}>
                    Missions
                  </div>
                  <div className={`text-white/70 ${smallTextSize}`}>
                    3 disponibles
                  </div>
                </div>
              </div>
            )}
          </motion.button>
          {/*Leaderboard*/}
          <motion.button
            onClick={() => setShowLeaderboard(true)}
            className={`${isMobile ? "" : "flex-1"} transition-all duration-300`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isMobile ? (
              <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-yellow-500 to-orange-500 backdrop-blur-xl rounded-full">
                <FontAwesomeIcon
                  icon={faTrophy}
                  className="text-white text-lg"
                />
              </div>
            ) : (
              <div className="flex items-center gap-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-xl rounded-xl p-3 border border-white/20 hover:border-yellow-400 h-full">
                <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-yellow-500 to-orange-500 backdrop-blur-xl rounded-full">
                  <FontAwesomeIcon
                    icon={faTrophy}
                    className="text-white text-lg"
                  />
                </div>
                <div className="text-left">
                  <div className={`text-white font-bold ${textSize}`}>
                    Ligue
                  </div>
                  <div className={`text-white/70 ${smallTextSize}`}>
                    Rang #{leaderboard.find((p) => p.name === "You")?.rank}
                  </div>
                </div>
              </div>
            )}
          </motion.button>
          {/* Battle Pass */}
          <div
            className={`${isMobile ? "flex-1" : "flex-2"} bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-xl ${isMobile ? "p-2" : "p-3"} border border-white/20 h-full`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faCrown} className="text-yellow-400" />
                <span className={`text-white font-bold ${textSize}`}>
                  Passe de combat
                </span>
                {!isMobile && (
                  <span className={`text-white/70 ${smallTextSize}`}>
                    Jouer pour gagner des XP
                  </span>
                )}
              </div>
            </div>
            <div className="relative">
              <div className="bg-black/30 rounded-full h-6 flex items-center">
                <div
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 h-6 rounded-full transition-all duration-1000 ease-out flex items-center justify-center relative overflow-hidden"
                  style={{
                    width: `${(battlePassProgress.experience / battlePassProgress.experienceToNext) * 100}%`,
                  }}
                >
                  <span
                    className={`text-black/80 font-bold ${smallTextSize} z-10 drop-shadow-sm`}
                  >
                    {battlePassProgress.experience}/
                    {battlePassProgress.experienceToNext}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Action Buttons */}
      <div className={padding}>
        <div className={`grid grid-cols-3 ${gap} ${maxWidth}`}>
          <motion.button
            onClick={handleCreateGame}
            className={`group bg-gradient-to-br from-yellow-400/20 to-orange-500/20 backdrop-blur-xl rounded-2xl ${isMobile ? "p-4" : "p-8"} border-2 border-white/30 hover:border-yellow-400 transition-all duration-300 active:scale-95`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex flex-col items-center gap-2">
              <Image
                src="/images/logos/create_game.png"
                alt="Create"
                width={imageSize}
                height={imageSize}
                className="drop-shadow-lg"
              />
              <h3
                className={`${isMobile ? "text-xs" : "text-xl"} font-bold text-white text-center leading-tight`}
              >
                Partie privée
              </h3>
            </div>
          </motion.button>

          <motion.button
            onClick={handleJoinGame}
            className={`group bg-gradient-to-br from-pink-500/20 to-purple-500/20 backdrop-blur-xl rounded-2xl ${isMobile ? "p-4" : "p-8"} border-2 border-white/30 hover:border-pink-500 transition-all duration-300 active:scale-95`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex flex-col items-center gap-2">
              <Image
                src="/images/logos/play_game.png"
                alt="Play"
                width={imageSize}
                height={imageSize}
                className="drop-shadow-lg"
              />
              <h3
                className={`${isMobile ? "text-xs" : "text-xl"} font-bold text-white text-center leading-tight`}
              >
                Jouer
              </h3>
            </div>
          </motion.button>

          <motion.button
            onClick={onShowGameList}
            className={`group bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-xl rounded-2xl ${isMobile ? "p-4" : "p-8"} border-2 border-white/30 hover:border-blue-500 transition-all duration-300 active:scale-95`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex flex-col items-center gap-2">
              <Image
                src="/images/logos/search_game.png"
                alt="Search"
                width={imageSize}
                height={imageSize}
                className="drop-shadow-lg"
              />
              <h3
                className={`${isMobile ? "text-xs" : "text-xl"} font-bold text-white text-center leading-tight`}
              >
                Rechercher
              </h3>
            </div>
          </motion.button>
        </div>
      </div>

      <div className={`${padding} ${isMobile ? "flex-1" : ""}`}>
        {/* Stats Cards
        <div className={`grid grid-cols-2 ${gap} ${maxWidth}`}>
          <div
            className={`bg-black/20 backdrop-blur-xl rounded-xl ${cardPadding} border border-white/10`}
          >
            <div
              className={`flex items-center ${isMobile ? "gap-2 mb-2" : "gap-3 mb-4"}`}
            >
              <FontAwesomeIcon
                icon={faChartLine}
                className={`text-blue-400 ${isMobile ? "text-sm" : "text-lg"}`}
              />
              <span className={`text-white font-bold ${textSize}`}>
                Statistiques
              </span>
            </div>
            <div className={isMobile ? "space-y-1" : "space-y-3"}>
              <div className={`flex justify-between ${smallTextSize}`}>
                <span className="text-white/70">Parties jouées</span>
                <span className="text-white font-bold">
                  {playerStats.gamesPlayed}
                </span>
              </div>
              <div className={`flex justify-between ${smallTextSize}`}>
                <span className="text-white/70">Victoires</span>
                <span className="text-white font-bold">{playerStats.wins}</span>
              </div>
              <div className={`flex justify-between ${smallTextSize}`}>
                <span className="text-white/70">Taux de victoire</span>
                <span className="text-white font-bold">
                  {playerStats.winRate}%
                </span>
              </div>
            </div>
          </div>

          <div
            className={`bg-black/20 backdrop-blur-xl rounded-xl ${cardPadding} border border-white/10`}
          >
            <div
              className={`flex items-center ${isMobile ? "gap-2 mb-2" : "gap-3 mb-4"}`}
            >
              <FontAwesomeIcon
                icon={faFire}
                className={`text-orange-400 ${isMobile ? "text-sm" : "text-lg"}`}
              />
              <span className={`text-white font-bold ${textSize}`}>Séries</span>
            </div>
            <div className={isMobile ? "space-y-1" : "space-y-3"}>
              <div className={`flex justify-between ${smallTextSize}`}>
                <span className="text-white/70">Série actuelle</span>
                <span className="text-white font-bold">
                  {playerStats.currentStreak}
                </span>
              </div>
              <div className={`flex justify-between ${smallTextSize}`}>
                <span className="text-white/70">Meilleure série</span>
                <span className="text-white font-bold">
                  {playerStats.bestStreak}
                </span>
              </div>
              <div className={`flex justify-between ${smallTextSize}`}>
                <span className="text-white/70">Niveau</span>
                <span className="text-white font-bold">
                  {playerStats.level}
                </span>
              </div>
            </div>
          </div>
        </div>*/}

        {/* Desktop Chest System */}
        {!isMobile && (
          <ChestSystem
            chests={chests}
            currentTime={currentTime}
            isMobile={isMobile}
            padding={padding}
            maxWidth={maxWidth}
          />
        )}
      </div>

      {/* Mobile Chest System - Positioned above bottom nav */}
      {isMobile && (
        <ChestSystem
          chests={chests}
          currentTime={currentTime}
          isMobile={isMobile}
          padding={padding}
          maxWidth={maxWidth}
        />
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
