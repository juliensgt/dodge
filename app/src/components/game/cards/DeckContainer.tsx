import { useIsMobile } from "@/hooks/useIsMobile";
import { getDeckSizes } from "@/scripts/references/playerLayouts";
import { gameService } from "@/services/game/game.service";
import { ActionType } from "../../../enums/action-type.enum";
import { useGameStore } from "@/store/game/game";
import { useCardStore } from "@/store/cards/cards.store";
import Card, { CardState } from "./card/Card";
import { useEffect } from "react";

interface DeckContainerProps {
  className?: string;
}

export default function DeckContainer({ className }: DeckContainerProps) {
  const isMobile = useIsMobile();
  const { options, deck, defausse, choices } = useGameStore();
  const sizes = getDeckSizes(options.maxPlayers, isMobile);
  const deckCliquable = useCardStore((state) => state.deckCliquable);
  const defausseCliquable = useCardStore((state) => state.defausseCliquable);

  const handleDeckClick = () => {
    if (choices.includes(ActionType.GET_CARD_IN_DECK)) {
      gameService.sendCardSourceChoice(ActionType.GET_CARD_IN_DECK);
    }
  };

  const handleDefausseClick = () => {
    if (choices.includes(ActionType.GET_CARD_IN_DEFAUSSE)) {
      gameService.sendCardSourceChoice(ActionType.GET_CARD_IN_DEFAUSSE);
    } else if (choices.includes(ActionType.SWITCH_FROM_DEFAUSSE_TO_PLAYER)) {
      gameService.sendCardSwitchChoice(
        ActionType.SWITCH_FROM_DEFAUSSE_TO_PLAYER
      );
    } else if (choices.includes(ActionType.SWITCH_FROM_DECK_TO_DEFAUSSE)) {
      gameService.sendCardSwitchChoice(ActionType.SWITCH_FROM_DECK_TO_DEFAUSSE);
    }
  };

  // Update the deck and defausse when they change
  useEffect(() => {}, [deck, defausse, choices]);

  return (
    <div className={`${className}`}>
      <div
        className={`flex flex-col relative hover:scale-105 transition-transform duration-200 ${deckCliquable ? "cursor-pointer" : "cursor-not-allowed"}`}
      >
        <Card
          cardState={deck?.cardState || CardState.CARD_BACK}
          size={sizes.card}
          cliquable={deckCliquable}
          onClick={handleDeckClick}
          cardValue={deck?.valeur ? parseInt(deck.valeur) : undefined}
        />
        <span className="text-white/75 text-sm text-center -bottom-6 left-0 right-0 absolute">
          Deck
        </span>
      </div>
      <div
        className={`flex flex-col relative hover:scale-105 transition-transform duration-200 ${defausseCliquable ? "cursor-pointer" : "cursor-not-allowed"}`}
      >
        <Card
          cardState={CardState.CARD_FRONT}
          size={sizes.card}
          cliquable={defausseCliquable}
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
