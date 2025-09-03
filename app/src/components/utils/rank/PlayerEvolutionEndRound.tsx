interface PlayerEvolutionEndRoundProps {
  playerScores: number[];
  className?: string;
}

export default function PlayerEvolutionEndRound({
  playerScores,
  className = "",
}: PlayerEvolutionEndRoundProps) {
  return (
    <div className={`player-evolution select-none ${className}`}>
      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
        <h3 className="text-white font-semibold text-center mb-4">
          Évolution des scores
        </h3>
        <div className="space-y-3">
          {playerScores.map((score, index) => (
            <div
              key={index}
              className="flex justify-between text-white text-sm"
            >
              <span>Manche {index + 1}</span>
              <span>{score} pts</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
