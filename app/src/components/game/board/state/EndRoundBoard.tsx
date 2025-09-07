import { useEffect, useState } from "react";
import Countdown from "@/components/game/countdown/Countdown";
import { useGameStore, Player } from "@/store/game";
import PlayerRankEndRound from "@/components/utils/rank/PlayerRankEndRound";
import ProgressRank from "@/components/utils/rank/ProgressRank";
import PlayerEvolutionEndRound from "@/components/utils/rank/PlayerEvolutionEndRound";

export default function EndRoundBoard() {
  const game = useGameStore();
  const players = game.players;

  const slides = ["ProgressBar", "Tableau"];
  const [currentPage, setCurrentPage] = useState(0);
  const intervalTime = 15000; // 15 secondes

  const totalPages = slides.length;

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const setPage = (index: number) => {
    setCurrentPage(index);
    resetAutoSlide(); // Réinitialise le timer lors d'un clic manuel
  };

  // Auto-slide avec setInterval
  const startAutoSlide = () => {
    const intervalId = setInterval(nextPage, intervalTime);
    return intervalId;
  };

  // Réinitialise l'intervalle quand l'utilisateur clique sur un bouton
  const resetAutoSlide = () => {
    // Cette fonction sera appelée dans setPage
  };

  useEffect(() => {
    const intervalId = startAutoSlide();
    return () => clearInterval(intervalId);
  }, [startAutoSlide]);

  return (
    <div className="end-round-board font-['MT'] relative w-full h-full rounded-5 bg-[var(--primary-color)] overflow-hidden select-none">
      {/* HEADER */}
      <Countdown visible={true} title="Fin de la manche" time={0} />

      {/* BODY */}
      <div className="er-body p-5 flex flex-row gap-5">
        {/* Classement de la manche - tableau */}
        <div className="er-ranking-slot er-ranking-round flex flex-col items-center gap-2.5 w-[40%]">
          <span className="ranking__title w-full text-center text-[var(--secondary-color)] uppercase font-bold bg-[var(--secondary-text-color)] rounded-2.5 p-2.5 px-5 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
            Classement de la manche
          </span>
          <div className="ranking-round__score flex flex-col bg-[var(--secondary-text-color)] items-center justify-center p-5 px-2.5 rounded-2.5 gap-1.5 w-full">
            {players.map((player: Player, index: number) => (
              <PlayerRankEndRound
                key={index}
                player={player}
                points={2}
                rankNumber={index + 1}
              />
            ))}
          </div>
        </div>

        {/* Classement général - tableau/progressbar */}
        <div className="er-ranking-slot er-ranking-game flex flex-col justify-between flex-grow h-[70vh]">
          <span className="ranking__title w-full text-center text-[var(--secondary-color)] uppercase font-bold bg-[var(--secondary-text-color)] rounded-2.5 p-2.5 px-5 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
            Classement général
          </span>

          {currentPage === 0 && <ProgressRank className="progress-rank" />}
          {currentPage === 1 && (
            <PlayerEvolutionEndRound
              playerScores={[1, 10, 20]}
              className="progress-rank"
            />
          )}

          {/* Texte du but du jeu */}
          <div className="rules flex flex-col items-center font-normal tracking-[1px] text-[10px] gap-px text-[var(--text-color)]">
            <span>PREMIER JOUEUR À 100 DÉCLENCHE LA FIN DE LA PARTIE</span>
            <span>
              <b>OBJECTIF</b> : FAIRE LE MOINS DE POINTS POUR GAGNER LA PARTIE
            </span>
          </div>

          {/* Dots for Navigation */}
          <div className="dots mt-2.5 flex justify-center gap-1.25">
            {slides.map((slide, index) => (
              <span
                key={index}
                className={`dot w-3 h-3 rounded-full cursor-pointer ${
                  index === currentPage
                    ? "bg-[var(--text-color)]"
                    : "bg-gray-500"
                }`}
                onClick={() => setPage(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
