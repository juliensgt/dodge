import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { useIsMobile } from "@/hooks/useIsMobile";
import ActionButton from "@/components/utils/buttons/ActionButton";
import { ColorType } from "@/enums/themes/ITheme";
import { CreateGameHeaderProps } from "./types";

const BackButton = ({ onClick }: { onClick: () => void }) => (
  <ActionButton
    onClick={onClick}
    label={useIsMobile() ? "←" : "← Retour"}
    color={{ color: ColorType.TRANSPARENT }}
  />
);

export default function CreateGameHeader({
  handleBack,
}: CreateGameHeaderProps) {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  return (
    <div>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent"></div>

        {isMobile ? (
          <div className="relative z-10 flex items-center justify-between p-3 pb-3">
            <div className="flex items-center gap-2">
              <BackButton onClick={handleBack} />
              <h1
                className={`${
                  isMobile ? "text-2xl" : "text-6xl mb-4"
                } font-bold text-white drop-shadow-2xl`}
              >
                {t("CRÉER UNE PARTIE")}
              </h1>
            </div>
          </div>
        ) : (
          <div className="relative z-10 grid grid-cols-3 items-start p-4 pb-0">
            <div className="flex items-start gap-4">
              <BackButton onClick={handleBack} />
            </div>
            <div className="text-center pb-4">
              <h1
                className={`${
                  isMobile ? "text-2xl" : "text-6xl mb-4"
                } font-bold text-white drop-shadow-2xl`}
              >
                {t("CRÉER UNE PARTIE")}
              </h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
