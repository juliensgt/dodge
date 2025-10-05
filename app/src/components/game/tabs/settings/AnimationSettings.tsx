import { useTranslation } from "@/hooks/useTranslation";
import { useAnimationStore } from "@/store/animations";

export default function AnimationSettings() {
  const { t } = useTranslation();
  const { showBanner } = useAnimationStore();

  return (
    <div>
      <h3 className="text-[var(--action-chat-primary-text-color)] font-medium mb-3">
        {t("Test des animations")}
      </h3>
      <div className="space-y-3">
        <div className="grid grid-cols-1 gap-2">
          <button
            onClick={() => showBanner("Début de partie")}
            className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-600 text-white text-sm font-medium rounded-lg cursor-pointer hover:scale-105 transition-all duration-200"
          >
            {t("Simuler début de partie")}
          </button>
          <button
            onClick={() => showBanner("Manche 1")}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium rounded-lg cursor-pointer hover:scale-105 transition-all duration-200"
          >
            {t("Simuler début de manche")}
          </button>
          <button
            onClick={() => showBanner("Bannière personnalisée")}
            className="px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-700 text-white text-sm font-medium rounded-lg cursor-pointer hover:scale-105 transition-all duration-200"
          >
            {t("Test bannière personnalisée")}
          </button>
        </div>
      </div>
    </div>
  );
}
