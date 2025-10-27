import { useState } from "react";
import CardContainer from "@/components/game/cards/CardContainer";
import CardContainerSkeleton from "@/components/game/cards/CardContainerSkeleton";
import {
  getDeckContainerClasses,
  getPlayerLayout,
} from "@/scripts/references/playerLayouts";
import { getGradient, GradientType } from "@/enums/themes/list/PurpleTheme";
import DeckContainer from "../game/cards/DeckContainer";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Player } from "@/store/game/types";
export default function SkeletonDemo() {
  const [maxPlayers, setMaxPlayers] = useState(6);
  const [actualPlayers, setActualPlayers] = useState(3);
  const isMobile = useIsMobile();
  // Simuler des joueurs avec des valeurs fixes pour éviter l'erreur d'hydratation
  const mockPlayers = Array.from({ length: actualPlayers }, (_, index) => ({
    id: `player-${index}`,
    name: `Joueur ${index + 1}`,
    points: 50 + index * 10, // Valeurs fixes au lieu de Math.random()
    currentTime: 15 + index * 5, // Valeurs fixes au lieu de Math.random()
    skinCards: "default",
  }));

  const playerLayout = getPlayerLayout(maxPlayers);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Plateau de jeu</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Nombre maximum de joueurs: {maxPlayers}
            </label>
            <input
              type="range"
              min="2"
              max="6"
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

      <div
        className={`relative w-full h-192 rounded-lg border-2 border-gray-300 overflow-hidden ${getGradient(GradientType.BACKGROUND_MAIN, "to-br")}`}
      >
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
                player={player as Player}
                position={index}
                maxPlayers={maxPlayers}
              />
            );
          })}
        </div>

        {/* Deck central */}
        <div className="flex gap-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <DeckContainer
            className={getDeckContainerClasses(maxPlayers, isMobile)}
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
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
