import { useGameStore } from "@/store/game/game";
import Countdown from "@/components/game/countdown/Countdown";
import PlayerVisitCard from "@/components/utils/players/PlayerVisitCard";
import PlayerSkeletonCard from "@/components/utils/players/PlayerVisitCardSkeleton";
import { useTranslation } from "@/hooks/useTranslation";
import ActionButton from "@/components/utils/buttons/ActionButton";
import { useGradient } from "@/hooks/useGradient";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GameState } from "@/types/game/game.types";
import { useTimer } from "@/hooks/useTimer";

export default function StartingBoard() {
  const router = useRouter();
  const { t } = useTranslation();
  const { players, options, state, id } = useGameStore();

  const { ColorType } = useGradient();
  const [time, setTime] = useState(options.timeToStartGame);

  const codeGame = id.slice(0, 6);
  const nbPlayersInGame = players.length;
  const maxPlayers = options.maxPlayers;

  useTimer({
    initialTime: options.timeToStartGame,
    isActive: state === GameState.STARTED,
    onTimeUpdate: setTime,
  });

  const openRules = () => {
    // TODO: Implémenter l'ouverture des règles
    console.log("Règles de la partie");
  };

  const leaveGame = () => {
    router.push("/app");
  };

  return (
    <div className="relative w-full h-full rounded-5 overflow-hidden">
      <Countdown visible={true} title={t("Salle d'attente")} time={time} />

      <div className="flex flex-col justify-center px-2 md:px-4">
        <div className="flex flex-row justify-between items-center mb-4 md:mb-6">
          <ActionButton
            onClick={leaveGame}
            label={t("Quitter la partie")}
            color={{ color: ColorType.TRANSPARENT }}
          />

          <div className="text-center">
            <div className="bg-[var(--text-color)]/10 backdrop-blur-sm rounded-lg md:rounded-xl px-2 py-1.5 md:px-6 md:py-3 border border-[var(--text-color)]/5">
              <span className="text-[var(--text-color)] text-xs md:text-sm font-medium uppercase tracking-wide hidden md:block">
                Code de la partie
              </span>
              <div className="text-[var(--action-choice-active-color)] text-sm md:text-xl font-bold">
                #{codeGame}
              </div>
            </div>
          </div>

          <ActionButton
            onClick={openRules}
            label="Règles de la partie"
            color={{ color: ColorType.TRANSPARENT }}
            disabled={false}
          />
        </div>

        <div className="mx-2 md:mx-[10%] gap-2 md:gap-2.5 flex flex-row flex-wrap justify-center md:justify-start content-around">
          {Array.from({ length: maxPlayers }, (_, index) => {
            const player = players[index];
            return (
              <div
                key={index}
                className="w-[calc(50%-4px)] md:w-[calc(50%-10px)]"
              >
                {player ? (
                  <PlayerVisitCard player={player} />
                ) : (
                  <PlayerSkeletonCard />
                )}
              </div>
            );
          })}
        </div>
        <div className="text-center mt-4 md:mt-6">
          <div className="inline-flex items-center gap-2 md:gap-3 bg-[var(--text-color)]/10 backdrop-blur-sm rounded-full px-4 py-2 md:px-6 md:py-3 border border-[var(--action-chat-border-color)]/20 shadow-lg">
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
