import { useTranslation } from "@/hooks/useTranslation";

export default function Settings() {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <div className="bg-[var(--action-chat-background-color)]/70 backdrop-blur-sm rounded-lg p-4 border border-[var(--action-chat-border-color)]/50 shadow-sm">
        <h3 className="text-[var(--action-chat-primary-text-color)] font-medium mb-3">
          {t("Paramètres de la partie")}
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-2 rounded-lg hover:bg-[var(--action-chat-background-color)]/30 transition-all duration-200">
            <span className="text-[var(--action-chat-primary-text-color)] text-sm">
              {t("Son")}
            </span>
            <button className="w-12 h-6 bg-[var(--secondary-color)]/80 backdrop-blur-sm rounded-full relative hover:bg-[var(--action-choice-active-color)] transition-all duration-200">
              <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
            </button>
          </div>
          <div className="flex justify-between items-center p-2 rounded-lg hover:bg-[var(--action-chat-background-color)]/30 transition-all duration-200">
            <span className="text-[var(--action-chat-primary-text-color)] text-sm">
              {t("Musique")}
            </span>
            <button className="w-12 h-6 bg-gray-400/60 backdrop-blur-sm rounded-full relative hover:bg-gray-400/80 transition-all duration-200">
              <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5 shadow-sm"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
