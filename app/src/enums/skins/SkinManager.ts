import DefaultSkin from "./list/DefaultSkin";
import ClassicSkin from "./list/ClassicSkin";
import NeonSkin from "./list/NeonSkin";

export interface CardSkin {
  id: string;
  name: string;
  description: string;
  component: React.ComponentType<{ size?: "small" | "medium" | "big" }>;
  unlocked: boolean;
  rarity: "common" | "rare" | "epic" | "legendary";
}

export const cardSkins: Record<string, CardSkin> = {
  default: {
    id: "default",
    name: "Défaut",
    description: "Le skin classique du jeu Dodge",
    component: DefaultSkin,
    unlocked: true,
    rarity: "common",
  },
  neon: {
    id: "neon",
    name: "Néon",
    description: "Style cyberpunk avec effets lumineux",
    component: NeonSkin,
    unlocked: true,
    rarity: "rare",
  },
  classic: {
    id: "classic",
    name: "Classique",
    description: "Style vintage avec tons dorés",
    component: ClassicSkin,
    unlocked: true,
    rarity: "common",
  },
};

// Fonction pour obtenir un skin par son ID
export function getCardSkin(skinId: string): CardSkin {
  return cardSkins[skinId] || cardSkins.default;
}

// Fonction pour obtenir tous les skins débloqués
export function getUnlockedSkins(): CardSkin[] {
  return Object.values(cardSkins).filter((skin) => skin.unlocked);
}

// Fonction pour obtenir les skins par rareté
export function getSkinsByRarity(rarity: CardSkin["rarity"]): CardSkin[] {
  return Object.values(cardSkins).filter((skin) => skin.rarity === rarity);
}
