import CardSkeleton from "./card/CardSkeleton";

export default function DeckContainer({ className }: { className?: string }) {
  return (
    <div className={`${className}`}>
      <CardSkeleton size="big" />
      <CardSkeleton size="big" />
    </div>
  );
}
