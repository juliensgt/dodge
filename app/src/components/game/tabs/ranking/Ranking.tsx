import { useTranslation } from "@/hooks/useTranslation";

export default function Ranking() {
  const { t } = useTranslation();

  return (
    <div className="space-y-3">
      <div className="bg-[var(--action-chat-background-color)]/70 backdrop-blur-sm rounded-lg p-4 border border-[var(--action-chat-border-color)]/50 shadow-sm">
        <h3 className="text-[var(--action-chat-primary-text-color)] font-medium mb-3">
          {t("Classement actuel")}
        </h3>
        <div className="space-y-2">
          {[1, 2, 3, 4].map((position) => (
            <div
              key={position}
              className="flex items-center justify-between p-3 bg-[var(--action-chat-background-color)]/40 backdrop-blur-sm rounded-lg border border-[var(--action-chat-border-color)]/30 hover:bg-[var(--action-chat-background-color)]/60 hover:border-[var(--action-chat-border-color)]/50 transition-all duration-200"
            >
              <div className="flex items-center gap-2">
                <span className="text-[var(--action-chat-primary-text-color)] font-bold text-sm">
                  #{position}
                </span>
                <span className="text-[var(--action-chat-primary-text-color)] text-sm">
                  Joueur{position}
                </span>
              </div>
              <span className="text-[var(--action-chat-secondary-text-color)] text-sm font-medium">
                {25 - position * 3} pts
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
