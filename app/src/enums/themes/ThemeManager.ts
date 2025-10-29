import { Theme, ThemeType, ThemeColors } from "./Theme";
import { ITheme } from "./ITheme";
import PurpleTheme from "./list/PurpleTheme";
import OceanTheme from "./list/OceanTheme";
import ForestTheme from "./list/ForestTheme";
import SunsetTheme from "./list/SunsetTheme";
import NeonTheme from "./list/NeonTheme";
import MonochromeTheme from "./list/MonochromeTheme";
import { CardSkinRarity } from "../skins/SkinRarity";

// Configuration des thèmes disponibles
export const THEMES: Record<ThemeType, Theme> = {
  [ThemeType.PURPLE]: {
    id: ThemeType.PURPLE,
    name: "Purple",
    description: "Thème violet et bleu classique",
    preview: "from-purple-600 to-blue-600",
    theme: PurpleTheme,
    type: "theme",
    price: 0,
    rarity: CardSkinRarity.COMMON,
  },
  [ThemeType.OCEAN]: {
    id: ThemeType.OCEAN,
    name: "Ocean",
    description: "Thème océan avec des tons cyan et bleu",
    preview: "from-cyan-500 to-blue-600",
    theme: OceanTheme,
    type: "theme",
    price: 0,
    rarity: CardSkinRarity.COMMON,
  },
  [ThemeType.FOREST]: {
    id: ThemeType.FOREST,
    name: "Forest",
    description: "Thème forêt avec des tons verts et émeraude",
    preview: "from-emerald-500 to-teal-600",
    theme: ForestTheme,
    type: "theme",
    price: 0,
    rarity: CardSkinRarity.COMMON,
  },
  [ThemeType.SUNSET]: {
    id: ThemeType.SUNSET,
    name: "Sunset",
    description: "Thème coucher de soleil avec des tons orange et rose",
    preview: "from-orange-500 to-pink-600",
    theme: SunsetTheme,
    type: "theme",
    price: 0,
    rarity: CardSkinRarity.COMMON,
  },
  [ThemeType.NEON]: {
    id: ThemeType.NEON,
    name: "Neon",
    description: "Thème néon avec des tons verts et bleus vibrants",
    preview: "from-green-400 to-blue-500",
    theme: NeonTheme,
    type: "theme",
    price: 0,
    rarity: CardSkinRarity.COMMON,
  },
  [ThemeType.MONOCHROME]: {
    id: ThemeType.MONOCHROME,
    name: "Monochrome",
    description: "Thème monochrome en nuances de gris",
    preview: "from-gray-600 to-slate-700",
    theme: MonochromeTheme,
    type: "theme",
    price: 0,
    rarity: CardSkinRarity.COMMON,
  },
} as const;

// Fonction pour obtenir un thème par son ID
export function getTheme(themeId: ThemeType): ITheme {
  return THEMES[themeId]?.theme as ITheme;
}

// Fonction pour obtenir tous les thèmes disponibles
export function getAllThemes() {
  return Object.values(THEMES);
}

// Fonction pour obtenir le thème par défaut
export function getDefaultTheme(): ThemeType {
  return ThemeType.PURPLE;
}

// Fonction pour obtenir les couleurs hexadécimales d'un thème
export function getThemeColors(themeId: ThemeType): ThemeColors {
  const theme = getTheme(themeId);
  return theme.getHexColors();
}
