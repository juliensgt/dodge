import React, { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { getUnlockedSkins, CardSkin } from "@/enums/skins/SkinManager";
import { getAllThemes } from "@/enums/themes/ThemeManager";
import { ThemeType } from "@/enums/themes/Theme";
import Card from "@/components/game/cards/card/Card";
import { CardState } from "@/components/game/cards/card/Card";
import ActionButton from "@/components/utils/buttons/ActionButton";
import { ColorType } from "@/enums/themes/list/PurpleTheme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

interface FeaturedItem {
  id: string;
  type: "skin" | "theme";
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rarity?: CardSkin["rarity"];
  preview?: string;
  skinId?: string;
  themeId?: ThemeType;
}

export default function ShopOfTheWeek() {
  const { t } = useTranslation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const skins = getUnlockedSkins();
  const themes = getAllThemes();

  // Featured items for the week (in a real app, this would come from an API)
  const featuredItems: FeaturedItem[] = [
    {
      id: "skin-neon",
      type: "skin",
      name: "Néon Cyberpunk",
      description: "Style cyberpunk avec effets lumineux",
      price: 150,
      originalPrice: 200,
      discount: 25,
      rarity: "rare",
      skinId: "neon",
    },
    {
      id: "skin-galaxy",
      type: "skin",
      name: "Galaxy Explorer",
      description: "Voyagez dans l'espace avec ce skin galactique",
      price: 300,
      originalPrice: 400,
      discount: 25,
      rarity: "epic",
      skinId: "galaxy",
    },
    {
      id: "skin-cyber",
      type: "skin",
      name: "Cyber Matrix",
      description: "Plongez dans la matrice cybernétique",
      price: 500,
      originalPrice: 600,
      discount: 17,
      rarity: "legendary",
      skinId: "cyber",
    },
    {
      id: "theme-sunset",
      type: "theme",
      name: "Sunset Dreams",
      description: "Thème coucher de soleil avec des tons orange et rose",
      price: 200,
      originalPrice: 250,
      discount: 20,
      themeId: ThemeType.SUNSET,
      preview: "from-orange-500 to-pink-600",
    },
  ];

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

  const handlePurchase = (item: FeaturedItem) => {
    // In a real app, this would make an API call to purchase the item
    console.log(
      `Purchasing ${item.type}: ${item.name} for ${item.price} coins`
    );
    // Show success message, update user's coins, etc.
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-4xl font-bold text-white mb-2">
          {t("Boutique de la Semaine")}
        </h2>
        <p className="text-white/80 text-lg">
          {t("Offres spéciales limitées dans le temps !")}
        </p>
        <div className="mt-4 inline-flex items-center gap-2 bg-red-500/20 backdrop-blur-lg rounded-full px-4 py-2 border border-red-400/30">
          <span className="text-red-300 text-sm font-bold">
            <FontAwesomeIcon icon={faClock} /> {t("Fin dans 2j 14h 32m")}
          </span>
        </div>
      </div>

      {/* Featured Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredItems.map((item) => (
          <div
            key={item.id}
            className={`relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 border-2 transition-all duration-300 ${
              hoveredItem === item.id
                ? "scale-105 shadow-2xl border-yellow-400/50"
                : "border-white/20 hover:border-white/40"
            } ${item.rarity ? getRarityColor(item.rarity) : ""}`}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {/* Discount Badge */}
            {item.discount && (
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                -{item.discount}%
              </div>
            )}

            {/* Rarity Badge */}
            {item.rarity && (
              <div className="absolute top-4 left-4">
                <span
                  className={`px-2 py-1 text-xs font-bold rounded-full ${
                    item.rarity === "common"
                      ? "bg-gray-200 text-gray-700"
                      : item.rarity === "rare"
                        ? "bg-blue-200 text-blue-700"
                        : item.rarity === "epic"
                          ? "bg-purple-200 text-purple-700"
                          : "bg-yellow-200 text-yellow-700"
                  }`}
                >
                  {getRarityBadge(item.rarity)}
                </span>
              </div>
            )}

            {/* Item Preview */}
            <div className="flex justify-center mb-4">
              {item.type === "skin" && item.skinId ? (
                <div className="w-20 h-24">
                  <Card
                    cardState={CardState.CARD_BACK}
                    size="small"
                    skinId={item.skinId}
                  />
                </div>
              ) : item.type === "theme" && item.preview ? (
                <div
                  className={`w-20 h-24 rounded-lg bg-gradient-to-r ${item.preview} border-2 border-white/30`}
                ></div>
              ) : (
                <div className="w-20 h-24 bg-gray-300 rounded-lg flex items-center justify-center">
                  <span className="text-4xl">🎨</span>
                </div>
              )}
            </div>

            {/* Item Info */}
            <div className="text-center mb-4">
              <h3 className="text-white font-bold text-lg mb-2">{item.name}</h3>
              <p className="text-white/70 text-sm mb-3">{item.description}</p>

              {/* Price */}
              <div className="flex items-center justify-center gap-2">
                {item.originalPrice && (
                  <span className="text-white/50 line-through text-sm">
                    {item.originalPrice} coins
                  </span>
                )}
                <span className="text-yellow-400 font-bold text-xl">
                  {item.price} coins
                </span>
              </div>
            </div>

            {/* Purchase Button */}
            <ActionButton
              onClick={() => handlePurchase(item)}
              label={t("Acheter")}
              color={{ color: ColorType.PRIMARY }}
            />
          </div>
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
