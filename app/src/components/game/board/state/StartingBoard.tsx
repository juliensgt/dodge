import { useGameStore } from "@/store/game";
import Countdown from "@/components/game/countdown/Countdown";
import PlayerVisitCard from "@/components/utils/players/PlayerVisitCard";
import PlayerSkeletonCard from "@/components/utils/players/PlayerSkeletonCard";
import { useTranslation } from "@/hooks/useTranslation";

export default function StartingBoard() {
  const { t } = useTranslation();
  const game = useGameStore();

  const time = 10;
  const codeGame = "TEST";
  const nbPlayersInGame = game.players.length;
  const maxPlayers = game.options.maxPlayers;

  const openRules = () => {
    // TODO: Implémenter l'ouverture des règles
  };

  const leaveGame = () => {
    // TODO: Implémenter la sortie de partie
  };

  return (
    <div className="font-['MT'] relative w-full h-full rounded-5 overflow-hidden select-none bg-[var(--secondary-color)]/15">
      {/* Countdown en header */}
      <Countdown visible={true} title={t("Salle d'attente")} time={time} />

      {/* Contenu principal avec espacement amélioré */}
      <div className="flex flex-col justify-center h-[calc(100%-20vh)] md:h-[calc(100%-25vh)] px-2 md:px-4">
        {/* Affichage des informations du début de la partie */}
        <div className="flex flex-row justify-between items-center mb-4 md:mb-6">
          {/* Bouton quitter la partie */}
          <div
            className="flex flex-row justify-center items-center gap-1 p-1.5 px-2 md:p-3 md:px-6 rounded-lg md:rounded-xl text-xs md:text-sm font-medium cursor-pointer text-white bg-red-600/80 backdrop-blur-sm border border-red-500/30 hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/25 transition-all duration-200"
            onClick={leaveGame}
          >
            <span className="text-sm md:text-lg">🚪</span>
            <span className="hidden sm:inline">{t("Quitter la partie")}</span>
            <span className="sm:hidden">{t("Quitter")}</span>
          </div>

          {/* Info de la partie avec design amélioré */}
          <div className="text-center">
            <div className="bg-[var(--action-chat-background-color)]/40 backdrop-blur-sm rounded-lg md:rounded-xl px-2 py-1.5 md:px-6 md:py-3 border border-[var(--action-chat-border-color)]/30 shadow-lg">
              <span className="text-[var(--text-color)] text-xs md:text-sm font-medium uppercase tracking-wide hidden md:block">
                Code de la partie
              </span>
              <div className="text-[var(--action-choice-active-color)] text-sm md:text-xl font-bold">
                #{codeGame}
              </div>
            </div>
          </div>

          {/* Bouton règles de la partie */}
          <div
            className="flex flex-row justify-center items-center gap-1 p-1.5 px-2 md:p-3 md:px-6 rounded-lg md:rounded-xl text-xs md:text-sm font-medium cursor-pointer text-white bg-gray-600/80 backdrop-blur-sm border border-gray-500/30 hover:bg-gray-600 hover:shadow-lg hover:shadow-gray-500/25 transition-all duration-200"
            onClick={openRules}
          >
            <span className="text-sm md:text-lg">📖</span>
            <span className="hidden sm:inline">Règles partie</span>
            <span className="sm:hidden">Règles</span>
          </div>
        </div>

        {/* Affichage des joueurs de la partie */}
        <div className="mx-2 md:mx-[10%] gap-2 md:gap-2.5 flex flex-row flex-wrap justify-center md:justify-start content-around">
          {Array.from({ length: maxPlayers }, (_, index) => {
            const player = game.players[index];
            return (
              <div
                key={index}
                className="w-[calc(50%-4px)] md:w-[calc(50%-10px)]"
              >
                {player && player.name ? (
                  <PlayerVisitCard player={player} />
                ) : (
                  <PlayerSkeletonCard />
                )}
              </div>
            );
          })}
        </div>
        {/* Compteur de joueurs avec design amélioré */}
        <div className="text-center mt-4 md:mt-6">
          <div className="inline-flex items-center gap-2 md:gap-3 bg-[var(--action-chat-background-color)]/30 backdrop-blur-sm rounded-full px-4 py-2 md:px-6 md:py-3 border border-[var(--action-chat-border-color)]/20 shadow-lg">
            <div className="flex items-center gap-1.5 md:gap-2">
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[var(--text-color)] text-xs md:text-sm font-medium">
                {nbPlayersInGame}/{maxPlayers}
              </span>
            </div>
            <span className="text-[var(--secondary-text-color)] text-xs md:text-sm font-medium">
              joueurs connectés
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
