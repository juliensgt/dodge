import DefaultSkin from "./list/DefaultSkin";
import ClassicSkin from "./list/ClassicSkin";
import NeonSkin from "./list/NeonSkin";
import PixelArtSkin from "./list/PixelArtSkin";
import GalaxySkin from "./list/GalaxySkin";
import PaperSkin from "./list/PaperSkin";
import CyberSkin from "./list/CyberSkin";
import BarbieSkin from "./list/BarbieSkin";
import { CardSkinRarity } from "./SkinRarity";
import { Size } from "@/scripts/references/playerLayouts";

export interface CardSkin {
  id: string;
  type: "skin" | "theme";
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rarity?: CardSkinRarity;
  preview?: string;
  component: React.ComponentType<{ size?: Size }>;
}

export const cardSkins: Record<string, CardSkin> = {
  default: {
    id: "default",
    type: "skin",
    name: "Défaut",
    description: "Le skin classique du jeu Dodge",
    price: 100,
    discount: 10,
    originalPrice: 150,
    component: DefaultSkin,
    rarity: CardSkinRarity.COMMON,
  },
  neon: {
    id: "neon",
    type: "skin",
    name: "Néon",
    description: "Style cyberpunk avec effets lumineux",
    price: 100,
    discount: 10,
    originalPrice: 150,
    component: NeonSkin,
    rarity: CardSkinRarity.RARE,
  },
  classic: {
    id: "classic",
    type: "skin",
    name: "Classique",
    description: "Style vintage avec tons dorés",
    price: 100,
    discount: 10,
    originalPrice: 150,
    component: ClassicSkin,
    rarity: CardSkinRarity.COMMON,
  },
  pixelArt: {
    id: "pixelArt",
    type: "skin",
    name: "Pixel Art",
    description: "Style pixel art",
    price: 100,
    discount: 10,
    originalPrice: 150,
    component: PixelArtSkin,
    rarity: CardSkinRarity.COMMON,
  },
  galaxy: {
    id: "galaxy",
    type: "skin",
    name: "Galaxy",
    description: "Style galaxy",
    price: 100,
    discount: 10,
    originalPrice: 150,
    component: GalaxySkin,
    rarity: CardSkinRarity.COMMON,
  },
  paper: {
    id: "paper",
    type: "skin",
    name: "Paper",
    description: "Style paper",
    price: 100,
    discount: 10,
    originalPrice: 150,
    component: PaperSkin,
    rarity: CardSkinRarity.COMMON,
  },
  cyber: {
    id: "cyber",
    type: "skin",
    name: "Cyber",
    description: "Style cyber",
    price: 100,
    discount: 10,
    originalPrice: 150,
    component: CyberSkin,
    rarity: CardSkinRarity.COMMON,
  },
  barbie: {
    id: "barbie",
    type: "skin",
    name: "Barbie",
    description: "Style barbie",
    price: 100,
    discount: 10,
    originalPrice: 150,
    component: BarbieSkin,
    rarity: CardSkinRarity.COMMON,
  },
};

export function getSkinsOfTheWeek(): CardSkin[] {
  return [cardSkins.neon, cardSkins.galaxy, cardSkins.cyber, cardSkins.barbie];
}

// Fonction pour obtenir un skin par son ID
export function getCardSkin(skinId: string): CardSkin {
  return cardSkins[skinId] || cardSkins.default;
}

// Fonction pour obtenir tous les skins débloqués
export function getUnlockedSkins(): CardSkin[] {
  return Object.values(cardSkins);
}

// Fonction pour obtenir les skins par rareté
export function getSkinsByRarity(rarity: CardSkin["rarity"]): CardSkin[] {
  return Object.values(cardSkins).filter((skin) => skin.rarity === rarity);
}
