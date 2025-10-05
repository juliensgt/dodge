import { useTranslation } from "@/hooks/useTranslation";
import { useGameStore } from "@/store/game/game";

export default function Ranking() {
  const { t } = useTranslation();
  const { players } = useGameStore();

  const rankingPlayers = players.sort((a, b) => b.points - a.points);

  return (
    <div className="space-y-3">
      <div className="rounded-lg p-2">
        <h3 className="text-[var(--action-chat-primary-text-color)] font-medium mb-3">
          {t("Classement actuel")}
        </h3>
        <div className="space-y-2">
          {rankingPlayers.map((player, position) => (
            <div
              key={position}
              className="flex items-center justify-between p-3 bg-[var(--text-color)]/10 backdrop-blur-sm rounded-lg border border-[var(--action-chat-border-color)]/30 hover:bg-[var(--text-color)]/20 transition-all duration-200"
            >
              <div className="flex items-center gap-2">
                <span className="text-[var(--text-color)] font-bold text-sm">
                  #{position + 1}
                </span>
                <span className="text-[var(--text-color)] text-sm">
                  {player.name}
                </span>
              </div>
              <span className="text-[var(--text-color)] text-sm font-medium">
                {player.points} pts
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
