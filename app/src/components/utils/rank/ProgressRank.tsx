interface ProgressRankProps {
  className?: string;
}

export default function ProgressRank({ className = "" }: ProgressRankProps) {
  return (
    <div className={`progress-rank select-none ${className}`}>
      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
        <h3 className="text-white font-semibold text-center mb-4">
          Progression des scores
        </h3>
        <div className="space-y-3">
          {/* TODO: Implémenter l'affichage des barres de progression */}
          <div className="progress-bar">
            <div className="flex justify-between text-white text-sm mb-1">
              <span>Joueur 1</span>
              <span>45 pts</span>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: "45%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
