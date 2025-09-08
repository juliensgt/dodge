import { Player } from "@/store/game";
import Card, { CardState } from "./card/Card";
import {
  getPlayerClasses,
  getMainPlayerSizes,
  getOtherPlayersSizes,
  getCardLayouts,
} from "@/scripts/references/playerLayouts";
import { useCardSkin } from "@/hooks/useCardSkin";
import { useIsMobile } from "@/hooks/useIsMobile";
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
  const isMobile = useIsMobile();
  const playerClasses = getPlayerClasses(maxPlayers, position, isMobile);
  const { selectedSkinId } = useCardSkin();

  // Récupération des tailles selon la position du joueur
  const isMainPlayer = position === 0;
  const sizes = isMainPlayer
    ? getMainPlayerSizes(maxPlayers, isMobile)
    : getOtherPlayersSizes(maxPlayers, isMobile);

  // Récupération du layout des cartes
  const cardLayouts = getCardLayouts(maxPlayers, isMobile);
  const cardLayout = isMainPlayer
    ? cardLayouts.mainPlayer
    : cardLayouts.otherPlayers;

  // Simuler des cartes pour le joueur (à remplacer par les vraies données)
  const playerCards = Array.from({ length: 4 }, (_, index) => ({
    id: `${player.id}-${index}`,
    cardState: CardState.CARD_BACK,
    cardValue: index + 1,
    cliquable: position === 0, // Seul le joueur principal peut cliquer
  }));

  return (
    <div
      className={`${playerClasses.container} select-none ${className}`}
      style={style}
    >
      <div className={`flex flex-col ${isMobile ? "gap-1" : "gap-4"}`}>
        {/* Profil du joueur MOBILE*/}
        {isMobile && (
          <div className={`${playerClasses.profileAlignment} flex flex-col`}>
            <PlayerName player={player} size={sizes.name} />
            <PlayerPoints player={player} size={sizes.points} />
          </div>
        )}
        {/* Cartes du joueur*/}
        <div className={cardLayout}>
          {playerCards.map((card) => (
            <Card
              key={card.id}
              cardState={card.cardState}
              cardValue={card.cardValue}
              cliquable={card.cliquable}
              size={sizes.card}
              skinId={selectedSkinId}
            />
          ))}
        </div>
        {/* Profil du joueur DESKTOP*/}
        {!isMobile && (
          <div
            className={`${playerClasses.profileAlignment} text-center flex flex-row gap-2`}
          >
            <PlayerAvatar player={player} size={sizes.avatar} />
            <div className="flex flex-col items-start">
              <PlayerName player={player} size={sizes.name} />
              <PlayerPoints player={player} size={sizes.points} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
