import ActionButton from "@/components/utils/buttons/ActionButton";
import { ColorType } from "@/enums/themes/list/PurpleTheme";
import { getRarityBadge, getRarityColor } from "@/types/items/items.type";
import Card from "@/components/game/cards/card/Card";
import { CardState } from "@/components/game/cards/card/Card";
import { CardSkin } from "@/enums/skins/SkinManager";
import { Theme } from "@/enums/themes/Theme";

interface ShopCardProps {
  buttonLabel: string;
  selectedItem: string | null;
  item: CardSkin | Theme;
  hoveredItem: string | null;
  buyable: boolean;
  showButton: boolean;
  setHoveredItem: (hoveredItem: string | null) => void;
  onClick: (item: CardSkin | Theme) => void;
}

export default function ShopCard({
  buttonLabel,
  onClick,
  selectedItem,
  item,
  hoveredItem,
  buyable,
  showButton,
  setHoveredItem,
}: ShopCardProps) {
  return (
    <div
      key={item.id}
      className={`relative backdrop-blur-lg rounded-2xl p-6 border-2 transition-all duration-300 ${
        hoveredItem === item.id ? "scale-105 shadow-2xl" : ""
      } ${item.rarity ? getRarityColor(item.rarity) : ""}`}
      onMouseEnter={() => setHoveredItem(item.id)}
      onMouseLeave={() => setHoveredItem(null)}
    >
      {/* Discount Badge */}
      {item.discount && buyable && (
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded-full z-10">
          -{item.discount}%
        </div>
      )}

      {/* Rarity Badge */}
      <div className="flex gap-1 absolute top-1 left-2 z-10">
        {/* Type Badge */}
        {item.type && (
          <div className="">
            <span
              className={`px-2 py-1 font-bold text-xs rounded-full ${
                item.type === "skin"
                  ? "bg-gray-200 text-gray-700"
                  : "bg-blue-200 text-blue-700"
              }`}
            >
              {item.type === "skin" ? "Carte" : "Thème"}
            </span>
          </div>
        )}
        {item.rarity && (
          <div className="">
            <span
              className={`px-2 py-1 font-bold text-xs rounded-full ${
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
      </div>

      {/* Item Preview */}
      <div className="flex justify-center mb-4 mt-4">
        {item.type === "skin" && item.id ? (
          <div className="flex gap-2 items-end">
            <Card
              cardState={CardState.CARD_BACK}
              size="medium"
              skinId={item.id}
            />
            <Card
              cardState={CardState.CARD_BACK}
              size="small"
              skinId={item.id}
            />
          </div>
        ) : item.type === "theme" && item.preview ? (
          <div
            className={`w-48 h-24 rounded-lg bg-gradient-to-r ${item.preview} border-2 border-white/30`}
          ></div>
        ) : (
          <div className="w-20 h-24 bg-gray-300 rounded-lg flex items-center justify-center">
            <span className="text-4xl">🎨</span>
          </div>
        )}
      </div>

      {/* Selection Indicator */}
      {selectedItem === item.id && (
        <div className="absolute top-3 right-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
            <svg
              className="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      )}

      {/* Item Info */}
      <div className="text-center mb-4">
        <h3 className="text-white font-bold text-lg mb-2">{item.name}</h3>
        <p className="text-white/70 text-sm mb-3">{item.description}</p>

        {/* Price */}
        {buyable && (
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
        )}
      </div>

      {/* Purchase Button */}
      {showButton && (
        <div className="flex justify-center items-end">
          <ActionButton
            onClick={() => onClick(item)}
            label={buttonLabel}
            color={{ color: ColorType.PRIMARY }}
          />
        </div>
      )}
    </div>
  );
}
