import React, { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { getUnlockedSkins } from "@/enums/skins/SkinManager";
import ShopCard from "./cards/ShopCard";
import { CardSkinRarity } from "@/enums/skins/SkinRarity";
import { getRarityBadge } from "@/types/items/items.type";
import ShopTabTitle from "./tabs/shop-tab-title";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useCollection } from "@/contexts/CollectionContext";

type FilterType = "all" | "common" | "rare" | "epic" | "legendary";

export default function MySkins() {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const { getCurrentSkin, setSkin } = useCollection();
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
      {isMobile ? (
        <div className="text-center mb-4">
          <h2 className="text-2xl font-lucky text-white drop-shadow-[0_0_10px_rgba(250,204,21,0.3)]">
            {t("Mes Skins")}
          </h2>
        </div>
      ) : (
        <div className="text-center mb-6">
          <h2 className="text-4xl font-lucky text-white drop-shadow-[0_0_15px_rgba(250,204,21,0.4)] mb-2">
            {t("Mes Skins")}
          </h2>
          <p className="text-white/70 text-base">
            {t("Gérez et personnalisez vos skins de cartes")}
          </p>
        </div>
      )}
      {!isMobile && (
        <ShopTabTitle
          title=""
          subtitle=""
          rightSide={
            <div className="inline-flex items-start justify-center w-full">
              <div className="grid grid-cols-4 gap-3">
                <div className="bg-gradient-to-br from-gray-600/20 to-gray-800/20 backdrop-blur-xl rounded-lg p-3 border border-white/10 text-center shadow-lg">
                  <div className="text-2xl font-bold text-white drop-shadow-lg">
                    {allSkins.length}
                  </div>
                  <div className="text-white/60 text-xs mt-1">{t("Total")}</div>
                </div>
                <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 backdrop-blur-xl rounded-lg p-3 border border-blue-400/20 text-center shadow-lg shadow-blue-500/20">
                  <div className="text-2xl font-bold text-blue-300 drop-shadow-lg">
                    {
                      allSkins.filter((s) => s.rarity === CardSkinRarity.RARE)
                        .length
                    }
                  </div>
                  <div className="text-blue-300/70 text-xs mt-1">
                    {t("Rares")}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 backdrop-blur-xl rounded-lg p-3 border border-purple-400/20 text-center shadow-lg shadow-purple-500/30">
                  <div className="text-2xl font-bold text-purple-300 drop-shadow-lg">
                    {
                      allSkins.filter((s) => s.rarity === CardSkinRarity.EPIC)
                        .length
                    }
                  </div>
                  <div className="text-purple-300/70 text-xs mt-1">
                    {t("Épiques")}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 backdrop-blur-xl rounded-lg p-3 border border-yellow-400/30 text-center shadow-lg shadow-yellow-500/40">
                  <div className="text-2xl font-bold text-yellow-300 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]">
                    {
                      allSkins.filter(
                        (s) => s.rarity === CardSkinRarity.LEGENDARY
                      ).length
                    }
                  </div>
                  <div className="text-yellow-300/70 text-xs mt-1">
                    {t("Légendaires")}
                  </div>
                </div>
              </div>
            </div>
          }
        />
      )}

      {/* Filter Tabs */}
      <div className={`flex flex-wrap ${isMobile ? "gap-1.5" : "gap-2"}`}>
        <button
          key={"all"}
          onClick={() => setFilter("all")}
          className={`flex items-center gap-2 rounded-lg font-semibold transition-all duration-300 ${isMobile ? "px-2.5 py-1.5 text-xs" : "px-4 py-2 text-sm"} ${
            filter === "all"
              ? "bg-gradient-to-r from-white/20 to-white/10 text-white shadow-lg border border-white/30"
              : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/10"
          }`}
        >
          <span>{t("Tous")}</span>
        </button>
        {Object.values(CardSkinRarity).map((filterOption) => {
          const isActive = filter === filterOption;
          const colorClasses =
            filterOption === CardSkinRarity.RARE
              ? isActive
                ? "bg-gradient-to-r from-blue-600/30 to-blue-800/30 text-blue-200 border-blue-400/40 shadow-blue-500/30"
                : "bg-blue-900/10 text-blue-300/60 hover:text-blue-200 hover:bg-blue-600/20 border-blue-400/20"
              : filterOption === CardSkinRarity.EPIC
                ? isActive
                  ? "bg-gradient-to-r from-purple-600/30 to-purple-800/30 text-purple-200 border-purple-400/40 shadow-purple-500/30"
                  : "bg-purple-900/10 text-purple-300/60 hover:text-purple-200 hover:bg-purple-600/20 border-purple-400/20"
                : filterOption === CardSkinRarity.LEGENDARY
                  ? isActive
                    ? "bg-gradient-to-r from-yellow-600/30 to-yellow-800/30 text-yellow-200 border-yellow-400/40 shadow-yellow-500/40"
                    : "bg-yellow-900/10 text-yellow-300/60 hover:text-yellow-200 hover:bg-yellow-600/20 border-yellow-400/20"
                  : isActive
                    ? "bg-gradient-to-r from-gray-600/30 to-gray-800/30 text-gray-200 border-gray-400/40"
                    : "bg-gray-900/10 text-gray-300/60 hover:text-gray-200 hover:bg-gray-600/20 border-gray-400/20";

          return (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={`flex items-center gap-1 rounded-lg font-semibold transition-all duration-300 border ${isMobile ? "px-2.5 py-1.5 text-xs" : "px-4 py-2 text-sm"} ${colorClasses} ${isActive ? "shadow-lg" : ""}`}
            >
              <span>{getRarityBadge(filterOption)}</span>
            </button>
          );
        })}
      </div>

      {/* Skins Grid */}
      <div
        className={`grid ${isMobile ? "grid-cols-2 gap-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"}`}
      >
        {filteredSkins.map((skin) => (
          <ShopCard
            key={skin.id}
            selectedItem={getCurrentSkin().id}
            item={skin}
            hoveredItem={hoveredSkin}
            setHoveredItem={setHoveredSkin}
            buttonLabel={t("Sélectionner le skin")}
            buyable={false}
            showButton={true}
            onClick={(item) => {
              setSkin(item.id);
            }}
            isMobile={isMobile}
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
