import { useState } from "react";
import Card, { CardState } from "@/components/game/cards/card/Card";
import CardSkeleton from "@/components/game/cards/card/CardSkeleton";

export default function CardSystemDemo() {
  const [showSkeletons, setShowSkeletons] = useState(true);

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
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">
          Démonstration du système de cartes
        </h2>
        <div className="flex gap-4 items-center">
          <button
            onClick={() => setShowSkeletons(!showSkeletons)}
            className={`px-4 py-2 rounded ${
              showSkeletons
                ? "bg-green-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            {showSkeletons ? "Masquer les skeletons" : "Afficher les skeletons"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Joueur principal */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">
            Joueur principal (cartes medium)
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
            {showSkeletons && (
              <>
                <CardSkeleton size="medium" />
                <CardSkeleton size="medium" />
              </>
            )}
          </div>
        </div>

        {/* Autres joueurs */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">
            Autres joueurs (cartes small)
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
            {showSkeletons && (
              <>
                <CardSkeleton size="small" />
                <CardSkeleton size="small" />
              </>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">États des cartes</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <Card cardState={CardState.CARD_BACK} size="medium" />
            <p className="mt-2 text-sm text-gray-600">Carte face cachée</p>
          </div>
          <div className="text-center">
            <Card
              cardState={CardState.CARD_FRONT}
              cardValue={5}
              size="medium"
            />
            <p className="mt-2 text-sm text-gray-600">Carte face visible</p>
          </div>
          <div className="text-center">
            <Card cardState={CardState.CARD_REMOVED} size="medium" />
            <p className="mt-2 text-sm text-gray-600">Carte supprimée</p>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Skeletons</h3>
        <div className="flex gap-4">
          <div className="text-center">
            <CardSkeleton size="small" />
            <p className="mt-2 text-sm text-gray-600">Small skeleton</p>
          </div>
          <div className="text-center">
            <CardSkeleton size="medium" />
            <p className="mt-2 text-sm text-gray-600">Medium skeleton</p>
          </div>
          <div className="text-center">
            <CardSkeleton size="large" />
            <p className="mt-2 text-sm text-gray-600">Big skeleton</p>
          </div>
        </div>
      </div>
    </div>
  );
}
