import React, { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { getUnlockedSkins } from "@/enums/skins/SkinManager";
import { useCardSkin } from "@/hooks/useCardSkin";
import ShopCard from "./cards/ShopCard";
import { CardSkinRarity } from "@/enums/skins/SkinRarity";
import { getRarityBadge } from "@/types/items/items.type";
import ShopTabTitle from "./tabs/shop-tab-title";

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

  return (
    <div className="space-y-4">
      <ShopTabTitle
        title={t("Mes Skins")}
        subtitle={t("Gérez et personnalisez vos skins de cartes")}
        rightSide={
          <div className="inline-flex items-start">
            <div className="grid grid-cols-4 gap-2">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-2 border border-white/20 text-center">
                <div className="text-xl font-bold text-white">
                  {allSkins.length}
                </div>
                <div className="text-white/70 text-xs">{t("Total")}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-2 border border-white/20 text-center">
                <div className="text-xl font-bold text-blue-400">
                  {
                    allSkins.filter((s) => s.rarity === CardSkinRarity.RARE)
                      .length
                  }
                </div>
                <div className="text-white/70 text-xs">{t("Rares")}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-2 border border-white/20 text-center">
                <div className="text-xl font-bold text-purple-400">
                  {
                    allSkins.filter((s) => s.rarity === CardSkinRarity.EPIC)
                      .length
                  }
                </div>
                <div className="text-white/70 text-xs">{t("Épiques")}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-2 border border-white/20 text-center">
                <div className="text-xl font-bold text-yellow-400">
                  {
                    allSkins.filter(
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

      {/* Skins Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredSkins.map((skin) => (
          <ShopCard
            key={skin.id}
            selectedItem={selectedSkinId}
            item={skin}
            hoveredItem={hoveredSkin}
            setHoveredItem={setHoveredSkin}
            buttonLabel={t("Sélectionner le skin")}
            buyable={false}
            showButton={true}
            onClick={(item) => {
              selectSkin(item.id);
            }}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredSkins.length === 0 && (
        <div className="text-center py-8">
          <h3 className="text-white text-xl font-bold mb-2">
            {t("Aucun skin trouvé")}
          </h3>
          <p className="text-white/70">
            {t("Aucun skin ne correspond à ce filtre")}
          </p>
        </div>
      )}
    </div>
  );
}
