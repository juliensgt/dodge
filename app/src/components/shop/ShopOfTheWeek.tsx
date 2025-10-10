import React, { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import {
  CardSkin,
  getSkinsOfTheWeek,
  getUnlockedSkins,
} from "@/enums/skins/SkinManager";
import { getAllThemes } from "@/enums/themes/ThemeManager";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import ShopTabTitle from "./tabs/shop-tab-title";
import ShopCard from "./cards/ShopCard";
import { Theme } from "@/enums/themes/Theme";

export default function ShopOfTheWeek() {
  const { t } = useTranslation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const skins = getUnlockedSkins();
  const themes = getAllThemes();

  // Featured items for the week (in a real app, this would come from an API)
  const featuredItems: CardSkin[] = getSkinsOfTheWeek();

  const handlePurchase = (item: CardSkin | Theme) => {
    // In a real app, this would make an API call to purchase the item
    console.log(
      `Purchasing ${item.type}: ${item.name} for ${item.price} coins`
    );
    // Show success message, update user's coins, etc.
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <ShopTabTitle
        title={t("Boutique de la Semaine")}
        subtitle={t("Offres spéciales limitées dans le temps !")}
        rightSide={
          <div className="inline-flex items-end">
            <div className="flex items-center gap-2 bg-red-500/20 backdrop-blur-lg py-2 px-4 rounded-full border border-red-200/30 text-red-300 text-sm font-bold">
              <FontAwesomeIcon icon={faClock} /> {t("Fin dans 2j 14h 32m")}
            </div>
          </div>
        }
      />

      {/* Featured Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredItems.map((item) => (
          <ShopCard
            key={item.id}
            selectedItem={null}
            item={item}
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
            buttonLabel={t("Acheter")}
            buyable={true}
            showButton={true}
            onClick={handlePurchase}
          />
        ))}
      </div>

      {/* Weekly Collection Progress */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
        <h3 className="text-white font-bold text-xl mb-4 text-center">
          {t("Collection de la Semaine")}
        </h3>
        <div className="flex items-center justify-between mb-4">
          <span className="text-white/80">
            {t("Progression")}: 2/4 {t("objets achetés")}
          </span>
          <span className="text-yellow-400 font-bold">50%</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-3">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full w-1/2"></div>
        </div>
        <p className="text-white/60 text-sm text-center mt-2">
          {t("Achetez 2 objets de plus pour débloquer un bonus exclusif !")}
        </p>
      </div>
    </div>
  );
}
