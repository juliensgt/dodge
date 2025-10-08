import DefaultSkin from "./list/DefaultSkin";
import ClassicSkin from "./list/ClassicSkin";
import NeonSkin from "./list/NeonSkin";
import { Size } from "@/scripts/references/playerLayouts";
import PixelArtSkin from "./list/PixelArtSkin";
import GalaxySkin from "./list/GalaxySkin";
import PaperSkin from "./list/PaperSkin";
import CyberSkin from "./list/CyberSkin";
import BarbieSkin from "./list/BarbieSkin";

export interface CardSkin {
  id: string;
  name: string;
  description: string;
  component: React.ComponentType<{ size?: Size }>;
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
  pixelArt: {
    id: "pixelArt",
    name: "Pixel Art",
    description: "Style pixel art",
    component: PixelArtSkin,
    unlocked: true,
    rarity: "common",
  },
  galaxy: {
    id: "galaxy",
    name: "Galaxy",
    description: "Style galaxy",
    component: GalaxySkin,
    unlocked: true,
    rarity: "common",
  },
  paper: {
    id: "paper",
    name: "Paper",
    description: "Style paper",
    component: PaperSkin,
    unlocked: true,
    rarity: "common",
  },
  cyber: {
    id: "cyber",
    name: "Cyber",
    description: "Style cyber",
    component: CyberSkin,
    unlocked: true,
    rarity: "common",
  },
  barbie: {
    id: "barbie",
    name: "Barbie",
    description: "Style barbie",
    component: BarbieSkin,
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
