import { useState } from "react";
import CardBack from "./CardBack";
import CardFront from "./CardFront";
import { Size } from "@/scripts/references/playerLayouts";

export enum CardState {
  CARD_BACK = "CARD_BACK",
  CARD_FRONT = "CARD_FRONT",
  CARD_REMOVED = "CARD_REMOVED",
}

interface CardProps {
  cardState: CardState;
  cardImage?: string;
  cardValue?: number;
  cliquable?: boolean;
  size?: Size;
  skinId?: string;
  onClick?: () => void;
  className?: string;
}

export default function Card({
  cardState,
  cardImage,
  cardValue,
  cliquable = false,
  size = "small",
  skinId = "default",
  onClick,
  className = "",
}: CardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    small: "w-16 h-20", // 64px x 80px
    medium: "w-20 h-28", // 80px x 112px
    large: "w-24 h-32", // 96px x 128px
    xsmall: "w-10 h-14", // 40px x 56px
  };

  const handleClick = () => {
    if (cliquable && onClick) {
      onClick();
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  if (cardState === CardState.CARD_REMOVED) {
    return (
      <div
        className={`${sizeClasses[size]} ${className} bg-white bg-opacity-25 rounded-lg shadow-none`}
      />
    );
  }

  return (
    <div
      className={`${sizeClasses[size]} ${className} relative cursor-pointer select-none transition-all duration-200 ${
        isHovered && cliquable ? "transform scale-105" : ""
      }`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {cardState === CardState.CARD_BACK && (
        <CardBack size={size} skinId={skinId} />
      )}
      {cardState === CardState.CARD_FRONT && (
        <CardFront cardImage={cardImage} cardValue={cardValue} />
      )}
    </div>
  );
}
