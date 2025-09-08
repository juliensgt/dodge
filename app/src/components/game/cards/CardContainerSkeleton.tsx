import { useIsMobile } from "@/hooks/useIsMobile";
import CardSkeleton from "./card/CardSkeleton";
import {
  getMainPlayerSizes,
  getOtherPlayersSizes,
  getPlayerClasses,
} from "@/scripts/references/playerLayouts";

interface CardContainerSkeletonProps {
  position: number;
  maxPlayers: number;
  style?: React.CSSProperties;
  className?: string;
}

export default function CardContainerSkeleton({
  position,
  maxPlayers,
  style,
  className = "",
}: CardContainerSkeletonProps) {
  const isMainPlayer = position === 0;
  const isMobile = useIsMobile();
  const playerClasses = getPlayerClasses(maxPlayers, position, isMobile);

  const sizes = isMainPlayer
    ? getMainPlayerSizes(maxPlayers, isMobile)
    : getOtherPlayersSizes(maxPlayers, isMobile);

  return (
    <div
      className={`${playerClasses.container} select-none ${className}`}
      style={style}
    >
      <div className="flex flex-col gap-4">
        {/* Skeleton pour les cartes */}
        <div
          className={
            isMainPlayer ? "flex gap-2 w-fit" : "grid grid-cols-2 gap-2 w-fit"
          }
        >
          <CardSkeleton size={sizes.card} />
          <CardSkeleton size={sizes.card} />
          <CardSkeleton size={sizes.card} />
          <CardSkeleton size={sizes.card} />
        </div>

        {/* Skeleton pour le profil du joueur */}
        <div
          className={`${playerClasses.profileAlignment} pr-4 text-center flex flex-row gap-2`}
        >
          {/* Skeleton pour l'avatar */}
          <div
            className={`bg-gray-300 rounded-full animate-pulse ${
              isMainPlayer ? "w-12 h-12" : "w-8 h-8"
            }`}
          ></div>

          {/* Skeleton pour le nom et les points */}
          <div className="flex flex-col items-start gap-1">
            {/* Skeleton pour le nom */}
            <div
              className={`bg-gray-300 rounded animate-pulse ${
                isMainPlayer ? "w-20 h-4" : "w-16 h-3"
              }`}
            ></div>
            {/* Skeleton pour les points */}
            <div
              className={`bg-gray-300 rounded animate-pulse ${
                isMainPlayer ? "w-12 h-3" : "w-10 h-3"
              }`}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
