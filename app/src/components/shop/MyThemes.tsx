import React, { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { useTheme } from "@/contexts/ThemeContext";
import { ThemeType } from "@/enums/themes/Theme";
import ActionButton from "@/components/utils/buttons/ActionButton";
import { ColorType } from "@/enums/themes/list/PurpleTheme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faCircle,
  faLock,
  faLockOpen,
  faPalette,
  faSun,
  faTree,
  faWater,
  faWaveSquare,
} from "@fortawesome/free-solid-svg-icons";

type FilterType = "all" | "unlocked" | "locked";

export default function MyThemes() {
  const { t } = useTranslation();
  const { currentTheme, setTheme, availableThemes } = useTheme();
  const [filter, setFilter] = useState<FilterType>("all");
  const [hoveredTheme, setHoveredTheme] = useState<string | null>(null);

  // In a real app, this would come from user data
  const lockedThemes = [ThemeType.NEON]; // Example locked theme
  const allThemes = availableThemes;

  // Filter themes based on selected filter
  const filteredThemes =
    filter === "all"
      ? allThemes
      : filter === "unlocked"
        ? allThemes.filter((theme) => !lockedThemes.includes(theme.id))
        : allThemes.filter((theme) => lockedThemes.includes(theme.id));

  const isThemeLocked = (themeId: ThemeType) => lockedThemes.includes(themeId);

  const getThemeIcon = (themeId: ThemeType) => {
    switch (themeId) {
      case ThemeType.PURPLE:
        return <FontAwesomeIcon icon={faCircle} color="purple" />;
      case ThemeType.OCEAN:
        return <FontAwesomeIcon icon={faWater} color="blue" />;
      case ThemeType.FOREST:
        return <FontAwesomeIcon icon={faTree} color="green" />;
      case ThemeType.SUNSET:
        return <FontAwesomeIcon icon={faSun} color="yellow" />;
      case ThemeType.NEON:
        return <FontAwesomeIcon icon={faBolt} color="blue" />;
      case ThemeType.MONOCHROME:
        return <FontAwesomeIcon icon={faCircle} color="black" />;
      default:
        return <FontAwesomeIcon icon={faPalette} color="gray" />;
    }
  };

  const getThemeRarity = (themeId: ThemeType) => {
    switch (themeId) {
      case ThemeType.PURPLE:
      case ThemeType.OCEAN:
      case ThemeType.FOREST:
      case ThemeType.MONOCHROME:
        return "common";
      case ThemeType.SUNSET:
        return "rare";
      case ThemeType.NEON:
        return "epic";
      default:
        return "common";
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "border-gray-400 bg-gray-50";
      case "rare":
        return "border-blue-400 bg-blue-50";
      case "epic":
        return "border-purple-400 bg-purple-50";
      case "legendary":
        return "border-yellow-400 bg-yellow-50";
      default:
        return "border-gray-400 bg-gray-50";
    }
  };

  const getRarityBadge = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "Commun";
      case "rare":
        return "Rare";
      case "epic":
        return "Épique";
      case "legendary":
        return "Légendaire";
      default:
        return "Commun";
    }
  };

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "⚪";
      case "rare":
        return "🔵";
      case "epic":
        return "🟣";
      case "legendary":
        return "🟡";
      default:
        return "⚪";
    }
  };

  const filters = [
    {
      id: "all" as FilterType,
      label: t("Tous"),
    },
    {
      id: "unlocked" as FilterType,
      label: t("Débloqués"),
      icon: <FontAwesomeIcon icon={faLockOpen} />,
    },
    {
      id: "locked" as FilterType,
      label: t("Verrouillés"),
      icon: <FontAwesomeIcon icon={faLock} />,
    },
  ];

  const handlePurchase = (themeId: ThemeType) => {
    // In a real app, this would make an API call to purchase the theme
    console.log(`Purchasing theme: ${themeId}`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-bold text-white mb-4">
            {t("Mes Thèmes")}
          </h2>
          <p className="text-white/80 text-lg">
            {t("Personnalisez l'apparence de votre jeu")}
          </p>
        </div>
        <div>
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 text-center">
              <div className="text-2xl font-bold text-white">
                {allThemes.length}
              </div>
              <div className="text-white/70 text-sm">{t("Total")}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 text-center">
              <div className="text-2xl font-bold text-green-400">
                {allThemes.filter((t) => !lockedThemes.includes(t.id)).length}
              </div>
              <div className="text-white/70 text-sm">{t("Débloqués")}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 text-center">
              <div className="text-2xl font-bold text-red-400">
                {lockedThemes.length}
              </div>
              <div className="text-white/70 text-sm">{t("Verrouillés")}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 text-center">
              <div className="text-2xl font-bold text-blue-400">
                {Math.round(
                  (allThemes.filter((t) => !lockedThemes.includes(t.id))
                    .length /
                    allThemes.length) *
                    100
                )}
                %
              </div>
              <div className="text-white/70 text-sm">{t("Complétion")}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {filters.map((filterOption) => (
          <button
            key={filterOption.id}
            onClick={() => setFilter(filterOption.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              filter === filterOption.id
                ? "bg-white/20 text-white shadow-lg"
                : "bg-white/10 text-white/70 hover:text-white hover:bg-white/15"
            }`}
          >
            <span>{filterOption.icon}</span>
            <span>{filterOption.label}</span>
          </button>
        ))}
      </div>

      {/* Themes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredThemes.map((theme) => {
          const isLocked = isThemeLocked(theme.id);
          const rarity = getThemeRarity(theme.id);
          const isSelected = currentTheme === theme.id;

          return (
            <div
              key={theme.id}
              className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                isSelected
                  ? "border-blue-500 bg-blue-100/20 shadow-2xl scale-105"
                  : getRarityColor(rarity)
              } ${hoveredTheme === theme.id ? "scale-105 shadow-lg" : ""} ${
                isLocked ? "opacity-60" : "cursor-pointer"
              }`}
              onClick={() => !isLocked && setTheme(theme.id)}
              onMouseEnter={() => setHoveredTheme(theme.id)}
              onMouseLeave={() => setHoveredTheme(null)}
            >
              {/* Lock Badge */}
              {isLocked && (
                <div className="absolute top-3 right-3">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              )}

              {/* Rarity Badge */}
              <div className="absolute top-3 left-3">
                <span
                  className={`px-3 py-1 text-xs font-bold rounded-full ${
                    rarity === "common"
                      ? "bg-gray-200 text-gray-700"
                      : rarity === "rare"
                        ? "bg-blue-200 text-blue-700"
                        : rarity === "epic"
                          ? "bg-purple-200 text-purple-700"
                          : "bg-yellow-200 text-yellow-700"
                  }`}
                >
                  {getRarityIcon(rarity)} {getRarityBadge(rarity)}
                </span>
              </div>

              {/* Selection Indicator */}
              {isSelected && (
                <div className="absolute top-3 right-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              )}

              {/* Theme Preview */}
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div
                    className={`w-24 h-32 rounded-xl bg-gradient-to-r ${theme.preview} border-2 border-white/30 shadow-lg`}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl">{getThemeIcon(theme.id)}</span>
                  </div>
                </div>
              </div>

              {/* Theme Info */}
              <div className="text-center">
                <h4 className="font-bold text-gray-800 text-lg mb-2">
                  {theme.name}
                </h4>
                <p className="text-gray-600 text-sm mb-4">
                  {theme.description}
                </p>

                {/* Action Button */}
                {isSelected ? (
                  <div className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold text-sm">
                    ✓ {t("Actuellement actif")}
                  </div>
                ) : isLocked ? (
                  <div className="space-y-2">
                    <div className="text-red-500 font-semibold text-sm">
                      🔒 {t("Verrouillé")}
                    </div>
                    <ActionButton
                      onClick={() => handlePurchase(theme.id)}
                      label={`${t("Acheter")} - 500 coins`}
                      color={{ color: ColorType.PRIMARY }}
                    />
                  </div>
                ) : (
                  <ActionButton
                    onClick={() => setTheme(theme.id)}
                    label={t("Activer")}
                    color={{ color: ColorType.PRIMARY }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredThemes.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">
            <FontAwesomeIcon icon={faPalette} color="gray" />
          </div>
          <h3 className="text-white text-xl font-bold mb-2">
            {t("Aucun thème trouvé")}
          </h3>
          <p className="text-white/70">
            {t("Aucun thème ne correspond à ce filtre")}
          </p>
        </div>
      )}

      {/* Theme Collection Progress */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
        <h3 className="text-white font-bold text-xl mb-4 text-center">
          {t("Progression de la Collection")}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {["common", "rare", "epic", "legendary"].map((rarity) => {
            const themesOfRarity = allThemes.filter(
              (t) => getThemeRarity(t.id) === rarity
            );
            const unlockedOfRarity = themesOfRarity.filter(
              (t) => !lockedThemes.includes(t.id)
            );
            const percentage =
              themesOfRarity.length > 0
                ? (unlockedOfRarity.length / themesOfRarity.length) * 100
                : 0;

            return (
              <div key={rarity} className="text-center">
                <div className="text-white font-bold text-lg">
                  {unlockedOfRarity.length}/{themesOfRarity.length}
                </div>
                <div className="text-white/70 text-sm capitalize">
                  {t(rarity)}
                </div>
                <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      rarity === "common"
                        ? "bg-gray-400"
                        : rarity === "rare"
                          ? "bg-blue-400"
                          : rarity === "epic"
                            ? "bg-purple-400"
                            : "bg-yellow-400"
                    }`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-white/60 text-sm text-center">
          {t("Débloquez plus de thèmes en jouant ou en achetant des coins !")}
        </p>
      </div>
    </div>
  );
}
