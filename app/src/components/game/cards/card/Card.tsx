import { useRef, memo } from "react";
import CardBack from "./CardBack";
import CardFront from "./CardFront";
import { Size } from "@/scripts/references/playerLayouts";
import { useCollection } from "@/contexts/CollectionContext";

export enum CardState {
  CARD_BACK = "CARD_BACK",
  CARD_FRONT = "CARD_FRONT",
  CARD_REMOVED = "CARD_REMOVED",
}

interface CardProps {
  cardState: CardState;
  cardValue?: number;
  cliquable?: boolean;
  size?: Size;
  skinId?: string;
  onClick?: () => void;
  className?: string;
}

function Card({
  cardState,
  cardValue,
  cliquable = false,
  size = "small",
  skinId = "default",
  onClick,
  className = "",
}: CardProps) {
  const isTouchEvent = useRef(false);
  const { getCurrentTheme } = useCollection();
  const theme = getCurrentTheme();
  const glowHex = theme.getGlowHex();

  const sizeClasses = {
    large: "w-24 h-32", // 96px x 128px
    medium: "w-20 h-28", // 80px x 112px
    small: "w-16 h-20", // 64px x 80px
    xsmall: "w-10 h-14", // 40px x 56px
    xxsmall: "w-8 h-11", // 32px x 44px
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!cliquable || !onClick) return;

    // Détecter si c'est un événement tactile
    if (e.pointerType === "touch") {
      isTouchEvent.current = true;
      onClick();
      // Le flag reste actif pour que handleClick puisse le détecter
    }
  };

  const handleClick = () => {
    if (!cliquable || !onClick) return;

    // Si un événement touch a déjà été traité, ignorer ce click
    if (isTouchEvent.current) {
      isTouchEvent.current = false;
      return;
    }

    // Sur desktop, déclencher l'action normalement
    onClick();
    isTouchEvent.current = false;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!cliquable || !onClick) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  if (cardState === CardState.CARD_REMOVED) {
    return (
      <div
        className={`${sizeClasses[size]} ${className} bg-white bg-opacity-25 rounded-lg shadow-none`}
      />
    );
  }

  const glowClasses = cliquable ? "rounded-lg border-2" : "";
  const baseGlowShadow = `0 0 12px ${glowHex}80`;

  return (
    <div
      className={`${sizeClasses[size]} ${className} relative cursor-pointer select-none ${glowClasses}`}
      style={{
        borderColor: cliquable ? glowHex : undefined,
        boxShadow: cliquable ? baseGlowShadow : undefined,
      }}
      role={cliquable ? "button" : undefined}
      tabIndex={cliquable ? 0 : undefined}
      onPointerUp={handlePointerUp}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {cardState === CardState.CARD_BACK && (
        <CardBack size={size} skinId={skinId} />
      )}
      {cardState === CardState.CARD_FRONT && (
        <CardFront cardValue={cardValue} />
      )}
    </div>
  );
}

// Mémoriser Card pour éviter les re-rendus inutiles
// Note: isHovered est géré en interne, donc memo fonctionne pour les props externes
export default memo(Card);
