import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAnimationStore } from "@/store/animations";
import Card, { CardState } from "@/components/game/cards/card/Card";
import { Size } from "@/scripts/references/playerLayouts";
import { getCardAnimationConfig } from "./cardAnimationConfigs";

export interface Position {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface CardAnimationLayerProps {
  cardSize?: Size;
}

export default function CardAnimationLayer({
  cardSize = "small",
}: CardAnimationLayerProps) {
  const cardAnimation = useAnimationStore((state) => state.cardAnimation);
  const clearCardAnimation = useAnimationStore(
    (state) => state.clearCardAnimation
  );
  const onAnimationComplete = useAnimationStore(
    (state) => state.onAnimationComplete
  );
  const [startPos, setStartPos] = useState<Position | null>(null);
  const [endPos, setEndPos] = useState<Position | null>(null);

  useEffect(() => {
    if (!cardAnimation.isActive) {
      setStartPos(null);
      setEndPos(null);
      return;
    }

    // Fonction pour obtenir la position exacte de la carte
    const getCardPosition = (id: string): Position | null => {
      const container = document.querySelector(
        `[data-card-animation-id="${id}"]`
      );
      if (!container) {
        console.warn(`Element with data-card-animation-id="${id}" not found`);
        return null;
      }

      // Trouver le composant Card (premier div enfant, pas les spans)
      let cardElement: HTMLElement | null = null;
      for (let i = 0; i < container.children.length; i++) {
        const child = container.children[i] as HTMLElement;
        if (child.tagName === "DIV") {
          cardElement = child;
          break;
        }
      }

      if (cardElement) {
        // Utiliser le containerRect pour avoir des positions exactes et cohérentes
        // Le cardRect peut avoir des décimales dues aux bordures/padding, ce qui cause des décalages
        const containerRect = container.getBoundingClientRect();

        return {
          x: containerRect.left,
          y: containerRect.top,
          width: containerRect.width,
          height: containerRect.height,
        };
      }

      return null;
    };

    // Calculer les positions après le rendu
    const frameId = requestAnimationFrame(() => {
      const fromPos = getCardPosition(cardAnimation.fromId);
      const toPos = getCardPosition(cardAnimation.toId);

      if (fromPos && toPos) {
        setStartPos(fromPos);
        setEndPos(toPos);
      } else {
        console.error("CardAnimationLayer: Could not find card elements");
        clearCardAnimation();
      }
    });

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [
    cardAnimation.isActive,
    cardAnimation.fromId,
    cardAnimation.toId,
    clearCardAnimation,
  ]);

  // Ne pas rendre si on n'a pas toutes les données nécessaires
  if (
    !cardAnimation.isActive ||
    !cardAnimation.cardData ||
    !startPos ||
    !endPos
  ) {
    return null;
  }

  // Obtenir la configuration d'animation
  const animationConfig = getCardAnimationConfig(cardAnimation.animationType, {
    startPos,
    endPos,
    duration: 1.25,
  });

  return (
    <>
      {/* Carte animée de A à B */}
      <motion.div
        key="card-animation"
        className="fixed pointer-events-none z-[9999]"
        variants={animationConfig.cardVariants}
        initial="initial"
        animate="animate"
        transition={animationConfig.transition}
        onAnimationComplete={() => {
          onAnimationComplete();
          clearCardAnimation();
          setStartPos(null);
          setEndPos(null);
        }}
        style={{
          willChange: "transform, width, height",
        }}
      >
        <Card
          cardState={CardState.CARD_FRONT}
          cardValue={cardAnimation.cardData.cardValue}
          size={cardSize}
          cliquable={false}
        />
      </motion.div>

      {/* Effets définis dans le composant externe */}
      {animationConfig.effects}
    </>
  );
}
