export default function PlayerSkeletonCard() {
  return (
    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/30 select-none flex flex-row items-center gap-2">
      <div className="w-12 h-12 bg-white/30 rounded-full"></div>
      <div className="text-white font-semibold text-sm flex flex-col items-start gap-2">
        <div className="bg-white/20 h-4 rounded w-20"></div>
        <div className="bg-white/15 h-3 rounded w-12"></div>
      </div>
    </div>
  );
}
