import { Player, useGameStore } from "@/store/game";
import DeckContainer from "@/components/game/cards/DeckContainer";
import CardContainer from "@/components/game/cards/CardContainer";
import { cardsPositions } from "@/scripts/references/positionReference";
import TextButton from "@/components/utils/buttons/TextButton";
import TooltipText from "@/components/utils/buttons/TooltipText";
import Circle from "@/components/utils/circles/Circle";
import GameVersion from "@/components/utils/GameVersion";

export default function InGameBoard() {
  const game = useGameStore();
  const nbPlayers = game.options.maxPlayers;

  const players = game.players;
  if (players === null) {
    // TODO: afficher une erreur
    return <div>Erreur: Aucun joueur trouvé</div>;
  }

  // Récupération des positions des joueurs en fonction du nombre max de joueurs
  const playersCardsPositions =
    cardsPositions[nbPlayers as keyof typeof cardsPositions] ||
    cardsPositions[6];

  // On récupère la liste des joueurs de la partie ordonnée pour que le joueur courant soit toujours en position 0
  const orderedPlayers = reorderedPlayers(players, game.currentPlayerId);

  function reorderedPlayers(players: Player[], currentPlayerId: string) {
    // Trouver l'index du joueur courant dans la liste des joueurs
    const currentPlayerIndex = players.findIndex(
      (player) => player.id === currentPlayerId
    );

    // Si le joueur courant est trouvé
    if (currentPlayerIndex !== -1) {
      // Réorganiser la liste des joueurs pour que le joueur courant soit en position 0
      return players
        .slice(currentPlayerIndex)
        .concat(players.slice(0, currentPlayerIndex));
    } else {
      console.error("Joueur courant non trouvé dans la liste des joueurs.");
      return [];
    }
  }

  // TODO: Implémenter les hooks useIntervention et useDodge
  const keyPressed = null;
  const progress = 0;
  const canDodge = false;
  const dodge = () => {};

  return (
    <div
      className={`background-board relative h-full w-full bg-[var(--primary-color)] rounded-[1vh] overflow-hidden transform-origin-center max-w-full max-h-full select-none ${game.focusMode ? "focus-mode" : ""}`}
    >
      {/* Affichage des cercles dans le background*/}
      <Circle
        className="circle-left absolute top-1/2 left-0 transform -translate-x-[65%] -translate-y-1/2"
        size="80vh"
      />
      <Circle
        className="circle-right absolute top-1/2 right-0 transform translate-x-[65%] -translate-y-1/2"
        size="80vh"
      />
      <Circle
        className="circle-top absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-[79.5%]"
        size="140vh"
      />
      <Circle
        className="circle-bottom absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-[75%] border-solid border-gray-500 border-2"
        size="90vh"
      />

      {/* Affichage des cartes des joueurs */}
      {orderedPlayers.map((player, index) => (
        <CardContainer
          key={index}
          player={player}
          position={index}
          style={{
            top: playersCardsPositions[index].y,
            left: playersCardsPositions[index].x,
          }}
          className={index === 0 ? "main-player-card-container" : ""}
        />
      ))}

      {/* Affichage de la défausse et deck */}
      <div className="deck-container absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <DeckContainer />
      </div>

      {/* Affichage des boutons d'actions */}
      <div className="actions-buttons absolute right-[5%] bottom-[5%] flex gap-4">
        {/* Affichage de la touche appuyée lors d'une intervention */}
        {keyPressed != null && (
          <TextButton
            label={keyPressed}
            isActive={keyPressed != null}
            progress={progress}
          />
        )}
        {/* Affichage du bouton dodge */}
        {canDodge && <TextButton onClick={dodge} label="DODGE" />}
      </div>

      {/* Affichage du tooltip pour expliquer le bouton dodge*/}
      <TooltipText
        className="tooltip_dodge absolute right-[2vw] bottom-[5vh]"
        text="Le Dodge annonce le dernier tour de la manche, t'interdit de jouer et te donne -5 points. Utilise-le quand ton score est bas !"
      />

      {/* Affichage de la version du jeu */}
      <GameVersion />
    </div>
  );
}
