import React, { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import ActionButton from "@/components/utils/buttons/ActionButton";
import { ColorType } from "@/enums/themes/list/PurpleTheme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faCoins,
  faGift,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

interface CoinPackage {
  id: string;
  name: string;
  coins: number;
  price: number;
  currencySymbol: string;
  currency: string;
  bonus?: number;
  popular?: boolean;
  icon: string;
}

export default function BuyCoins() {
  const { t } = useTranslation();
  const [hoveredPackage, setHoveredPackage] = useState<string | null>(null);

  // In a real app, this would come from an API
  const coinPackages: CoinPackage[] = [
    {
      id: "mini",
      name: "Mini Pack",
      coins: 500,
      price: 4.99,
      currencySymbol: "€",
      currency: "EUR",
      icon: "🎁",
    },
    {
      id: "small",
      name: "Petit Pack",
      coins: 750,
      price: 7.49,
      currencySymbol: "€",
      currency: "EUR",
      icon: "💰",
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
      icon: "💎",
    },
    {
      id: "large",
      name: "Grand Pack",
      coins: 2500,
      price: 19.99,
      currencySymbol: "€",
      currency: "EUR",
      bonus: 500,
      icon: "💸",
    },
    {
      id: "mega",
      name: "Mega Pack",
      coins: 5000,
      price: 39.99,
      currencySymbol: "€",
      currency: "EUR",
      bonus: 1000,
      icon: "🏆",
    },
    {
      id: "ultimate",
      name: "Ultimate Pack",
      coins: 10000,
      price: 79.99,
      currencySymbol: "€",
      currency: "EUR",
      bonus: 2500,
      icon: "👑",
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
    return "from-gray-500 to-slate-500";
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-bold text-white mb-4">
            {t("Acheter des Coins")}
          </h2>
          <p className="text-white/80 text-lg">
            {t(
              "Rechargez votre portefeuille et débloquez de nouveaux contenus"
            )}
          </p>
        </div>
        <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-lg rounded-2xl p-6 border border-yellow-400/30 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="text-white font-bold text-3xl">1,250</div>
            <div className="text-yellow-300 text-sm">COINS DISPONIBLES</div>
          </div>
          <p className="text-white/70 text-sm">
            {t("Utilisez vos coins pour acheter des skins et thèmes")}
          </p>
        </div>
      </div>

      {/* Coin Packages */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coinPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${getPackageColor(pkg)} ${hoveredPackage === pkg.id ? "scale-105 shadow-lg" : ""} ${
                pkg.popular ? "ring-2 ring-yellow-400/50" : ""
              }`}
              onMouseEnter={() => setHoveredPackage(pkg.id)}
              onMouseLeave={() => setHoveredPackage(null)}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-bold px-4 py-1 rounded-full">
                    <FontAwesomeIcon icon={faStar} color="yellow" />{" "}
                    {t("POPULAIRE")}
                  </div>
                </div>
              )}

              {/* Package Icon */}
              <div className="text-center mb-4">
                <div
                  className={`w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-r ${getPackageGradient(pkg)} flex items-center justify-center text-3xl`}
                >
                  {pkg.icon}
                </div>
                <h4 className="font-bold text-gray-800 text-xl mb-1">
                  {pkg.name}
                </h4>
              </div>

              {/* Coins Display */}
              <div className="text-center mb-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-3xl font-bold text-gray-800">
                    {pkg.coins.toLocaleString()}
                  </span>
                  <span className="text-2xl">
                    <FontAwesomeIcon icon={faCoins} color="#ffd700" />
                  </span>
                </div>
                {pkg.bonus && (
                  <div className="text-green-600 font-semibold text-sm">
                    +{pkg.bonus.toLocaleString()} {t("bonus")} !
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="text-center mb-6">
                <div className="text-2xl font-bold text-gray-800">
                  {pkg.price}{" "}
                  <span className="text-base font-light">
                    {pkg.currencySymbol}
                  </span>
                </div>
                {pkg.bonus && (
                  <div className="text-gray-500 text-sm mt-1">
                    {t("Total")}: {(pkg.coins + pkg.bonus).toLocaleString()}{" "}
                    coins
                  </div>
                )}
              </div>

              {/* Purchase Button */}
              <div className="flex justify-center">
                <ActionButton
                  onClick={() => handlePurchase(pkg)}
                  label={t("Acheter")}
                  color={{ color: ColorType.PRIMARY }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Special Offers */}
      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-2xl p-6 border border-purple-400/30">
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
              {t("+50% de coins bonus sur votre premier achat")}
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
