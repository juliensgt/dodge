export default function DeckContainer() {
  return (
    <div className="deck-container flex flex-col items-center gap-4 select-none">
      <div className="deck bg-white/20 backdrop-blur-sm rounded-lg p-6 min-w-[100px] min-h-[140px] flex items-center justify-center">
        <div className="text-white font-semibold text-center">DECK</div>
      </div>
      <div className="discard bg-white/20 backdrop-blur-sm rounded-lg p-6 min-w-[100px] min-h-[140px] flex items-center justify-center">
        <div className="text-white font-semibold text-center">DÉFAUSSE</div>
      </div>
    </div>
  );
}
