export default function PlayerSkeletonCard() {
  return (
    <div className="player-skeleton-card bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 animate-pulse select-none">
      <div className="player-avatar w-12 h-12 bg-white/20 rounded-full mx-auto mb-2 flex items-center justify-center">
        <div className="w-8 h-8 bg-white/30 rounded-full"></div>
      </div>
      <div className="player-name bg-white/20 h-4 rounded mx-auto mb-1 w-16"></div>
      <div className="player-status bg-white/15 h-3 rounded mx-auto w-12"></div>
    </div>
  );
}
