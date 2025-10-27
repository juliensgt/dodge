import React, { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { CardSkin, getSkinsOfTheWeek } from "@/enums/skins/SkinManager";
import ShopCard from "./cards/ShopCard";
import { Theme } from "@/enums/themes/Theme";
import { useIsMobile } from "@/hooks/useIsMobile";

/**
 * Shop of the Week section displaying limited-time featured items
 */
export default function ShopOfTheWeek() {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const featuredItems = getSkinsOfTheWeek();

  const handlePurchase = (item: CardSkin | Theme) => {
    console.log(
      `Purchasing ${item.type}: ${item.name} for ${item.price} coins`
    );
    // TODO: API call to purchase item
  };

  return (
    <div className={isMobile ? "space-y-2" : "space-y-4"}>
      {/* Header */}
      {isMobile ? (
        <div
          className="text-center bg-gradient-to-r from-yellow-500 to-orange-500 p-1 rotate-[0.5deg]
          border-3 border-yellow-500"
        >
          <h2 className="text-xl font-lucky text-white mt-1">
            {t("Boutique de la Semaine")}
          </h2>
        </div>
      ) : (
        <div className="text-center mb-6">
          <h2 className="text-4xl font-lucky text-white drop-shadow-[0_0_15px_rgba(250,204,21,0.4)] mb-3">
            {t("Boutique de la Semaine")}
          </h2>
          <p className="text-white/70 text-base mb-4">
            {t("Offres spéciales limitées dans le temps !")}
          </p>
        </div>
      )}

      {/* Featured Items Grid */}
      <div
        className={`grid ${isMobile ? "grid-cols-2 gap-2" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"}`}
      >
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
            isMobile={isMobile}
          />
        ))}
      </div>
    </div>
  );
}
