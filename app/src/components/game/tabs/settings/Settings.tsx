import CardSkinSelector from "@/components/utils/selectors/CardSkinSelector";
import LanguageSelector from "@/components/utils/selectors/LanguageSelector";
import ThemeSelector from "@/components/utils/selectors/ThemeSelector";
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
              {t("Langue")}
            </span>
            <LanguageSelector />
          </div>
          <div className="flex justify-between items-center p-2 rounded-lg hover:bg-[var(--action-chat-background-color)]/30 transition-all duration-200">
            <span className="text-[var(--action-chat-primary-text-color)] text-sm">
              {t("Thème")}
            </span>
            <ThemeSelector />
          </div>
          <div className="flex justify-between items-center p-2 rounded-lg hover:bg-[var(--action-chat-background-color)]/30 transition-all duration-200">
            <CardSkinSelector />
          </div>
        </div>
      </div>
    </div>
  );
}
