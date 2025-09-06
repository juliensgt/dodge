import { useEffect } from "react";
import CardComponent from "@/components/game/cards/card/Card";
import { useGameStore } from "@/store/game";
import Countdown from "@/components/game/countdown/Countdown";
import { useCardStore, Card } from "@/store/card";
import { useCountdownStore } from "@/store/countdown";

export default function CoupOeilBoard() {
  const cardStore = useCardStore();
  const gameStore = useGameStore();
  const countdownStore = useCountdownStore();

  const playerId = gameStore.currentPlayerId;
  const cards = cardStore.cards[playerId] || [];
  const time = countdownStore.time;

  useEffect(() => {
    gameStore.distributionCoupOeil();
  }, [gameStore]);

  const handleCardClick = (cardIndex: number) => {
    const success = cardStore.flipCardPlayer(playerId, cardIndex);
    if (!success) {
      // TODO: Implémenter le système de notifications
      console.error("Une erreur est survenue. Veuillez contacter le support.");
    }
  };

  return (
    <div className="relative w-full h-full rounded-5 overflow-hidden select-none">
      <Countdown
        visible={true}
        subtitle="Regardez 2 cartes dans votre main et retenez-les !"
        title="Coup d'œil"
        time={time}
      />

      <div className="flex justify-center items-center mx-auto my-[20vh] scale-120">
        <div className="fake-cards-container relative inline-flex flex-row">
          {cards.map((card: Card, index: number) => (
            <CardComponent
              key={index}
              cardState={card.cardState}
              cardImage={card.cardImage}
              cardValue={card.cardValue}
              cliquable={true}
              size="medium"
              onClick={() => handleCardClick(index)}
              className="fake-card mx-[2vw] relative"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
