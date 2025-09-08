import { Player, useGameStore } from "@/store/game";
import DeckContainer from "@/components/game/cards/DeckContainer";
import CardContainer from "@/components/game/cards/CardContainer";
import CardContainerSkeleton from "@/components/game/cards/CardContainerSkeleton";
import {
  getPlayerLayout,
  getDeckContainerClasses,
} from "@/scripts/references/playerLayouts";
import { getMobilePlayerLayout } from "@/scripts/references/mobilePlayerLayouts";
import GameVersion from "@/components/utils/GameVersion";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function InGameBoard() {
  const game = useGameStore();
  const isMobile = useIsMobile();
  const nbPlayers = game.options.maxPlayers;

  const players = game.players;
  if (players === null) {
    return <div>Erreur: Aucun joueur trouvé</div>;
  }

  // Récupération du layout des joueurs en fonction du nombre max de joueurs et de la plateforme
  const playerLayout = isMobile
    ? getMobilePlayerLayout(nbPlayers)
    : getPlayerLayout(nbPlayers);

  console.log("isMobile", isMobile);

  // On récupère la liste des joueurs de la partie ordonnée pour que le joueur courant soit toujours en position 0
  const orderedPlayers = reorderedPlayers(players, game.currentPlayerId);

  function reorderedPlayers(players: Player[], currentPlayerId: string) {
    const currentPlayerIndex = players.findIndex(
      (player) => player.id === currentPlayerId
    );

    // Si le joueur courant est trouvé
    if (currentPlayerIndex !== -1) {
      return players
        .slice(currentPlayerIndex)
        .concat(players.slice(0, currentPlayerIndex));
    } else {
      console.error("Joueur courant non trouvé dans la liste des joueurs.");
      return [];
    }
  }
  return (
    <div
      className={`relative h-full w-full rounded-[1vh] overflow-hidden transform-origin-center max-w-full max-h-full select-none transition-all duration-300 font-['MT']`}
    >
      {/* Container principal avec CSS Grid */}
      <div className={playerLayout.container}>
        {/* Boucle sur le nombre maximum de joueurs */}
        {Array.from({ length: nbPlayers }, (_, index) => {
          const player = orderedPlayers[index];

          if (!player) {
            // Afficher un skeleton si pas de joueur à cette position
            return (
              <CardContainerSkeleton
                key={`skeleton-${index}`}
                position={index}
                maxPlayers={nbPlayers}
              />
            );
          }

          return (
            <CardContainer
              key={player.id}
              player={player}
              position={index}
              maxPlayers={nbPlayers}
            />
          );
        })}

        <DeckContainer
          className={getDeckContainerClasses(nbPlayers, isMobile)}
          maxPlayers={nbPlayers}
        />
      </div>

      {/* Affichage de la version du jeu */}
      <div className={`transition-all duration-300`}>
        <GameVersion />
      </div>
    </div>
  );
}
