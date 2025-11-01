import { ReactNode } from "react";
import { motion, Variants, Transition } from "framer-motion";
import { Position } from "./CardAnimationLayer";
import { CardAnimationType } from "@/enums/card-animation-type.enum";

export interface CardAnimationConfig {
  cardVariants: Variants;
  transition: Transition;
  effects: ReactNode;
}

interface AnimationConfigParams {
  startPos: Position;
  endPos: Position;
  duration?: number;
}

export function getCardAnimationConfig(
  animationType: string | CardAnimationType,
  params: AnimationConfigParams
): CardAnimationConfig {
  const { startPos, endPos, duration = 1.25 } = params;

  switch (animationType) {
    case CardAnimationType.DECK_TO_DEFAUSSE:
    case "deck_to_defausse":
      return getDeckToDefausseConfig(startPos, endPos, duration);
    case CardAnimationType.DEFAULT:
    case "default":
    default:
      return getDefaultConfig(startPos, endPos, duration);
  }
}

function getDefaultConfig(
  startPos: Position,
  endPos: Position,
  duration: number
): CardAnimationConfig {
  const transition: Transition = {
    duration,
    ease: "linear",
  };

  const cardVariants: Variants = {
    initial: {
      x: startPos.x,
      y: startPos.y,
      width: startPos.width,
      height: startPos.height,
    },
    animate: {
      x: endPos.x,
      y: endPos.y,
      width: endPos.width,
      height: endPos.height,
    },
  };

  const centerInitialX = startPos.x + startPos.width / 2;
  const centerInitialY = startPos.y + startPos.height / 2;
  const centerFinalX = endPos.x + endPos.width / 2;
  const centerFinalY = endPos.y + endPos.height / 2;
  const deltaX = centerFinalX - centerInitialX;
  const deltaY = centerFinalY - centerInitialY;
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  const unitX = distance > 0 ? deltaX / distance : 0;
  const unitY = distance > 0 ? deltaY / distance : 0;

  const effects = (
    <>
      {/* Trail/particules par défaut */}
      {Array.from({ length: 8 }).map((_, i) => {
        const delay = i * 0.06;
        const trailOffset = (i + 1) * 25;
        const trailX = centerInitialX - unitX * trailOffset;
        const trailY = centerInitialY - unitY * trailOffset;
        const particleSize = 12 + i * 3;

        return (
          <motion.div
            key={`trail-${i}`}
            className="fixed pointer-events-none z-[9998] rounded-full"
            initial={{
              x: trailX - particleSize / 2,
              y: trailY - particleSize / 2,
              opacity: 0,
              scale: 0,
            }}
            animate={{
              x: [
                trailX - particleSize / 2,
                centerInitialX - particleSize / 2 + unitX * 15,
                centerInitialX - particleSize / 2 + unitX * 30,
                centerFinalX - particleSize / 2,
              ],
              y: [
                trailY - particleSize / 2,
                centerInitialY - particleSize / 2 + unitY * 15,
                centerInitialY - particleSize / 2 + unitY * 30,
                centerFinalY - particleSize / 2,
              ],
              opacity: [0, 0.9 - i * 0.08, 0.7 - i * 0.05, 0.5 - i * 0.03, 0],
              scale: [0, 1.5 - i * 0.1, 1.2 - i * 0.08, 0.8 - i * 0.05, 0],
            }}
            transition={{
              duration,
              delay,
              times: [0, 0.2, 0.5, 0.8, 1],
              ease: "easeInOut",
            }}
            style={{
              width: `${particleSize}px`,
              height: `${particleSize}px`,
              background:
                "radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.6) 50%, rgba(255, 255, 255, 0) 100%)",
              willChange: "transform, opacity",
              filter: `blur(${3 + i}px)`,
              boxShadow: `0 0 ${8 + i * 2}px rgba(255, 255, 255, 0.8)`,
            }}
          />
        );
      })}

      {/* Halo par défaut */}
      <motion.div
        className="fixed pointer-events-none z-[9997] rounded-full"
        initial={{
          x: centerInitialX - 40,
          y: centerInitialY - 40,
          opacity: 0,
          scale: 0.5,
        }}
        animate={{
          x: centerFinalX - 40,
          y: centerFinalY - 40,
          opacity: [0, 0.4, 0.6, 0.2, 0],
          scale: [0.5, 1.5, 2, 1.8, 0.8],
        }}
        transition={{
          duration,
          times: [0, 0.2, 0.5, 0.8, 1],
          ease: "easeInOut",
        }}
        style={{
          width: "80px",
          height: "80px",
          background:
            "radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 70%)",
          willChange: "transform, opacity",
          filter: "blur(8px)",
        }}
      />
    </>
  );

  return {
    cardVariants,
    transition,
    effects,
  };
}

