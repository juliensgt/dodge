import Card from "@/components/game/cards/card/Card";
import { CardState } from "@/components/game/cards/card/Card";
import { CardSkin } from "@/enums/skins/SkinManager";
import { Theme } from "@/enums/themes/Theme";
import Image from "next/image";

interface ShopCardProps {
  buttonLabel: string;
  selectedItem: string | null;
  item: CardSkin | Theme;
  hoveredItem: string | null;
  buyable: boolean;
  showButton: boolean;
  setHoveredItem: (hoveredItem: string | null) => void;
  onClick: (item: CardSkin | Theme) => void;
  isMobile?: boolean;
}

export default function ShopCard({
  onClick,
  selectedItem,
  item,
  hoveredItem,
  buyable,
  setHoveredItem,
  isMobile = false,
}: ShopCardProps) {
  const getRarityGradient = (rarity?: string) => {
    switch (rarity) {
      case "common":
        return "from-gray-600/50 to-gray-800/40";
      case "rare":
        return "from-blue-600/50 to-blue-800/40";
      case "epic":
        return "from-purple-600/50 to-purple-800/40";
      case "legendary":
        return "from-yellow-600/50 to-yellow-800/40";
      default:
        return "from-gray-600/20 to-gray-800/40";
    }
  };

  const getRarityGlow = (rarity?: string) => {
    switch (rarity) {
      case "common":
        return "shadow-gray-500/20";
      case "rare":
        return "shadow-blue-500/30";
      case "epic":
        return "shadow-purple-500/40";
      case "legendary":
        return "shadow-yellow-500/50";
      default:
        return "shadow-gray-500/20";
    }
  };

  return (
    <div
      key={item.id}
      onClick={() => onClick(item)}
      className={`relative bg-gradient-to-b ${getRarityGradient(item.rarity)} backdrop-blur-xl rounded-xl overflow-hidden transition-all duration-300 cursor-pointer group ${isMobile ? "p-2" : "p-4"} ${
        hoveredItem === item.id && !isMobile
          ? `scale-105 shadow-2xl ${getRarityGlow(item.rarity)}`
          : `shadow-lg ${getRarityGlow(item.rarity)}`
      } ${selectedItem === item.id ? "ring-2 ring-yellow-400/60 ring-offset-2 ring-offset-black/50" : ""}`}
      onMouseEnter={() => !isMobile && setHoveredItem(item.id)}
      onMouseLeave={() => !isMobile && setHoveredItem(null)}
    >
      {/* Royal border effect */}
      <div className="absolute inset-0 rounded-xl border border-white/25 pointer-events-none" />

      {/* Shimmer effect on hover */}
      {!isMobile && hoveredItem === item.id && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer pointer-events-none" />
      )}

      {/* Rarity indicator - top corner accent */}
      {item.rarity && (
        <div
          className={`absolute top-0 right-0 w-16 h-16 ${
            item.rarity === "common"
              ? "bg-gradient-to-br from-gray-400/20"
              : item.rarity === "rare"
                ? "bg-gradient-to-br from-blue-400/30"
                : item.rarity === "epic"
                  ? "bg-gradient-to-br from-purple-400/40"
                  : "bg-gradient-to-br from-yellow-400/50"
          } rounded-bl-full opacity-60`}
        />
      )}

      {/* Item Preview */}
      <div
        className={`flex justify-center ${isMobile ? "mb-2 mt-1" : "mb-3 mt-2"}`}
      >
        {item.type === "skin" && item.id ? (
          <div className={`flex ${isMobile ? "gap-1" : "gap-2"} items-end`}>
            <Card
              cardState={CardState.CARD_BACK}
              size={isMobile ? "small" : "medium"}
              skinId={item.id}
            />
            {!isMobile && (
              <Card
                cardState={CardState.CARD_BACK}
                size="small"
                skinId={item.id}
              />
            )}
          </div>
        ) : item.type === "theme" && item.preview ? (
          <div
            className={`rounded-lg bg-gradient-to-r ${item.preview} shadow-lg ${isMobile ? "w-24 h-12" : "w-48 h-24"}`}
          ></div>
        ) : (
          <div
            className={`bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg flex items-center justify-center shadow-lg ${isMobile ? "w-12 h-16 text-2xl" : "w-20 h-24 text-4xl"}`}
          >
            <span>🎨</span>
          </div>
        )}
      </div>

      {/* Item Info */}
      <div className="text-center">
        <h3
          className={`text-white font-lucky drop-shadow-lg ${isMobile ? "text-sm leading-tight mb-1 line-clamp-1" : "text-base mb-2 leading-tight"}`}
        >
          {item.name}
        </h3>
        {!isMobile && (
          <p className="text-white/60 text-xs mb-2 line-clamp-2">
            {item.description}
          </p>
        )}

        {/* Price */}
        {buyable && (
          <div
            className={`flex items-center justify-center gap-1.5 ${isMobile ? "mt-1" : "mt-2"}`}
          >
            <span
              className={`text-yellow-400 font-bold drop-shadow-[0_0_8px_rgba(250,204,21,0.5)] ${isMobile ? "text-base" : "text-lg"}`}
            >
              {item.price}
            </span>
            <Image
              src="/images/icons/coins.png"
              alt="Coins"
              width={isMobile ? 20 : 20}
              height={isMobile ? 20 : 20}
              className="drop-shadow-lg"
            />
          </div>
        )}
      </div>

      {/* Selection indicator - subtle glow */}
      {selectedItem === item.id && (
        <div className="absolute inset-0 rounded-xl ring-2 ring-yellow-400/60 pointer-events-none animate-pulse" />
      )}
    </div>
  );
}
