import { useState } from "react";
import { getUnlockedSkins, CardSkin } from "../../../enums/skins/SkinManager";
import Card from "../../game/cards/card/Card";
import { CardState } from "../../game/cards/card/Card";
import { useCardSkin } from "@/hooks/useCardSkin";

export default function CardSkinSelector() {
  const [hoveredSkin, setHoveredSkin] = useState<string | null>(null);
  const { selectedSkinId, selectSkin } = useCardSkin();
  const unlockedSkins = getUnlockedSkins();

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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {unlockedSkins.map((skin) => (
        <div
          key={skin.id}
          className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
            selectedSkinId === skin.id
              ? "border-blue-500 bg-blue-100 shadow-lg"
              : getRarityColor(skin.rarity)
          } ${hoveredSkin === skin.id ? "scale-105 shadow-md" : ""}`}
          onClick={() => selectSkin(skin.id)}
          onMouseEnter={() => setHoveredSkin(skin.id)}
          onMouseLeave={() => setHoveredSkin(null)}
        >
          {/* Badge de rareté */}
          <div className="absolute top-2 right-2">
            <span
              className={`px-2 py-1 text-xs font-bold rounded-full ${
                skin.rarity === "common"
                  ? "bg-gray-200 text-gray-700"
                  : skin.rarity === "rare"
                    ? "bg-blue-200 text-blue-700"
                    : skin.rarity === "epic"
                      ? "bg-purple-200 text-purple-700"
                      : "bg-yellow-200 text-yellow-700"
              }`}
            >
              {getRarityBadge(skin.rarity)}
            </span>
          </div>

          {/* Aperçu de la carte */}
          <div className="flex justify-center mb-3">
            <div className="w-16 h-20">
              <Card
                cardState={CardState.CARD_BACK}
                size="small"
                skinId={skin.id}
              />
            </div>
          </div>

          {/* Informations du skin */}
          <div className="text-center">
            <h4 className="font-semibold text-gray-800">{skin.name}</h4>
            <p className="text-sm text-gray-600 mt-1">{skin.description}</p>
          </div>

          {/* Indicateur de sélection */}
          {selectedSkinId === skin.id && (
            <div className="absolute top-2 left-2">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
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
        </div>
      ))}
    </div>
  );
}
