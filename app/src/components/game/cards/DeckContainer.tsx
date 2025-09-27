import { forwardRef } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import CardSkeleton from "./card/CardSkeleton";
import { getDeckSizes } from "@/scripts/references/playerLayouts";

interface DeckContainerProps {
  className?: string;
  maxPlayers: number;
}

const DeckContainer = forwardRef<HTMLDivElement, DeckContainerProps>(
  ({ className, maxPlayers }, ref) => {
    const isMobile = useIsMobile();
    const sizes = getDeckSizes(maxPlayers, isMobile);

    return (
      <div ref={ref} className={`${className}`}>
        <CardSkeleton size={sizes.card} />
        <CardSkeleton size={sizes.card} />
      </div>
    );
  }
);

DeckContainer.displayName = "DeckContainer";

export default DeckContainer;
