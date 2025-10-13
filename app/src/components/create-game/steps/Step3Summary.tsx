import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "@/hooks/useTranslation";
import { useIsMobile } from "@/hooks/useIsMobile";
import ActionButton from "@/components/utils/buttons/ActionButton";
import { ColorType } from "@/enums/themes/list/PurpleTheme";
import { faGamepad, faCog, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { SummaryStepProps, GameMode, DeckType } from "../types";
import { gameModePresets, deckPresets } from "../constants";
import { getDeckTypeFromModeDeJeu } from "../utils/deckMapping";

export default function Step3Summary({ formData, onEdit }: SummaryStepProps) {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  const getModeName = (mode: GameMode) => {
    const preset = gameModePresets.find((p) => p.id === mode);
    return preset?.name || mode;
  };

  const getModeColor = (mode: GameMode) => {
    const preset = gameModePresets.find((p) => p.id === mode);
    return preset?.color || "blue";
  };

  // Helper function to get the current deck type from modeDeJeu
  const getCurrentDeckType = (): DeckType => {
    return getDeckTypeFromModeDeJeu(formData.modeDeJeu);
  };

  return (
    <div className={`space-y-${isMobile ? "4" : "6"}`}>
      <div className="text-center">
        <h2
          className={`${isMobile ? "text-xl" : "text-3xl"} font-bold text-white ${isMobile ? "mb-1" : "mb-2"}`}
        >
          {t("Résumé de votre partie")}
        </h2>
        <p className={`text-white/70 ${isMobile ? "text-sm" : "text-lg"}`}>
          {t("Vérifiez les informations avant de créer la partie")}
        </p>
      </div>

      <div
        className={`grid grid-cols-1 ${isMobile ? "gap-4" : "md:grid-cols-2 gap-6"}`}
      >
        {/* Game Mode Summary */}
        <div
          className={`bg-white/10 backdrop-blur-sm rounded-2xl ${isMobile ? "p-4" : "p-6"} border border-white/20`}
        >
          <div
            className={`flex items-center justify-between ${isMobile ? "mb-3" : "mb-4"}`}
          >
            <h3
              className={`${isMobile ? "text-lg" : "text-xl"} font-semibold text-white flex items-center gap-2`}
            >
              <FontAwesomeIcon
                icon={faGamepad}
                className={`text-blue-400 ${isMobile ? "text-lg" : ""}`}
              />
              {t("Mode de jeu")}
            </h3>
            <ActionButton
              onClick={() => onEdit(1)}
              label={t("Modifier")}
              color={{ color: ColorType.TRANSPARENT }}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full bg-${getModeColor(formData.gameMode)}-500`}
              ></div>
              <span className="text-white font-medium">
                {getModeName(formData.gameMode)}
              </span>
            </div>
          </div>
        </div>

        {/* Game Settings Summary */}
        <div
          className={`bg-white/10 backdrop-blur-sm rounded-2xl ${isMobile ? "p-4" : "p-6"} border border-white/20`}
        >
          <div
            className={`flex items-center justify-between ${isMobile ? "mb-3" : "mb-4"}`}
          >
            <h3
              className={`${isMobile ? "text-lg" : "text-xl"} font-semibold text-white flex items-center gap-2`}
            >
              <FontAwesomeIcon
                icon={faCog}
                className={`text-green-400 ${isMobile ? "text-lg" : ""}`}
              />
              {t("Configuration")}
            </h3>
            <ActionButton
              onClick={() =>
                onEdit(formData.gameMode === GameMode.TOURNAMENT ? 2 : 2)
              }
              label={t("Modifier")}
              color={{ color: ColorType.TRANSPARENT }}
            />
          </div>
          <div className={`space-y-2 ${isMobile ? "text-xs" : "text-sm"}`}>
            <div className="flex justify-between">
              <span className="text-white/70">{t("Joueurs")}:</span>
              <span className="text-white">{formData.maxPlayers}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">{t("Deck")}:</span>
              <span className="text-white">
                {deckPresets.find((d) => d.id === getCurrentDeckType())?.name ||
                  getCurrentDeckType()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">{t("Temps de jeu")}:</span>
              <span className="text-white">{formData.timeToPlay}s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">{t("Partie privée")}:</span>
              <span className="text-white">
                {formData.privateGame ? t("Oui") : t("Non")}
              </span>
            </div>
          </div>
        </div>

        {/* Tournament Specific Summary */}
        {formData.gameMode === GameMode.TOURNAMENT && (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 md:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                <FontAwesomeIcon icon={faTrophy} className="text-yellow-400" />
                {t("Configuration du tournoi")}
              </h3>
              <ActionButton
                onClick={() => onEdit(2)}
                label={t("Modifier")}
                color={{ color: ColorType.TRANSPARENT }}
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-white/70">{t("Nom")}:</span>
                <div className="text-white font-medium">
                  {formData.tournamentName || t("Non défini")}
                </div>
              </div>
              <div>
                <span className="text-white/70">{t("Tables")}:</span>
                <div className="text-white font-medium">
                  {formData.numberOfTables}
                </div>
              </div>
              <div>
                <span className="text-white/70">{t("Joueurs/table")}:</span>
                <div className="text-white font-medium">
                  {formData.maxPlayersPerTable}
                </div>
              </div>
              <div>
                <span className="text-white/70">{t("Prize Pool")}:</span>
                <div className="text-white font-medium">
                  {formData.prizePool} coins
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
