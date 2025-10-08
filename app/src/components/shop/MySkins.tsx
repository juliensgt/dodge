import React, { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { getUnlockedSkins, CardSkin } from "@/enums/skins/SkinManager";
import { useCardSkin } from "@/hooks/useCardSkin";
import Card from "@/components/game/cards/card/Card";
import { CardState } from "@/components/game/cards/card/Card";
import ActionButton from "@/components/utils/buttons/ActionButton";
import { ColorType } from "@/enums/themes/list/PurpleTheme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faPalette } from "@fortawesome/free-solid-svg-icons";

type FilterType = "all" | "common" | "rare" | "epic" | "legendary";

export default function MySkins() {
  const { t } = useTranslation();
  const { selectedSkinId, selectSkin } = useCardSkin();
  const [filter, setFilter] = useState<FilterType>("all");
  const [hoveredSkin, setHoveredSkin] = useState<string | null>(null);

  const allSkins = getUnlockedSkins();

  // Filter skins based on selected filter
  const filteredSkins =
    filter === "all"
      ? allSkins
      : allSkins.filter((skin) => skin.rarity === filter);

  const getRarityColor = (rarity: CardSkin["rarity"]) => {
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

  const getRarityBadge = (rarity: CardSkin["rarity"]) => {
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

  const getRarityIcon = (rarity: CardSkin["rarity"]) => {
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
      id: "common" as FilterType,
      label: t("Commun"),
      icon: <FontAwesomeIcon icon={faCircle} color="gray" />,
    },
    {
      id: "rare" as FilterType,
      label: t("Rare"),
      icon: <FontAwesomeIcon icon={faCircle} color="blue" />,
    },
    {
      id: "epic" as FilterType,
      label: t("Épique"),
      icon: <FontAwesomeIcon icon={faCircle} color="purple" />,
    },
    {
      id: "legendary" as FilterType,
      label: t("Légendaire"),
      icon: <FontAwesomeIcon icon={faCircle} color="yellow" />,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-bold text-white mb-4">
            {t("Mes Skins")}
          </h2>
          <p className="text-white/80 text-lg">
            {t("Gérez et personnalisez vos skins de cartes")}
          </p>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 text-center">
            <div className="text-2xl font-bold text-white">
              {allSkins.length}
            </div>
            <div className="text-white/70 text-sm">{t("Total")}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 text-center">
            <div className="text-2xl font-bold text-blue-400">
              {allSkins.filter((s) => s.rarity === "rare").length}
            </div>
            <div className="text-white/70 text-sm">{t("Rares")}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 text-center">
            <div className="text-2xl font-bold text-purple-400">
              {allSkins.filter((s) => s.rarity === "epic").length}
            </div>
            <div className="text-white/70 text-sm">{t("Épiques")}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 text-center">
            <div className="text-2xl font-bold text-yellow-400">
              {allSkins.filter((s) => s.rarity === "legendary").length}
            </div>
            <div className="text-white/70 text-sm">{t("Légendaires")}</div>
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

      {/* Skins Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredSkins.map((skin) => (
          <div
            key={skin.id}
            className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
              selectedSkinId === skin.id
                ? "border-blue-500 bg-blue-100/20 shadow-2xl scale-105"
                : getRarityColor(skin.rarity)
            } ${hoveredSkin === skin.id ? "scale-105 shadow-lg" : ""}`}
            onClick={() => selectSkin(skin.id)}
            onMouseEnter={() => setHoveredSkin(skin.id)}
            onMouseLeave={() => setHoveredSkin(null)}
          >
            {/* Rarity Badge */}
            <div className="absolute top-3 right-3">
              <span
                className={`px-3 py-1 text-xs font-bold rounded-full ${
                  skin.rarity === "common"
                    ? "bg-gray-200 text-gray-700"
                    : skin.rarity === "rare"
                      ? "bg-blue-200 text-blue-700"
                      : skin.rarity === "epic"
                        ? "bg-purple-200 text-purple-700"
                        : "bg-yellow-200 text-yellow-700"
                }`}
              >
                {getRarityIcon(skin.rarity)} {getRarityBadge(skin.rarity)}
              </span>
            </div>

            {/* Selection Indicator */}
            {selectedSkinId === skin.id && (
              <div className="absolute top-3 left-3">
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

            {/* Skin Preview */}
            <div className="flex justify-center mb-4">
              <div className="w-20 h-24">
                <Card
                  cardState={CardState.CARD_BACK}
                  size="small"
                  skinId={skin.id}
                />
              </div>
            </div>

            {/* Skin Info */}
            <div className="text-center">
              <h4 className="font-bold text-gray-800 text-lg mb-2">
                {skin.name}
              </h4>
              <p className="text-gray-600 text-sm mb-4">{skin.description}</p>

              {/* Action Button */}
              {selectedSkinId === skin.id ? (
                <div className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold text-sm">
                  {t("Actuellement sélectionné")}
                </div>
              ) : (
                <ActionButton
                  onClick={() => selectSkin(skin.id)}
                  label={t("Sélectionner")}
                  color={{ color: ColorType.PRIMARY }}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredSkins.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">
            <FontAwesomeIcon icon={faPalette} />
          </div>
          <h3 className="text-white text-xl font-bold mb-2">
            {t("Aucun skin trouvé")}
          </h3>
          <p className="text-white/70">
            {t("Aucun skin ne correspond à ce filtre")}
          </p>
        </div>
      )}

      {/* Collection Progress */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
        <h3 className="text-white font-bold text-xl mb-4 text-center">
          {t("Progression de la Collection")}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {["common", "rare", "epic", "legendary"].map((rarity) => {
            const count = allSkins.filter((s) => s.rarity === rarity).length;
            const total =
              rarity === "common"
                ? 3
                : rarity === "rare"
                  ? 2
                  : rarity === "epic"
                    ? 1
                    : 1;
            const percentage = Math.min((count / total) * 100, 100);

            return (
              <div key={rarity} className="text-center">
                <div className="text-white font-bold text-lg">
                  {count}/{total}
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
          {t("Continuez à jouer pour débloquer plus de skins !")}
        </p>
      </div>
    </div>
  );
}
