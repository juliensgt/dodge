import React, { useEffect } from "react";
import { Player } from "@/store/game/types";
import Card, { CardState } from "./card/Card";
import {
  getPlayerClasses,
  getMainPlayerSizes,
  getOtherPlayersSizes,
  getCardLayouts,
  getProfileLayout,
  getProfilePosition,
} from "@/scripts/references/playerLayouts";
import { useIsMobile } from "@/hooks/useIsMobile";
import PlayerAvatar from "@/components/utils/players/PlayerAvatar";
import PlayerName from "@/components/utils/players/PlayerName";
import PlayerPoints from "@/components/utils/players/PlayerPoints";
import { gameService } from "@/services/game/game.service";
import { ActionType } from "@/enums/action-type.enum";
import { useGameStore } from "@/store/game/game";
import { useCardStore } from "@/store/cards/cards.store";
import { motion } from "framer-motion";

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
  const { choices, currentPlayerId } = useGameStore();
  const isCurrentPlayer = player.id === currentPlayerId;
  // Récupération des tailles selon la position du joueur
  const isMainPlayer = position === 0;
  const sizes = isMainPlayer
    ? getMainPlayerSizes(maxPlayers, isMobile)
    : getOtherPlayersSizes(maxPlayers, isMobile);

  // Configuration du profil
  const profileLayout = getProfileLayout(maxPlayers, position, isMobile);
  const profilePosition = getProfilePosition(maxPlayers, position, isMobile);

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

  // Composant de profil réutilisable
  const renderProfile = () => {
    if (!isMobile) {
      // Desktop : toujours avec avatar
      return (
        <div
          className={`${playerClasses.profileAlignment} text-center flex flex-row gap-2 items-center`}
        >
          <div
            className="flex-shrink-0 relative flex items-center justify-center"
            style={{
              width: `${avatarSizePx + 16}px`,
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
          </div>
        </div>
      );
    }

    // Mobile : selon profileLayout
    if (profileLayout === "inline") {
      return (
        <div className="flex flex-row justify-between items-center w-full">
          <PlayerName player={player} size={sizes.name} />
          <PlayerPoints player={player} size={sizes.points} />
        </div>
      );
    }

    // Default layout
    return (
      <div className={`${playerClasses.profileAlignment} flex flex-col`}>
        <PlayerName player={player} size={sizes.name} />
        <PlayerPoints player={player} size={sizes.points} />
      </div>
    );
  };

  // Barre de progression timer (mobile uniquement, toujours présente pour garder l'espace)
  const renderTimerBar = () => {
    if (!isMobile || !isMainPlayer) return null;

    return (
      <div className="w-full h-1 relative bg-white/20 rounded-full">
        {isPlayerWhoPlays && playerTimer > 0 && maxTime > 0 && (
          <>
            {(() => {
              const timerPercentage = Math.min(
                Math.max((playerTimer / maxTime) * 100, 0),
                100
              );
              let timerColor = "#22c55e";
              if (timerPercentage <= 25) {
                timerColor = "#ef4444";
              } else if (timerPercentage <= 50) {
                timerColor = "#eab308";
              }
              return (
                <motion.div
                  className="h-full rounded-full absolute top-0 left-0"
                  style={{ backgroundColor: timerColor }}
                  initial={{ width: "100%" }}
                  animate={{ width: `${timerPercentage}%` }}
                  transition={{ duration: 1, ease: "linear" }}
                />
              );
            })()}
          </>
        )}
      </div>
    );
  };

  // Cartes
  const renderCards = () => {
    const skinId = player.collection?.skin || "default";
    return (
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
              skinId={skinId}
              onClick={() => handleCardClick(index)}
            />
          </div>
        ))}
      </div>
    );
  };

  // Construction de l'ordre d'affichage selon profilePosition
  const elements = [];
  if (profilePosition === "before") {
    elements.push(renderProfile());
    if (isMobile && isMainPlayer) {
      elements.push(renderTimerBar());
    }
    elements.push(renderCards());
  } else {
    elements.push(renderCards());
    if (isMobile && isMainPlayer) {
      elements.push(renderTimerBar());
    }
    elements.push(renderProfile());
  }

  // Pour l'autre joueur en mobile avec layout inline, ajouter la barre de progression après le profil (toujours présente)
  if (isMobile && !isMainPlayer && profileLayout === "inline") {
    const profileIndex = profilePosition === "before" ? 0 : elements.length - 1;
    const timerBar = (
      <div className="w-full h-1 relative bg-white/20 rounded-full">
        {isPlayerWhoPlays && playerTimer > 0 && maxTime > 0 && (
          <>
            {(() => {
              const timerPercentage = Math.min(
                Math.max((playerTimer / maxTime) * 100, 0),
                100
              );
              let timerColor = "#22c55e";
              if (timerPercentage <= 25) {
                timerColor = "#ef4444";
              } else if (timerPercentage <= 50) {
                timerColor = "#eab308";
              }
              return (
                <motion.div
                  className="h-full rounded-full absolute top-0 left-0"
                  style={{ backgroundColor: timerColor }}
                  initial={{ width: "100%" }}
                  animate={{ width: `${timerPercentage}%` }}
                  transition={{ duration: 1, ease: "linear" }}
                />
              );
            })()}
          </>
        )}
      </div>
    );
    elements.splice(profileIndex + 1, 0, timerBar);
  }

  return (
    <div
      className={`${playerClasses.container} select-none ${className} relative`}
      style={style}
    >
      <div className={`flex flex-col ${isMobile ? "gap-1" : "gap-2"}`}>
        {elements}
      </div>
    </div>
  );
}
