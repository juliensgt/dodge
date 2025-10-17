import Countdown from "@/components/game/countdown/Countdown";
import { useGameStore } from "@/store/game/game";
import { useCardSkin } from "@/hooks/useCardSkin";
import { Card, CardState } from "@/store/cards/cards.type";
import CardComponent from "../../cards/card/Card";
import { useTimer } from "@/hooks/useTimer";
import { useEffect, useState } from "react";
import { GameState } from "@/types/game/game.types";
import { httpService } from "@/services/http/http.service";
import { motion } from "framer-motion";

export default function CoupOeilBoard() {
  const { selectedSkinId } = useCardSkin();
  const { state, options, currentPlayerId } = useGameStore();
  const [time, setTime] = useState(options.timeToSeeCards);
  const [cards, setCards] = useState<Card[]>([]);

  // Initialize cards
  useEffect(() => {
    setCards(
      new Array(options.nbCardsPerPlayer).fill({
        cardState: CardState.CARD_BACK,
        valeur: undefined,
      })
    );
  }, [options.nbCardsPerPlayer]);

  const handleCardClick = async (index: number) => {
    await httpService
      .get<Card>(`/players/${currentPlayerId}/hand/${index}`)
      .then((card) => {
        setCards((prevCards) =>
          prevCards.map((cardPlayer, indexPlayer) =>
            indexPlayer === index
              ? {
                  ...cardPlayer,
                  cardState: CardState.CARD_FRONT,
                  valeur: card.valeur,
                }
              : cardPlayer
          )
        );
      });
  };

  useTimer({
    initialTime: options.timeToSeeCards,
    isActive: state === GameState.COUP_OEIL,
    onTimeUpdate: setTime,
  });

  return (
    <div className="relative w-full h-full rounded-5 overflow-hidden">
      <Countdown
        visible={true}
        subtitle="Regardez 2 cartes dans votre main et retenez-les !"
        title="Coup d'œil"
        time={time}
      />

      <div className="flex justify-center items-center mx-auto my-[20vh]">
        <div className="relative inline-flex flex-row gap-4">
          {cards.map((card: Card, index: number) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                scale: 0.3,
                x: 0,
                y: -200,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                x: 0,
                y: 0,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
                ease: [0.34, 1.56, 0.64, 1],
              }}
            >
              <CardComponent
                cardState={card.cardState}
                cardValue={card.valeur ? parseInt(card.valeur) : undefined}
                cliquable={true}
                size="large"
                onClick={
                  card.cardState === CardState.CARD_BACK
                    ? () => handleCardClick(index)
                    : undefined
                }
                skinId={selectedSkinId}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
