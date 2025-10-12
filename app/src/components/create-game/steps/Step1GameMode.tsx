import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { useIsMobile } from "@/hooks/useIsMobile";
import { StepProps, GameMode } from "../types";
import { gameModePresets } from "../constants";
import Image from "next/image";

export default function Step1GameMode({ formData, setFormData }: StepProps) {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  const handleModeSelect = (mode: GameMode) => {
    const preset = gameModePresets.find((p) => p.id === mode);

    // Don't allow selection of disabled modes
    if (preset?.disabled) {
      return;
    }

    if (preset && preset.options) {
      setFormData({
        ...formData,
        gameMode: mode,
        ...preset.options,
      });
    } else {
      setFormData({ ...formData, gameMode: mode });
    }

    // Auto-advance to next step after a short delay
    setTimeout(() => {
      // This will be handled by the parent component
      const event = new CustomEvent("gameModeSelected", { detail: { mode } });
      window.dispatchEvent(event);
    }, 300);
  };

  return (
    <div className={`space-y-${isMobile ? "4" : "6"}`}>
      <div className="text-center">
        <h2
          className={`${isMobile ? "text-xl" : "text-3xl"} font-bold text-white ${isMobile ? "mb-1" : "mb-2"}`}
        >
          {t("Choisissez un mode de jeu")}
        </h2>
        <p className={`text-white/70 ${isMobile ? "text-sm" : "text-lg"}`}>
          {t("Sélectionnez le style de partie qui vous convient")}
        </p>
      </div>

      <div
        className={`grid grid-cols-2 ${isMobile ? "gap-4" : "md:grid-cols-2 lg:grid-cols-4 gap-8"} py-2 items-stretch`}
      >
        {gameModePresets.map((preset, index) => (
          <div key={preset.id} className="relative h-full">
            <button
              onClick={() => handleModeSelect(preset.id)}
              disabled={preset.disabled}
              className={`group relative ${isMobile ? "p-4" : "p-6"} rounded-2xl border-2 transition-all duration-300 transform h-full ${
                preset.disabled
                  ? `opacity-${Math.max(20, 50 - index * 10)} cursor-not-allowed border-white/20 bg-white/5`
                  : formData.gameMode === preset.id
                    ? `border-${preset.color}-400 bg-${preset.color}-500/20 shadow-lg hover:shadow-2xl`
                    : "border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30 hover:shadow-2xl"
              }`}
            >
              <div
                className={`flex flex-col items-center text-center ${isMobile ? "space-y-3" : "space-y-4"}`}
              >
                <Image
                  src={preset.icon}
                  alt={preset.name}
                  width={64}
                  height={64}
                />
                <div>
                  <h3
                    className={`font-bold text-white ${isMobile ? "text-base" : "text-lg"} ${isMobile ? "mb-1" : "mb-2"}`}
                  >
                    {preset.name}
                  </h3>
                  <p
                    className={`text-white/70 ${isMobile ? "text-xs" : "text-sm"} leading-relaxed`}
                  >
                    {preset.description}
                  </p>
                </div>
              </div>
            </button>
            {preset.disabled && (
              <div className="absolute -top-1 -right-1 z-50">
                <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                  Bientôt disponible
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
