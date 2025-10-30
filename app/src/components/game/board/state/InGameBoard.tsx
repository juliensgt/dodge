import { useGameStore } from "@/store/game/game";
import DeckContainer from "@/components/game/cards/DeckContainer";
import CardContainer from "@/components/game/cards/CardContainer";
import {
  getPlayerLayout,
  getDeckContainerClasses,
} from "@/scripts/references/playerLayouts";
import { getMobilePlayerLayout } from "@/scripts/references/mobilePlayerLayouts";
import { useIsMobile } from "@/hooks/useIsMobile";
import AnimatedBanner from "@/components/utils/animations/AnimatedBanner";
import { useEffect } from "react";

export default function InGameBoard() {
  const { getPlayers, options, playerTimer, playerWhoPlays } = useGameStore();
  const isMobile = useIsMobile();
  const nbPlayers = options.maxPlayers;
  const round = useGameStore((state) => state.round);
  const playerLayout = isMobile
    ? getMobilePlayerLayout(nbPlayers)
    : getPlayerLayout(nbPlayers);

  useEffect(() => {}, [playerWhoPlays]);

  return (
    <div className="relative h-full w-full rounded-[1vh] overflow-hidden max-w-full max-h-full">
      <div className={playerLayout.container}>
        {Array.from({ length: nbPlayers }, (_, index) => {
          const player = getPlayers()[index];
          if (!player) {
            return null;
          }

          const isPlayerWhoPlays = playerWhoPlays?.id === player.id;

          return (
            <CardContainer
              key={player.id}
              player={player}
              position={index}
              maxPlayers={nbPlayers}
              isPlayerWhoPlays={isPlayerWhoPlays}
              playerTimer={isPlayerWhoPlays ? playerTimer : 0}
              maxTime={options.timeToPlay}
            />
          );
        })}
        {!isMobile ? (
          <div className="absolute top-[36vh] left-0 right-0 w-full text-center">
            <span
              className={`text-white/95 ${isMobile ? "text-lg" : "text-2xl"} font-lucky`}
            >
              Manche {round}
            </span>
          </div>
        ) : (
          <div className="absolute top-0 left-0 right-0 w-full text-center pt-2">
            <span
              className={`text-white/95 ${isMobile ? "text-lg" : "text-2xl"} font-lucky`}
            >
              Manche {round}
            </span>
          </div>
        )}
        <DeckContainer
          className={getDeckContainerClasses(nbPlayers, isMobile)}
        />
      </div>

      <AnimatedBanner />
    </div>
  );
}
