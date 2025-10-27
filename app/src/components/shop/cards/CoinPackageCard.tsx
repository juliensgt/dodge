import React from "react";
import Image from "next/image";

interface CoinPackageCardProps {
  coins: number;
  price: number;
  currencySymbol: string;
  icon: React.ReactNode;
  popular?: boolean;
  isHovered: boolean;
  isMobile: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
  gradient: string;
  glow: string;
}

/**
 * Card component for displaying a coin package offer
 */
export default function CoinPackageCard({
  coins,
  price,
  currencySymbol,
  icon,
  isHovered,
  isMobile,
  onMouseEnter,
  onMouseLeave,
  onClick,
  gradient,
  glow,
}: CoinPackageCardProps) {
  return (
    <div
      onClick={onClick}
      className={`relative bg-gradient-to-b ${gradient} backdrop-blur-xl rounded-xl overflow-hidden transition-all duration-300 cursor-pointer border shadow-lg ${glow} ${isMobile ? "p-2" : "p-4"} ${
        isHovered && !isMobile ? "scale-105" : ""
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Royal border effect */}
      <div className="absolute inset-0 rounded-xl border border-white/10 pointer-events-none" />

      {/* Package Icon */}
      <div className={`flex justify-center ${isMobile ? "mb-1" : "mb-2"}`}>
        {icon}
      </div>

      {/* Coins Display */}
      <div className="text-center">
        <div
          className={`flex items-center justify-center gap-1 ${isMobile ? "mb-1" : "mb-2"}`}
        >
          <span
            className={`font-bold text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)] ${
              isMobile ? "text-base" : "text-2xl"
            }`}
          >
            {coins.toLocaleString()}
          </span>
          <Image
            src="/images/icons/coins.png"
            alt="Coins"
            width={isMobile ? 16 : 24}
            height={isMobile ? 16 : 24}
            className="drop-shadow-lg"
          />
        </div>

        {/* Price */}
        <div
          className={`text-white font-bold ${isMobile ? "text-sm" : "text-xl"}`}
        >
          {price} {currencySymbol}
        </div>
      </div>
    </div>
  );
}
