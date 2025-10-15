import { useIsMobile } from "@/hooks/useIsMobile";
import { getDeckSizes } from "@/scripts/references/playerLayouts";
import { gameService } from "@/services/game/game.service";
import { ActionType } from "../../../enums/action-type.enum";
import { useGameStore } from "@/store/game/game";
import Card, { CardState } from "./card/Card";
import { useEffect } from "react";

interface DeckContainerProps {
  className?: string;
}

export default function DeckContainer({ className }: DeckContainerProps) {
  const isMobile = useIsMobile();
  const { options, deck, defausse } = useGameStore();
  const sizes = getDeckSizes(options.maxPlayers, isMobile);
  const { playerWhoPlays, currentPlayerId } = useGameStore();
  const isCurrentPlayer = currentPlayerId === playerWhoPlays?.id;

  const handleDeckClick = () => {
    console.log("Deck clicked and isCurrentPlayer");
    gameService.sendCardSourceChoice(ActionType.SWITCH_WITH_DECK);
  };

  const handleDefausseClick = () => {
    console.log("Defausse clicked and isCurrentPlayer");
    gameService.sendCardSourceChoice(ActionType.SWITCH_WITH_DEFAUSSE);
  };

  // Update the deck and defausse when they change
  useEffect(() => {}, [deck, defausse]);

  return (
    <div className={`${className}`}>
      <div
        className={`flex flex-col relative hover:scale-105 transition-transform duration-200 ${isCurrentPlayer ? "cursor-pointer" : "cursor-not-allowed"}`}
      >
        <Card
          cardState={deck?.cardState || CardState.CARD_BACK}
          size={sizes.card}
          cliquable={isCurrentPlayer}
          onClick={handleDeckClick}
          cardValue={deck?.valeur ? parseInt(deck.valeur) : undefined}
        />
        <span className="text-white/75 text-sm text-center -bottom-6 left-0 right-0 absolute">
          Deck
        </span>
      </div>
      <div
        className={`flex flex-col relative hover:scale-105 transition-transform duration-200 ${isCurrentPlayer ? "cursor-pointer" : "cursor-not-allowed"}`}
      >
        <Card
          cardState={CardState.CARD_FRONT}
          size={sizes.card}
          cliquable={isCurrentPlayer}
          cardValue={
            defausse?.[0]?.valeur ? parseInt(defausse[0].valeur) : undefined
          }
          onClick={handleDefausseClick}
        />
        <span className="text-white/75 text-sm text-center -bottom-6 left-0 right-0 absolute">
          Défausse
        </span>
      </div>
    </div>
  );
}
