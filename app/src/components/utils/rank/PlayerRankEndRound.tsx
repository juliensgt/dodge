import { Player } from "@/store/game";

interface PlayerRankEndRoundProps {
  player: Player;
  points: number;
  rankNumber: number;
}

export default function PlayerRankEndRound({
  player,
  points,
  rankNumber,
}: PlayerRankEndRoundProps) {
  return (
    <div className="player-rank flex items-center justify-between w-full p-2 bg-white/10 rounded-lg select-none">
      <div className="rank-number text-white font-bold text-lg">
        #{rankNumber}
      </div>
      <div className="player-info flex items-center gap-2">
        <div className="player-avatar w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">
            {player.name?.charAt(0)?.toUpperCase() || "?"}
          </span>
        </div>
        <div className="player-name text-white font-medium">
          {player.name || "Joueur"}
        </div>
      </div>
      <div className="points text-white font-bold">{points} pts</div>
    </div>
  );
}
