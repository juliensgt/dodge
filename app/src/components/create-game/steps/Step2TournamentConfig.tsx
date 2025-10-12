import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "@/hooks/useTranslation";
import { useIsMobile } from "@/hooks/useIsMobile";
import {
  faTrophy,
  faTable,
  faMedal,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import { StepProps } from "../types";

export default function Step2TournamentConfig({
  formData,
  setFormData,
}: StepProps) {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  const handleInputChange = (
    field: keyof typeof formData,
    value: string | number | boolean
  ) => {
    setFormData({ ...formData, [field]: value });
  };

  const inputClasses = isMobile
    ? "w-full px-3 py-2 bg-white/10 backdrop-blur-sm rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 text-sm"
    : "w-full px-4 py-3 bg-white/10 backdrop-blur-sm rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200";
  const labelClasses = isMobile
    ? "block text-xs font-medium text-white/90 mb-1"
    : "block text-sm font-medium text-white/90 mb-2";

  return (
    <div className={`space-y-${isMobile ? "4" : "6"}`}>
      <div className="text-center">
        <h2
          className={`${isMobile ? "text-xl" : "text-3xl"} font-bold text-white ${isMobile ? "mb-1" : "mb-2"}`}
        >
          {t("Configuration du tournoi")}
        </h2>
        <p className={`text-white/70 ${isMobile ? "text-sm" : "text-lg"}`}>
          {t("Configurez les paramètres spécifiques du tournoi")}
        </p>
      </div>

      <div
        className={`grid grid-cols-1 ${isMobile ? "gap-4" : "md:grid-cols-2 gap-6"}`}
      >
        <div
          className={`bg-white/10 backdrop-blur-sm rounded-2xl ${isMobile ? "p-4" : "p-6"} border border-white/20`}
        >
          <h3
            className={`${isMobile ? "text-lg" : "text-xl"} font-semibold text-white ${isMobile ? "mb-3" : "mb-4"} flex items-center gap-2`}
          >
            <FontAwesomeIcon
              icon={faTrophy}
              className={`text-yellow-400 ${isMobile ? "text-lg" : ""}`}
            />
            {t("Informations du tournoi")}
          </h3>
          <div className="space-y-4">
            <div>
              <label className={labelClasses}>{t("Nom du tournoi")}</label>
              <input
                type="text"
                value={formData.tournamentName || ""}
                onChange={(e) =>
                  handleInputChange("tournamentName", e.target.value)
                }
                className={inputClasses}
                placeholder={t("Ex: Championnat d'été 2024")}
              />
            </div>
            <div>
              <label className={labelClasses}>{t("Type de tournoi")}</label>
              <select
                value={formData.tournamentType || "single"}
                onChange={(e) =>
                  handleInputChange(
                    "tournamentType",
                    e.target.value as "single" | "double" | "round_robin"
                  )
                }
                className={inputClasses}
              >
                <option value="single">{t("Élimination simple")}</option>
                <option value="double">{t("Élimination double")}</option>
                <option value="round_robin">{t("Round Robin")}</option>
              </select>
            </div>
          </div>
        </div>

        <div
          className={`bg-white/10 backdrop-blur-sm rounded-2xl ${isMobile ? "p-4" : "p-6"} border border-white/20`}
        >
          <h3
            className={`${isMobile ? "text-lg" : "text-xl"} font-semibold text-white ${isMobile ? "mb-3" : "mb-4"} flex items-center gap-2`}
          >
            <FontAwesomeIcon
              icon={faTable}
              className={`text-blue-400 ${isMobile ? "text-lg" : ""}`}
            />
            {t("Configuration des tables")}
          </h3>
          <div className="space-y-4">
            <div>
              <label className={labelClasses}>{t("Nombre de tables")}</label>
              <input
                type="number"
                min="1"
                max="20"
                value={formData.numberOfTables || 1}
                onChange={(e) =>
                  handleInputChange("numberOfTables", parseInt(e.target.value))
                }
                className={inputClasses}
              />
            </div>
            <div>
              <label className={labelClasses}>{t("Joueurs par table")}</label>
              <input
                type="number"
                min="2"
                max="8"
                value={formData.maxPlayersPerTable || 6}
                onChange={(e) =>
                  handleInputChange(
                    "maxPlayersPerTable",
                    parseInt(e.target.value)
                  )
                }
                className={inputClasses}
              />
            </div>
          </div>
        </div>

        <div
          className={`bg-white/10 backdrop-blur-sm rounded-2xl ${isMobile ? "p-4" : "p-6"} border border-white/20`}
        >
          <h3
            className={`${isMobile ? "text-lg" : "text-xl"} font-semibold text-white ${isMobile ? "mb-3" : "mb-4"} flex items-center gap-2`}
          >
            <FontAwesomeIcon
              icon={faMedal}
              className={`text-orange-400 ${isMobile ? "text-lg" : ""}`}
            />
            {t("Récompenses")}
          </h3>
          <div className="space-y-4">
            <div>
              <label className={labelClasses}>{t("Prize Pool (coins)")}</label>
              <input
                type="number"
                min="0"
                value={formData.prizePool || 0}
                onChange={(e) =>
                  handleInputChange("prizePool", parseInt(e.target.value))
                }
                className={inputClasses}
                placeholder="0"
              />
            </div>
          </div>
        </div>

        <div
          className={`bg-white/10 backdrop-blur-sm rounded-2xl ${isMobile ? "p-4" : "p-6"} border border-white/20`}
        >
          <h3
            className={`${isMobile ? "text-lg" : "text-xl"} font-semibold text-white ${isMobile ? "mb-3" : "mb-4"} flex items-center gap-2`}
          >
            <FontAwesomeIcon
              icon={faCalendar}
              className={`text-green-400 ${isMobile ? "text-lg" : ""}`}
            />
            {t("Planning")}
          </h3>
          <div className="space-y-4">
            <div>
              <label className={labelClasses}>
                {t("Date limite d'inscription")}
              </label>
              <input
                type="datetime-local"
                value={formData.registrationDeadline || ""}
                onChange={(e) =>
                  handleInputChange("registrationDeadline", e.target.value)
                }
                className={inputClasses}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
