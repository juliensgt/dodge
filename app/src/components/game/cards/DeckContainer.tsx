import { useIsMobile } from "@/hooks/useIsMobile";
import CardSkeleton from "./card/CardSkeleton";
import { getDeckSizes } from "@/scripts/references/playerLayouts";

interface DeckContainerProps {
  className?: string;
  maxPlayers: number;
}

export default function DeckContainer({
  className,
  maxPlayers,
}: DeckContainerProps) {
  const isMobile = useIsMobile();
  const sizes = getDeckSizes(maxPlayers, isMobile);

  return (
    <div className={`${className}`}>
      <CardSkeleton size={sizes.card} />
      <CardSkeleton size={sizes.card} />
    </div>
  );
}
