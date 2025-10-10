import { CardSkinRarity } from "@/enums/skins/SkinRarity";

export const getRarityColor = (rarity: CardSkinRarity) => {
  switch (rarity) {
    case "common":
      return "border-gray-400 bg-gray-300/40";
    case "rare":
      return "border-blue-400 bg-blue-300/40";
    case "epic":
      return "border-purple-400 bg-purple-300/40";
    case "legendary":
      return "border-yellow-400 bg-yellow-300/40";
    default:
      return "border-gray-400 bg-gray-300/40";
  }
};

export const getRarityBadge = (rarity: CardSkinRarity) => {
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
