import React from "react";
import { Player } from "@/store/game/types";
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
  isPlayerWhoPlays?: boolean;
  playerTimer?: number;
  maxTime?: number;
}

export default function CardContainer({
  player,
  position,
  maxPlayers,
  style,
  className = "",
  isPlayerWhoPlays = false,
  playerTimer = 0,
  maxTime = 30,
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
      className={`${playerClasses.container} select-none ${className} relative`}
      style={style}
    >
      <div className={`flex flex-col ${isMobile ? "gap-1" : "gap-4"}`}>
        {/* Profil du joueur MOBILE*/}
        {isMobile && (
          <div className={`${playerClasses.profileAlignment} flex flex-col`}>
            <PlayerName player={player} size={sizes.name} />
            <PlayerPoints player={player} size={sizes.points} />
            {isPlayerWhoPlays && playerTimer > 0 && (
              <div className="text-xs text-gray-600 text-center">
                {playerTimer}s
              </div>
            )}
          </div>
        )}
        {/* Cartes du joueur*/}
        <div className={cardLayout} data-card-container>
          {playerCards.map((card) => (
            <div key={card.id} data-card>
              <Card
                cardState={card.cardState}
                cardValue={card.cardValue}
                cliquable={card.cliquable}
                size={sizes.card}
                skinId={selectedSkinId}
              />
            </div>
          ))}
        </div>
        {/* Profil du joueur DESKTOP*/}
        {!isMobile && (
          <div
            className={`${playerClasses.profileAlignment} text-center flex flex-row gap-4`}
          >
            <PlayerAvatar
              player={player}
              size={sizes.avatar}
              isPlayerWhoPlays={isPlayerWhoPlays}
              playerTimer={isPlayerWhoPlays ? playerTimer : 0}
              maxTime={maxTime}
            />
            <div className="flex flex-col items-start">
              <PlayerName player={player} size={sizes.name} />
              <PlayerPoints player={player} size={sizes.points} />
              {isPlayerWhoPlays && playerTimer > 0 && (
                <div className="text-xs text-white/80">{playerTimer}s</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