function getDeckToDefausseConfig(
  startPos: Position,
  endPos: Position,
  duration: number
): CardAnimationConfig {
  const centerInitialX = startPos.x + startPos.width / 2;
  const centerInitialY = startPos.y + startPos.height / 2;
  const centerFinalX = endPos.x + endPos.width / 2;
  const centerFinalY = endPos.y + endPos.height / 2;
  const deltaX = centerFinalX - centerInitialX;
  const deltaY = centerFinalY - centerInitialY;
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  const unitX = distance > 0 ? deltaX / distance : 0;
  const unitY = distance > 0 ? deltaY / distance : 0;

  const transition: Transition = {
    duration,
    ease: "linear", // easeInOut cubic
  };

  const cardVariants: Variants = {
    initial: {
      x: startPos.x,
      y: startPos.y,
      width: startPos.width,
      height: startPos.height,
      rotate: 0,
      scale: 1,
      opacity: 1,
    },
    animate: {
      x: endPos.x,
      y: endPos.y,
      width: startPos.width,
      height: startPos.height,
      rotate: 0,
      scale: [1, 1.5, 1],
      opacity: 1,
    },
  };

  const trailVariants: Variants = {
    initial: (i: number) => {
      const trailOffset = (i + 1) * 30;
      const trailX = centerInitialX - unitX * trailOffset;
      const trailY = centerInitialY - unitY * trailOffset;
      const particleSize = 15 + i * 4;

      return {
        x: trailX - particleSize / 2,
        y: trailY - particleSize / 2,
        opacity: 0,
        scale: 0,
        rotate: 0,
      };
    },
    animate: (i: number) => {
      const particleSize = 15 + i * 4;

      return {
        x: [
          centerInitialX - particleSize / 2 - unitX * (i + 1) * 30,
          centerInitialX - particleSize / 2 + unitX * 20,
          centerInitialX - particleSize / 2 + unitX * 40,
          centerFinalX - particleSize / 2,
        ],
        y: [
          centerInitialY - particleSize / 2 - unitY * (i + 1) * 30,
          centerInitialY - particleSize / 2 + unitY * 20,
          centerInitialY - particleSize / 2 + unitY * 40,
          centerFinalY - particleSize / 2,
        ],
        opacity: [0, 1 - i * 0.1, 0.8 - i * 0.06, 0.6 - i * 0.04, 0],
        scale: [0, 1.8 - i * 0.12, 1.5 - i * 0.1, 1 - i * 0.06, 0],
        rotate: [0, 90, 180, 270, 360],
      };
    },
  };

  const haloVariants: Variants = {
    initial: {
      x: centerInitialX - 50,
      y: centerInitialY - 50,
      opacity: 0,
      scale: 0.5,
    },
    animate: {
      x: centerFinalX - 50,
      y: centerFinalY - 50,
      opacity: [0, 0.6, 0.8, 0.4, 0],
      scale: [0.5, 2, 2.5, 2.2, 1],
    },
  };

  const effects = (
    <>
      {/* Trail avec rotation et plus de particules */}
      {Array.from({ length: 10 }).map((_, i) => {
        const delay = i * 0.05;
        const particleSize = 15 + i * 4;

        return (
          <motion.div
            key={`trail-${i}`}
            custom={i}
            className="fixed pointer-events-none z-[9998] rounded-full"
            variants={trailVariants}
            initial="initial"
            animate="animate"
            transition={{
              ...transition,
              delay,
              times: [0, 0.2, 0.5, 0.8, 1],
              ease: "easeInOut",
            }}
            style={{
              width: `${particleSize}px`,
              height: `${particleSize}px`,
              background:
                "radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.6) 50%, rgba(255, 255, 255, 0) 100%)",
              willChange: "transform, opacity",
              filter: `blur(${3 + i}px)`,
              boxShadow: `0 0 ${8 + i * 2}px rgba(255, 255, 255, 0.8)`,
            }}
          />
        );
      })}

      {/* Halo plus grand et plus intense */}
      <motion.div
        className="fixed pointer-events-none z-[9997] rounded-full"
        variants={haloVariants}
        initial="initial"
        animate="animate"
        transition={{
          ...transition,
          times: [0, 0.2, 0.5, 0.8, 1],
          ease: "easeInOut",
        }}
        style={{
          width: "100px",
          height: "100px",
          background:
            "radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 70%)",
          willChange: "transform, opacity",
          filter: "blur(8px)",
        }}
      />
    </>
  );

  return {
    cardVariants,
    transition,
    effects,
  };
}
