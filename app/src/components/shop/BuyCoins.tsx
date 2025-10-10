import React, { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import ActionButton from "@/components/utils/buttons/ActionButton";
import { ColorType } from "@/enums/themes/list/PurpleTheme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faCoins, faGift } from "@fortawesome/free-solid-svg-icons";
import ShopTabTitle from "./tabs/shop-tab-title";
import Image from "next/image";
import { useIsMobile } from "@/hooks/useIsMobile";

interface CoinPackage {
  id: string;
  name: string;
  coins: number;
  price: number;
  currencySymbol: string;
  currency: string;
  bonus?: number;
  popular?: boolean;
  icon: React.ReactNode;
}

export default function BuyCoins() {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [hoveredPackage, setHoveredPackage] = useState<string | null>(null);

  // In a real app, this would come from an API
  const coinPackages: CoinPackage[] = [
    {
      id: "mini",
      name: "Mini Pack",
      coins: 400,
      bonus: 50,
      price: 4.35,
      currencySymbol: "€",
      currency: "EUR",
      icon: (
        <Image
          src="/images/coins/pack_1.png"
          alt="Mini Pack"
          width={100}
          height={100}
        />
      ),
    },
    {
      id: "small",
      name: "Petit Pack",
      coins: 600,
      bonus: 100,
      price: 7.49,
      currencySymbol: "€",
      currency: "EUR",
      icon: (
        <Image
          src="/images/coins/pack_1.png"
          alt="Small Pack"
          width={100}
          height={100}
        />
      ),
    },
    {
      id: "medium",
      name: "Pack Moyen",
      coins: 1200,
      price: 9.99,
      currencySymbol: "€",
      currency: "EUR",
      bonus: 200,
      popular: true,
      icon: (
        <Image
          src="/images/coins/pack_2.png"
          alt="Medium Pack"
          width={100}
          height={100}
        />
      ),
    },
    {
      id: "large",
      name: "Grand Pack",
      coins: 2500,
      price: 19.99,
      currencySymbol: "€",
      currency: "EUR",
      bonus: 500,
      icon: (
        <Image
          src="/images/coins/pack_3.png"
          alt="Medium Pack"
          width={100}
          height={100}
        />
      ),
    },
    {
      id: "mega",
      name: "Mega Pack",
      coins: 5000,
      price: 39.99,
      currencySymbol: "€",
      currency: "EUR",
      bonus: 1000,
      icon: (
        <Image
          src="/images/coins/pack_4.png"
          alt="Mega Pack"
          width={100}
          height={100}
        />
      ),
    },
    {
      id: "ultimate",
      name: "Ultimate Pack",
      coins: 10000,
      price: 79.99,
      currencySymbol: "€",
      currency: "EUR",
      bonus: 2500,
      icon: (
        <Image
          src="/images/coins/pack_5.png"
          alt="Ultimate Pack"
          width={100}
          height={100}
        />
      ),
    },
  ];

  const handlePurchase = (pkg: CoinPackage) => {
    // In a real app, this would integrate with a payment system
    console.log(`Purchasing ${pkg.name} for ${pkg.price} ${pkg.currency}`);
    // Show payment modal, process payment, update user's coins, etc.
  };

  const getPackageColor = (pkg: CoinPackage) => {
    if (pkg.popular) return "border-yellow-400 bg-yellow-50";
    if (pkg.coins >= 5000) return "border-purple-400 bg-purple-50";
    if (pkg.coins >= 2500) return "border-blue-400 bg-blue-50";
    return "border-gray-400 bg-gray-50";
  };

  const getPackageGradient = (pkg: CoinPackage) => {
    if (pkg.popular) return "from-yellow-400 to-orange-500";
    if (pkg.coins >= 5000) return "from-purple-500 to-pink-500";
    if (pkg.coins >= 2500) return "from-blue-500 to-cyan-500";
    if (pkg.coins <= 500) return "from-gray-200 to-slate-200";
    return "from-gray-500 to-slate-500";
  };

  return (
    <div className="space-y-4">
      <ShopTabTitle
        title={t("Acheter des Coins")}
        subtitle={t(
          "Rechargez votre portefeuille et débloquez de nouveaux contenus"
        )}
        rightSide={
          <div
            className={`bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-lg rounded-2xl ${isMobile ? "p-3" : "p-6"} border border-yellow-400/30 text-center`}
          >
            <div className="flex items-center justify-center gap-3">
              <div className="text-white font-bold text-2xl">1,250</div>
              <div className="text-yellow-300 text-md">COINS DISPONIBLES</div>
            </div>
            <p className="text-white/70 text-sm">
              {t("Utilisez vos coins pour acheter des skins et thèmes")}
            </p>
          </div>
        }
      />

      {/* Coin Packages */}
      <div
        className={`grid grid-cols-2 md:grid-cols-2 lg:grid-cols-6 ${isMobile ? "gap-4" : "gap-6"}`}
      >
        {coinPackages.map((pkg) => (
          <div
            key={pkg.id}
            className={`flex flex-col justify-between items-center
              relative ${isMobile ? "p-2" : "p-6"} rounded-2xl border-2 transition-all duration-300 cursor-pointer ${getPackageColor(pkg)} ${hoveredPackage === pkg.id ? "scale-105 shadow-lg" : ""} ${
                pkg.popular ? "ring-2 ring-yellow-400/50" : ""
              }`}
            onMouseEnter={() => setHoveredPackage(pkg.id)}
            onMouseLeave={() => setHoveredPackage(null)}
          >
            {/* Popular Badge */}
            {pkg.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div
                  className={`bg-gradient-to-r from-yellow-400 to-orange-500 text-white ${isMobile ? "text-xs" : "text-sm"} font-bold px-4 py-1 rounded-full`}
                >
                  {t("POPULAIRE")}
                </div>
              </div>
            )}

            {/* Package Icon */}
            <div className={`text-center ${isMobile ? "mb-2" : "mb-4"}`}>
              <div
                className={`${isMobile ? "w-16 h-16" : "w-24 h-24"} mx-auto mb-2 rounded-full bg-gradient-to-r ${getPackageGradient(pkg)} flex items-center justify-center text-2xl`}
              >
                {pkg.icon}
              </div>
              <h4 className={`font-bold text-gray-800`}>{pkg.name}</h4>
            </div>

            {/* Coins Display */}
            <div className="text-center mb-2">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span
                  className={`font-bold text-gray-800 ${isMobile ? "text-2xl" : "text-3xl"}`}
                >
                  {pkg.coins.toLocaleString()}
                </span>
                <FontAwesomeIcon
                  icon={faCoins}
                  size={isMobile ? "1x" : "lg"}
                  color="#ffd700"
                />
              </div>
              {pkg.bonus && (
                <div className={`text-green-600 font-semibold text-sm`}>
                  +{pkg.bonus.toLocaleString()} {t("Coins Bonus")}
                </div>
              )}
            </div>

            <div className="flex flex-col items-center gap-2 w-full">
              {/* Price */}
              <div
                className={`text-center w-full ${isMobile ? "mb-2" : "mb-6"}`}
              >
                <div
                  className={`text-xl text-gray-800 ${isMobile ? "text-md" : "text-xl"}`}
                >
                  {pkg.price}{" "}
                  <span className={`text-base font-light`}>
                    {pkg.currencySymbol}
                  </span>
                </div>
                <div
                  className={`text-gray-500 ${isMobile ? "text-xs min-h-[16px]" : "text-sm min-h-[20px]"} mt-1`}
                >
                  {pkg.bonus ? (
                    <>
                      {t("Total")}: {(pkg.coins + pkg.bonus).toLocaleString()}{" "}
                      coins
                    </>
                  ) : (
                    <span className="invisible">placeholder</span>
                  )}
                </div>
              </div>

              {/* Purchase Button */}
              <div className="flex justify-center w-full">
                <ActionButton
                  onClick={() => handlePurchase(pkg)}
                  label={t("Obtenir")}
                  color={{ color: ColorType.PRIMARY }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Special Offers */}
      <div className="bg-gradient-to-r from-purple-500/50 to-pink-500/50 backdrop-blur-lg rounded-2xl p-6 border border-purple-400/30">
        <h3 className="text-white font-bold text-xl mb-4 text-center">
          {t("Offres Spéciales")}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">
              <FontAwesomeIcon icon={faGift} color="white" />
            </div>
            <h4 className="text-white font-bold mb-1">{t("Premier Achat")}</h4>
            <p className="text-white/70 text-sm">
              {t("+25% de coins bonus sur votre premier achat")}
            </p>
          </div>
          <div className="bg-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">
              <FontAwesomeIcon icon={faCalendar} color="white" />
            </div>
            <h4 className="text-white font-bold mb-1">{t("Pack Quotidien")}</h4>
            <p className="text-white/70 text-sm">
              {t("100 coins gratuits chaque jour de connexion")}
            </p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
        <h3 className="text-white font-bold text-xl mb-4 text-center">
          {t("Questions Fréquentes")}
        </h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-white font-semibold mb-2">
              {t("Comment utiliser mes coins ?")}
            </h4>
            <p className="text-white/70 text-sm">
              {t(
                "Utilisez vos coins pour acheter des skins de cartes et des thèmes dans la boutique."
              )}
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">
              {t("Mes coins expirent-ils ?")}
            </h4>
            <p className="text-white/70 text-sm">
              {t(
                "Non, vos coins n'expirent jamais et sont sauvegardés sur votre compte."
              )}
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">
              {t("Puis-je obtenir des coins gratuitement ?")}
            </h4>
            <p className="text-white/70 text-sm">
              {t(
                "Oui ! Jouez quotidiennement pour gagner des coins et débloquer des récompenses."
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
