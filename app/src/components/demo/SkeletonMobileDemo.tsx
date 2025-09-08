import { useState } from "react";
import CardContainer from "@/components/game/cards/CardContainer";
import CardContainerSkeleton from "@/components/game/cards/CardContainerSkeleton";
import { getMobilePlayerLayout } from "@/scripts/references/mobilePlayerLayouts";
export default function SkeletonMobileDemo() {
  const [maxPlayers, setMaxPlayers] = useState(6);
  const [actualPlayers, setActualPlayers] = useState(3);

  // Simuler des joueurs avec des valeurs fixes pour éviter l'erreur d'hydratation
  const mockPlayers = Array.from({ length: actualPlayers }, (_, index) => ({
    id: `player-${index}`,
    name: `Joueur ${index + 1}`,
    points: 50 + index * 10, // Valeurs fixes au lieu de Math.random()
    currentTime: 15 + index * 5, // Valeurs fixes au lieu de Math.random()
    skinCards: "default",
  }));

  const playerLayout = getMobilePlayerLayout(maxPlayers);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">
          Démonstration du plateau de jeu - Vue Mobile
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Simulation d&apos;un écran mobile (375x667px) avec les layouts desktop
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Nombre maximum de joueurs: {maxPlayers}
            </label>
            <input
              type="range"
              min="2"
              max="8"
              value={maxPlayers}
              onChange={(e) => setMaxPlayers(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Nombre de joueurs actuels: {actualPlayers}
            </label>
            <input
              type="range"
              min="0"
              max={maxPlayers}
              value={actualPlayers}
              onChange={(e) => setActualPlayers(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        <div className="text-sm text-gray-600 mb-4">
          <p>
            Configuration: {maxPlayers} positions maximum, {actualPlayers}{" "}
            joueurs connectés
          </p>
          <p>Les positions vides affichent des skeletons</p>
        </div>
      </div>

      <div className="mx-auto w-fit">
        <div className="relative w-[375px] h-[667px] bg-white rounded-lg border-2 border-gray-300 overflow-hidden shadow-lg">
          {/* Indicateur mobile */}
          <div className="absolute -top-8 left-0 right-0 text-center">
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
              📱 Vue Mobile (375x667px)
            </span>
          </div>
          {/* Container principal avec CSS Grid */}
          <div className={playerLayout.container}>
            {/* Boucle sur le nombre maximum de joueurs */}
            {Array.from({ length: maxPlayers }, (_, index) => {
              const player = mockPlayers[index];

              if (!player) {
                // Afficher un skeleton si pas de joueur à cette position
                return (
                  <CardContainerSkeleton
                    key={`skeleton-${index}`}
                    position={index}
                    maxPlayers={maxPlayers}
                  />
                );
              }

              return (
                <CardContainer
                  key={player.id}
                  player={player}
                  position={index}
                  maxPlayers={maxPlayers}
                />
              );
            })}
          </div>

          {/* Deck central */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-16 h-20 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
              DECK
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 md:mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-2">Layout CSS Grid</h3>
          <div className="text-sm text-gray-600">
            <p className="mb-2">Container: {playerLayout.container}</p>
            <div className="space-y-1">
              {playerLayout.positions.map((pos, index) => (
                <p key={index}>
                  Position {index + 1}: {pos}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-2">Joueurs simulés</h3>
          <div className="text-sm text-gray-600">
            {mockPlayers.map((player) => (
              <p key={player.id}>
                {player.name}: {player.points} points
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
