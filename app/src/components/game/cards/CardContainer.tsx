import { Player } from "@/store/game";
import Card, { CardState } from "./card/Card";
import { getPlayerClasses } from "@/scripts/references/playerLayouts";
import { useCardSkin } from "@/hooks/useCardSkin";
import PlayerAvatar from "@/components/utils/players/PlayerAvatar";
import PlayerName from "@/components/utils/players/PlayerName";
import PlayerPoints from "@/components/utils/players/PlayerPoints";

interface CardContainerProps {
  player: Player;
  position: number;
  maxPlayers: number;
  style?: React.CSSProperties;
  className?: string;
}

export default function CardContainer({
  player,
  position,
  maxPlayers,
  style,
  className = "",
}: CardContainerProps) {
  const playerClasses = getPlayerClasses(maxPlayers, position);
  const { selectedSkinId } = useCardSkin();

  // Simuler des cartes pour le joueur (à remplacer par les vraies données)
  const playerCards = Array.from({ length: 4 }, (_, index) => ({
    id: `${player.id}-${index}`,
    cardState: CardState.CARD_BACK,
    cardValue: index + 1,
    cliquable: position === 0, // Seul le joueur principal peut cliquer
  }));

  const isMainPlayer = position === 0;

  return (
    <div
      className={`${playerClasses.container} select-none ${className}`}
      style={style}
    >
      <div className="flex flex-col gap-4">
        {/* Cartes du joueur*/}
        <div
          className={
            isMainPlayer ? "flex gap-2 w-fit" : "grid grid-cols-2 gap-2 w-fit"
          }
        >
          {playerCards.map((card) => (
            <Card
              key={card.id}
              cardState={card.cardState}
              cardValue={card.cardValue}
              cliquable={card.cliquable}
              size={isMainPlayer ? "big" : "small"}
              skinId={selectedSkinId}
            />
          ))}
        </div>
        {/* Profil du joueur */}
        <div
          className={`${playerClasses.profileAlignment} pr-4 text-center flex flex-row gap-2`}
        >
          <PlayerAvatar
            player={player}
            size={isMainPlayer ? "medium" : "small"}
          />
          <div className="flex flex-col items-start">
            <PlayerName
              player={player}
              size={isMainPlayer ? "medium" : "small"}
            />
            <PlayerPoints
              player={player}
              size={isMainPlayer ? "medium" : "small"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
