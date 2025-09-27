import CardSkinSelector from "@/components/utils/selectors/CardSkinSelector";
import LanguageSelector from "@/components/utils/selectors/LanguageSelector";
import ThemeSelector from "@/components/utils/selectors/ThemeSelector";
import { useTranslation } from "@/hooks/useTranslation";
import { useAnimationStore } from "@/store/animations";

export default function Settings() {
  const { t } = useTranslation();
  const { showBanner } = useAnimationStore();
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
          {/* Section de test des animations */}
          <div className="bg-[var(--action-chat-background-color)]/70 backdrop-blur-sm rounded-lg p-4 border border-[var(--action-chat-border-color)]/50 shadow-sm">
            <h3 className="text-[var(--action-chat-primary-text-color)] font-medium mb-3">
              {t("Test des animations")}
            </h3>
            <div className="space-y-3">
              <div className="grid grid-cols-1 gap-2">
                <button
                  onClick={() => showBanner("Début de partie")}
                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-600 text-white text-sm font-medium rounded-lg hover:from-green-600 hover:to-blue-700 transition-all duration-200 shadow-sm"
                >
                  {t("Simuler début de partie")}
                </button>
                <button
                  onClick={() => showBanner("Manche 1")}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-sm"
                >
                  {t("Simuler début de manche")}
                </button>
                <button
                  onClick={() => showBanner("Bannière personnalisée")}
                  className="px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-700 text-white text-sm font-medium rounded-lg hover:from-gray-600 hover:to-gray-800 transition-all duration-200 shadow-sm"
                >
                  {t("Test bannière personnalisée")}
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center p-2 rounded-lg hover:bg-[var(--action-chat-background-color)]/30 transition-all duration-200">
            <CardSkinSelector />
          </div>
        </div>
      </div>
    </div>
  );
}
