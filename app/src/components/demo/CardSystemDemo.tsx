import Card, { CardState } from "@/components/game/cards/card/Card";
import CardSkeleton from "@/components/game/cards/card/CardSkeleton";
import ThemeSelector from "../utils/selectors/ThemeSelector";

export default function CardSystemDemo() {
  const demoCards = [
    { id: "1", cardState: CardState.CARD_BACK, cardValue: 1, cliquable: true },
    { id: "2", cardState: CardState.CARD_FRONT, cardValue: 2, cliquable: true },
    {
      id: "3",
      cardState: CardState.CARD_REMOVED,
      cardValue: 3,
      cliquable: false,
    },
  ];

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4 text-white">
          Démonstration du système de cartes
        </h2>
        <div className="flex gap-4 items-center flex-wrap">
          {/* Theme selector */}
          <div className="flex gap-2 items-center">
            <ThemeSelector />
          </div>
        </div>
      </div>

      <div className="mt-8 mb-8 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 className="text-lg font-semibold mb-4 text-white">
          États des cartes
        </h3>
        <div className="flex flex-wrap gap-10 justify-center items-center">
          <div className="text-center">
            <Card cardState={CardState.CARD_BACK} size="medium" />
            <p className="mt-2 text-sm text-white/70">Carte face cachée</p>
          </div>
          <div className="text-center">
            <Card
              cardState={CardState.CARD_FRONT}
              cardValue={5}
              size="medium"
            />
            <p className="mt-2 text-sm text-white/70">Carte face visible</p>
          </div>
          <div className="text-center">
            <Card cardState={CardState.CARD_REMOVED} size="medium" />
            <p className="mt-2 text-sm text-white/70">Carte supprimée</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Joueur principal */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h3 className="text-lg font-semibold mb-4 text-white">
            Cartes Medium
          </h3>
          <div className="flex flex-wrap gap-3">
            {demoCards.map((card) => (
              <Card
                key={card.id}
                cardState={card.cardState}
                cardValue={card.cardValue}
                cliquable={card.cliquable}
                size="medium"
                onClick={() => console.log(`Carte ${card.id} cliquée`)}
              />
            ))}
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h3 className="text-lg font-semibold mb-4 text-white">
            Cartes Small
          </h3>
          <div className="flex flex-wrap gap-2">
            {demoCards.map((card) => (
              <Card
                key={card.id}
                cardState={card.cardState}
                cardValue={card.cardValue}
                cliquable={false}
                size="small"
              />
            ))}
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h3 className="text-lg font-semibold mb-4 text-white">Cartes Big</h3>
          <div className="flex flex-wrap gap-2">
            {demoCards.map((card) => (
              <Card
                key={card.id}
                cardState={card.cardState}
                cardValue={card.cardValue}
                cliquable={false}
                size="large"
              />
            ))}
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h3 className="text-lg font-semibold mb-4 text-white">Skeletons</h3>
          <div className="flex gap-4">
            <div className="text-center">
              <CardSkeleton size="small" />
              <p className="mt-2 text-sm text-white/70">Small skeleton</p>
            </div>
            <div className="text-center">
              <CardSkeleton size="medium" />
              <p className="mt-2 text-sm text-white/70">Medium skeleton</p>
            </div>
            <div className="text-center">
              <CardSkeleton size="large" />
              <p className="mt-2 text-sm text-white/70">Big skeleton</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
