import { useRef } from "react";
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

export default function InGameBoard() {
  const { currentPlayerId, getReorderedPlayers, options } = useGameStore();
  const isMobile = useIsMobile();
  const nbPlayers = options.maxPlayers;

  const deckRef = useRef<HTMLDivElement>(null);
  const playerRefs = useRef<React.RefObject<HTMLDivElement>[]>([]);

  const playerLayout = isMobile
    ? getMobilePlayerLayout(nbPlayers)
    : getPlayerLayout(nbPlayers);

  const orderedPlayers = getReorderedPlayers(currentPlayerId);

  return (
    <div className="relative h-full w-full rounded-[1vh] overflow-hidden max-w-full max-h-full">
      <div className={playerLayout.container}>
        {Array.from({ length: nbPlayers }, (_, index) => {
          const player = orderedPlayers[index];
          if (!player) {
            return null;
          }

          // Créer une ref pour ce joueur si elle n'existe pas
          if (!playerRefs.current[index]) {
            playerRefs.current[index] = {
              current: null as unknown as HTMLDivElement,
            };
          }

          return (
            <CardContainer
              key={player.id}
              ref={playerRefs.current[index]}
              player={player}
              position={index}
              maxPlayers={nbPlayers}
            />
          );
        })}

        <DeckContainer
          ref={deckRef}
          className={getDeckContainerClasses(nbPlayers, isMobile)}
          maxPlayers={nbPlayers}
        />
      </div>

      <GameVersion />
      <AnimatedBanner />
    </div>
  );
}
