import { useGameStore } from "@/store/game/game";
import DeckContainer from "@/components/game/cards/DeckContainer";
import CardContainer from "@/components/game/cards/CardContainer";
import {
  getPlayerLayout,
  getDeckContainerClasses,
} from "@/scripts/references/playerLayouts";
import { getMobilePlayerLayout } from "@/scripts/references/mobilePlayerLayouts";
import GameVersion from "@/components/utils/GameVersion";
import { useIsMobile } from "@/hooks/useIsMobile";
import AnimatedBanner from "@/components/utils/animations/AnimatedBanner";
import { useEffect } from "react";

export default function InGameBoard() {
  const { getPlayers, options, playerTimer, playerWhoPlays } = useGameStore();
  const isMobile = useIsMobile();
  const nbPlayers = options.maxPlayers;

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

        <DeckContainer
          className={getDeckContainerClasses(nbPlayers, isMobile)}
        />
      </div>

      <GameVersion />
      <AnimatedBanner />
    </div>
  );
}
