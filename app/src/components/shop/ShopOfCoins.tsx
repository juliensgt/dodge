import React, { useState, useMemo } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import Image from "next/image";
import { useIsMobile } from "@/hooks/useIsMobile";
import CoinPackageCard from "./cards/CoinPackageCard";

interface CoinPackage {
  id: string;
  name: string;
  coins: number;
  price: number;
  currencySymbol: string;
  currency: string;
  popular?: boolean;
  image: string;
}

// Package data configuration
const COIN_PACKAGES_DATA: Omit<CoinPackage, "icon">[] = [
  {
    id: "mini",
    name: "Mini Pack",
    coins: 400,
    price: 4.35,
    currencySymbol: "€",
    currency: "EUR",
    image: "/images/coins/pack_1.png",
  },
  {
    id: "small",
    name: "Petit Pack",
    coins: 600,
    price: 7.49,
    currencySymbol: "€",
    currency: "EUR",
    image: "/images/coins/pack_1.png",
  },
  {
    id: "medium",
    name: "Pack Moyen",
    coins: 1200,
    price: 9.99,
    currencySymbol: "€",
    currency: "EUR",
    popular: true,
    image: "/images/coins/pack_2.png",
  },
  {
    id: "large",
    name: "Grand Pack",
    coins: 2500,
    price: 19.99,
    currencySymbol: "€",
    currency: "EUR",
    image: "/images/coins/pack_3.png",
  },
  {
    id: "mega",
    name: "Mega Pack",
    coins: 5000,
    price: 39.99,
    currencySymbol: "€",
    currency: "EUR",
    image: "/images/coins/pack_4.png",
  },
  {
    id: "ultimate",
    name: "Ultimate Pack",
    coins: 10000,
    price: 79.99,
    currencySymbol: "€",
    currency: "EUR",
    image: "/images/coins/pack_5.png",
  },
];

// Styling functions
const getPackageGradient = (coins: number, popular?: boolean): string => {
  if (popular) return "from-yellow-600/75 to-orange-400/65";
  if (coins >= 5000) return "from-purple-600/75 to-pink-400/65";
  if (coins >= 2500) return "from-blue-600/75 to-cyan-400/65";
  return "from-gray-600/50 to-slate-400/65";
};

const getPackageGlow = (coins: number, popular?: boolean): string => {
  if (popular) return "shadow-yellow-500/60 border-yellow-400/80";
  if (coins >= 5000) return "shadow-purple-500/60 border-purple-400/80";
  if (coins >= 2500) return "shadow-blue-500/60 border-blue-400/80";
  return "shadow-gray-500/30 border-white/20";
};

/**
 * Buy Coins section where users can purchase coin packages
 */
export default function ShopOfCoins() {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [hoveredPackage, setHoveredPackage] = useState<string | null>(null);

  // Generate package icons with proper sizing based on viewport
  const coinPackages = useMemo(
    () =>
      COIN_PACKAGES_DATA.map((pkg) => ({
        ...pkg,
        icon: (
          <Image
            src={pkg.image}
            alt={pkg.name}
            width={isMobile ? 60 : 100}
            height={isMobile ? 60 : 100}
          />
        ),
      })),
    [isMobile]
  );

  const handlePurchase = (pkg: (typeof coinPackages)[0]) => {
    console.log(`Purchasing ${pkg.name} for ${pkg.price} ${pkg.currency}`);
    // TODO: Integrate with payment system
  };

  return (
    <div className="space-y-2">
      {/* Header - Desktop only */}
      {!isMobile && (
        <>
          <h2 className="text-4xl font-lucky text-white text-center drop-shadow-[0_0_15px_rgba(250,204,21,0.4)] mb-3">
            {t("Monnaie")}
          </h2>
          <p className="text-white/70 text-base mb-4 text-center">
            {t(
              "Rechargez votre portefeuille et débloquez de nouveaux contenus"
            )}
          </p>
        </>
      )}

      {isMobile && (
        <div
          className="text-center bg-gradient-to-r from-green-500 to-lime-500 p-1 rotate-[-0.5deg]
          border-3 border-lime-500"
        >
          <h2 className="text-xl font-lucky text-white mt-1">{t("Monnaie")}</h2>
        </div>
      )}

      {/* Coin Packages Grid */}
      <div
        className={`grid ${
          isMobile
            ? "grid-cols-3 gap-2"
            : "grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
        }`}
      >
        {coinPackages.map((pkg) => (
          <CoinPackageCard
            key={pkg.id}
            coins={pkg.coins}
            price={pkg.price}
            currencySymbol={pkg.currencySymbol}
            icon={pkg.icon}
            isHovered={hoveredPackage === pkg.id}
            isMobile={isMobile}
            onMouseEnter={() => !isMobile && setHoveredPackage(pkg.id)}
            onMouseLeave={() => !isMobile && setHoveredPackage(null)}
            onClick={() => handlePurchase(pkg)}
            gradient={getPackageGradient(pkg.coins, pkg.popular)}
            glow={getPackageGlow(pkg.coins, pkg.popular)}
          />
        ))}
      </div>
    </div>
  );
}
