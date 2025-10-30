import React, { useEffect } from "react";
import { Player } from "@/store/game/types";
import Card, { CardState } from "./card/Card";
import {
  getPlayerClasses,
  getMainPlayerSizes,
  getOtherPlayersSizes,
  getCardLayouts,
} from "@/scripts/references/playerLayouts";
import { useIsMobile } from "@/hooks/useIsMobile";
import PlayerAvatar from "@/components/utils/players/PlayerAvatar";
import PlayerName from "@/components/utils/players/PlayerName";
import PlayerPoints from "@/components/utils/players/PlayerPoints";
import { gameService } from "@/services/game/game.service";
import { ActionType } from "@/enums/action-type.enum";
import { useGameStore } from "@/store/game/game";
import { useCardStore } from "@/store/cards/cards.store";
import { useCollection } from "@/contexts/CollectionContext";

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

// Helper pour obtenir la taille de l'avatar en pixels
const getAvatarSizeInPx = (size: string): number => {
  switch (size) {
    case "xsmall":
      return 32;
    case "small":
      return 40;
    case "medium":
      return 56;
    case "large":
      return 72;
    default:
      return 56;
  }
};

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
  const { getCurrentSkin } = useCollection();
  const { choices, currentPlayerId } = useGameStore();
  const isCurrentPlayer = player.id === currentPlayerId;
  // Récupération des tailles selon la position du joueur
  const isMainPlayer = position === 0;
  const sizes = isMainPlayer
    ? getMainPlayerSizes(maxPlayers, isMobile)
    : getOtherPlayersSizes(maxPlayers, isMobile);

  const avatarSizePx = getAvatarSizeInPx(sizes.avatar);

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
    cliquable: isCurrentPlayer,
  }));

  const handleCardClick = (index: number) => {
    if (isCurrentPlayer) {
      let choice: ActionType | undefined;
      if (choices.includes(ActionType.SWITCH_FROM_DECK_TO_PLAYER)) {
        choice = ActionType.SWITCH_FROM_DECK_TO_PLAYER;
      } else if (choices.includes(ActionType.SWITCH_FROM_DEFAUSSE_TO_PLAYER)) {
        choice = ActionType.SWITCH_FROM_DEFAUSSE_TO_PLAYER;
      }
      if (choice) {
        gameService.sendCardSwitchChoice(choice, index);
      }
    }
  };

  // Update the player cards when the choices change
  useEffect(() => {}, [choices]);

  return (
    <div
      className={`${playerClasses.container} select-none ${className} relative`}
      style={style}
    >
      <div className={`flex flex-col ${isMobile ? "gap-1" : "gap-2"}`}>
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
          {playerCards.map((card, index) => (
            <div key={card.id} data-card>
              <Card
                cardState={card.cardState}
                cardValue={card.cardValue}
                cliquable={useCardStore
                  .getState()
                  .isCardCliquable(player.id, index)}
                size={sizes.card}
                skinId={getCurrentSkin().id}
                onClick={() => handleCardClick(index)}
              />
            </div>
          ))}
        </div>
        {/* Profil du joueur DESKTOP*/}
        {!isMobile && (
          <div
            className={`${playerClasses.profileAlignment} text-center flex flex-row gap-2 items-center`}
          >
            <div
              className="flex-shrink-0 relative flex items-center justify-center"
              style={{
                width: `${avatarSizePx + 16}px`, // +16px pour le débordement
                height: `${avatarSizePx + 16}px`,
              }}
            >
              <PlayerAvatar
                player={player}
                size={sizes.avatar}
                isPlayerWhoPlays={isPlayerWhoPlays}
                playerTimer={isPlayerWhoPlays ? playerTimer : 0}
                maxTime={maxTime}
              />
            </div>
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
