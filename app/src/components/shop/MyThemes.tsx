import React, { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { useTheme } from "@/contexts/ThemeContext";
import { ThemeType } from "@/enums/themes/Theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette } from "@fortawesome/free-solid-svg-icons";
import ShopTabTitle from "./tabs/shop-tab-title";
import { CardSkinRarity } from "@/enums/skins/SkinRarity";
import { getRarityBadge } from "@/types/items/items.type";
import ShopCard from "./cards/ShopCard";

export default function MyThemes() {
  const { t } = useTranslation();
  const { currentTheme, setTheme, availableThemes } = useTheme();
  const [filter, setFilter] = useState<string>("all");
  const [hoveredTheme, setHoveredTheme] = useState<string | null>(null);

  // In a real app, this would come from user data
  const allThemes = availableThemes;

  // Filter skins based on selected filter
  const filteredThemes =
    filter === "all"
      ? allThemes
      : allThemes.filter((theme) => theme.rarity === filter);

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

  const handlePurchase = (themeId: ThemeType) => {
    // In a real app, this would make an API call to purchase the theme
    console.log(`Purchasing theme: ${themeId}`);
  };

  return (
    <div className="space-y-4">
      <ShopTabTitle
        title={t("Mes Thèmes")}
        subtitle={t("Personnalisez l'apparence de votre plateau de jeu")}
        rightSide={
          <div className="inline-flex items-start">
            <div className="grid grid-cols-4 gap-2">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-2 border border-white/20 text-center">
                <div className="text-xl font-bold text-white">
                  {allThemes.length}
                </div>
                <div className="text-white/70 text-xs">{t("Total")}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-2 border border-white/20 text-center">
                <div className="text-xl font-bold text-blue-400">
                  {
                    allThemes.filter((t) => t.rarity === CardSkinRarity.RARE)
                      .length
                  }
                </div>
                <div className="text-white/70 text-xs">{t("Rares")}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-2 border border-white/20 text-center">
                <div className="text-xl font-bold text-purple-400">
                  {
                    allThemes.filter((t) => t.rarity === CardSkinRarity.EPIC)
                      .length
                  }
                </div>
                <div className="text-white/70 text-xs">{t("Épiques")}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-2 border border-white/20 text-center">
                <div className="text-xl font-bold text-yellow-400">
                  {
                    allThemes.filter(
                      (s) => s.rarity === CardSkinRarity.LEGENDARY
                    ).length
                  }
                </div>
                <div className="text-white/70 text-xs">{t("Légendaires")}</div>
              </div>
            </div>
          </div>
        }
      />

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          key={"all"}
          onClick={() => setFilter("all")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            filter === "all"
              ? "bg-white/20 text-white shadow-lg"
              : "bg-white/10 text-white/70 hover:text-white hover:bg-white/15"
          }`}
        >
          <span>{t("Tous")}</span>
        </button>
        {Object.values(CardSkinRarity).map((filterOption) => (
          <button
            key={filterOption}
            onClick={() => setFilter(filterOption)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              filter === filterOption
                ? "bg-white/20 text-white shadow-lg"
                : "bg-white/10 text-white/70 hover:text-white hover:bg-white/15"
            }`}
          >
            <span>{getRarityBadge(filterOption)}</span>
          </button>
        ))}
      </div>

      {/* Themes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredThemes.map((theme) => {
          return (
            <ShopCard
              key={theme.id}
              selectedItem={currentTheme}
              item={theme}
              hoveredItem={hoveredTheme}
              setHoveredItem={setHoveredTheme}
              buttonLabel={t("Sélectionner le thème")}
              buyable={false}
              showButton={true}
              onClick={(item) => {
                setTheme(item.id as ThemeType);
              }}
            />
          );
        })}
      </div>

      {/* Empty State */}
      {filteredThemes.length === 0 && (
        <div className="text-center py-8">
          <h3 className="text-white text-xl font-bold mb-2">
            {t("Aucun thème trouvé")}
          </h3>
          <p className="text-white/70">
            {t("Aucun thème ne correspond à ce filtre")}
          </p>
        </div>
      )}
    </div>
  );
}
