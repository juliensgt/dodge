import CardSkinSelector from "@/components/utils/selectors/CardSkinSelector";
import LanguageSelector from "@/components/utils/selectors/LanguageSelector";
import ThemeSelector from "@/components/utils/selectors/ThemeSelector";
import { useTranslation } from "@/hooks/useTranslation";
import AnimationSettings from "./AnimationSettings";
import ActionButton from "@/components/utils/buttons/ActionButton";
import { ColorType } from "@/enums/themes/ITheme";
import Modal from "@/components/utils/modals/Modal";
import { useState } from "react";

export default function Settings() {
  const { t } = useTranslation();
  const [isSkinSelectorOpen, setIsSkinSelectorOpen] = useState(false);
  return (
    <div className="space-y-2">
      <div className="p-2">
        <div className="space-y-3">
          <div className="flex justify-between items-center p-2">
            <span className="text-[var(--action-chat-primary-text-color)] text-sm">
              {t("Langue")}
            </span>
            <LanguageSelector />
          </div>
          <div className="flex justify-between items-center p-2">
            <span className="text-[var(--action-chat-primary-text-color)] text-sm">
              {t("Thème")}
            </span>
            <ThemeSelector />
          </div>
          <div className="flex justify-between items-center p-2 rounded-lg hover:bg-[var(--action-chat-background-color)]/30 transition-all duration-200">
            <span className="text-[var(--action-chat-primary-text-color)] text-sm">
              {t("Skins")}
            </span>
            <ActionButton
              onClick={() => setIsSkinSelectorOpen(true)}
              label={t("Skins")}
              color={{ color: ColorType.SECONDARY }}
            />
          </div>
          {/* Section de test des animations */}
          <div className="p-2">
            <AnimationSettings />
          </div>
          {/* Modal pour le sélecteur de skins */}
          <Modal
            isOpen={isSkinSelectorOpen}
            onClose={() => setIsSkinSelectorOpen(false)}
            title={t("Sélectionner un skin de carte")}
          >
            <CardSkinSelector />
          </Modal>
        </div>
      </div>
    </div>
  );
}
