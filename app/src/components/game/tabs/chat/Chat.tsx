import { useTranslation } from "@/hooks/useTranslation";

export default function Chat() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-2 mb-4 pr-2 scrollbar-thin scrollbar-thumb-[var(--action-chat-border-color)] scrollbar-track-transparent hover:scrollbar-thumb-[var(--action-choice-active-color)]">
        {/* TODO: Implémenter l'affichage des messages de chat */}
        <div className="bg-[var(--action-chat-background-color)]/70 backdrop-blur-sm rounded-lg p-3 border border-[var(--action-chat-border-color)]/50 shadow-sm hover:bg-[var(--action-chat-background-color)]/80 transition-all duration-200">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[var(--action-chat-primary-text-color)] text-xs font-medium">
              Système
            </span>
            <span className="text-[var(--action-chat-secondary-text-color)] text-xs opacity-60">
              14:32
            </span>
          </div>
          <span className="text-[var(--action-chat-primary-text-color)] text-sm">
            Bienvenue dans la partie !
          </span>
        </div>
        <div className="bg-[var(--action-chat-background-color)]/70 backdrop-blur-sm rounded-lg p-3 border border-[var(--action-chat-border-color)]/50 shadow-sm hover:bg-[var(--action-chat-background-color)]/80 transition-all duration-200">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[var(--action-chat-primary-text-color)] text-xs font-medium">
              Joueur1
            </span>
            <span className="text-[var(--action-chat-secondary-text-color)] text-xs opacity-60">
              14:33
            </span>
          </div>
          <span className="text-[var(--action-chat-primary-text-color)] text-sm">
            Bonne chance à tous ! 🍀
          </span>
        </div>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder={t("Tapez votre message...")}
          className="flex-1 px-3 py-2 bg-[var(--action-chat-background-color)]/60 backdrop-blur-sm border border-[var(--action-chat-border-color)]/50 rounded-lg text-[var(--action-chat-primary-text-color)] placeholder-[var(--action-chat-secondary-text-color)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--action-choice-active-color)] focus:bg-[var(--action-chat-background-color)]/80 transition-all duration-200"
        />
        <button className="px-4 py-2 bg-[var(--secondary-color)]/80 backdrop-blur-sm text-[var(--action-choice-text-color)] rounded-lg hover:bg-[var(--action-choice-active-color)] hover:shadow-lg transition-all duration-200 font-medium">
          {t("Envoyer")}
        </button>
      </div>
    </div>
  );
}
