import React, { useState } from "react";
import { useGradient } from "@/hooks/useGradient";
import { useTranslation } from "@/hooks/useTranslation";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { AuthLevel } from "@/types/auth/auth";
import { useRouter } from "next/router";
import ActionButton from "@/components/utils/buttons/ActionButton";
import { ColorType } from "@/enums/themes/list/PurpleTheme";
import ShopOfTheWeek from "@/components/shop/ShopOfTheWeek";
import Collections from "@/components/shop/Collections";
import MySkins from "@/components/shop/MySkins";
import MyThemes from "@/components/shop/MyThemes";
import BuyCoins from "@/components/shop/BuyCoins";
import {
  faBoxOpen,
  faCoins,
  faPaintRoller,
  faPalette,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ShopTab =
  | "shop-week"
  | "collections"
  | "my-skins"
  | "my-themes"
  | "buy-coins";

interface ShopCategory {
  id: ShopTab;
  label: string;
  icon: React.ReactNode;
  tab: React.ReactNode;
}

export default function Shop() {
  const [activeTab, setActiveTab] = useState<ShopTab>("shop-week");
  const { t } = useTranslation();
  const { getGradient, GradientType } = useGradient();
  const router = useRouter();

  const handleBackToApp = () => {
    router.back();
  };

  const tabs: ShopCategory[] = [
    {
      id: "shop-week",
      label: t("Boutique de la semaine"),
      icon: <FontAwesomeIcon icon={faStar} size="lg" color="#ffd700" />,
      tab: <ShopOfTheWeek />,
    },
    {
      id: "collections",
      label: t("Collections"),
      icon: <FontAwesomeIcon icon={faBoxOpen} size="lg" />,
      tab: <Collections />,
    },
    {
      id: "my-skins",
      label: t("Mes Skins"),
      icon: <FontAwesomeIcon icon={faPalette} size="lg" />,
      tab: <MySkins />,
    },
    {
      id: "my-themes",
      label: t("Mes Thèmes"),
      icon: <FontAwesomeIcon icon={faPaintRoller} size="lg" color="#ffffff" />,
      tab: <MyThemes />,
    },
    {
      id: "buy-coins",
      label: t("Acheter des Coins"),
      icon: <FontAwesomeIcon icon={faCoins} size="lg" color="#ffd700" />,
      tab: <BuyCoins />,
    },
  ];

  const renderTabContent = () => {
    return tabs.find((tab) => tab.id === activeTab)?.tab;
  };

  return (
    <AuthGuard level={AuthLevel.USER}>
      <div
        className={`min-h-screen ${getGradient(GradientType.BACKGROUND_MAIN, "to-br")} font-['MT']`}
      >
        {/* Header */}
        <div className="relative">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent"></div>

          {/* Top navigation */}
          <div className="relative z-10 flex justify-between items-center p-4">
            <div className="flex items-center gap-4">
              <ActionButton
                onClick={handleBackToApp}
                label={t("← Retour")}
                color={{ color: ColorType.TRANSPARENT }}
              />
            </div>
            {/* Coins display */}
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 backdrop-blur-lg rounded-full px-4 py-3 border border-yellow-400/30">
              <span className="text-2xl">
                <FontAwesomeIcon icon={faCoins} color="#ffd700" />
              </span>
              <span className="text-white font-bold text-xl">1,250</span>
              <span className="text-yellow-300 text-sm">COINS</span>
            </div>
          </div>

          {/* Shop title and coins display */}
          <div className="relative z-10 text-center pb-4">
            <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-2xl">
              {t("BOUTIQUE")}
            </h1>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 mb-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-2 flex flex-wrap justify-center gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-white/20 text-white shadow-lg scale-105"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-8">
          <div className="max-w-7xl mx-auto">{renderTabContent()}</div>
        </div>
      </div>
    </AuthGuard>
  );
}
