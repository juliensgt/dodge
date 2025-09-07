import { Theme, ThemeType, ThemeColors } from "./Theme";
import * as PurpleTheme from "./list/PurpleTheme";
import * as OceanTheme from "./list/OceanTheme";
import * as ForestTheme from "./list/ForestTheme";
import * as SunsetTheme from "./list/SunsetTheme";
import * as MonochromeTheme from "./list/MonochromeTheme";

export type GradientTheme = typeof PurpleTheme;

// Configuration des thèmes disponibles
export const THEMES = {
  [ThemeType.PURPLE]: {
    id: ThemeType.PURPLE,
    name: "Purple",
    description: "Thème violet et bleu classique",
    preview: "from-purple-600 to-blue-600",
    theme: PurpleTheme,
  },
  [ThemeType.OCEAN]: {
    id: ThemeType.OCEAN,
    name: "Ocean",
    description: "Thème océan avec des tons cyan et bleu",
    preview: "from-cyan-500 to-blue-600",
    theme: OceanTheme,
  },
  [ThemeType.FOREST]: {
    id: ThemeType.FOREST,
    name: "Forest",
    description: "Thème forêt avec des tons verts et émeraude",
    preview: "from-emerald-500 to-teal-600",
    theme: ForestTheme,
  },
  [ThemeType.SUNSET]: {
    id: ThemeType.SUNSET,
    name: "Sunset",
    description: "Thème coucher de soleil avec des tons orange et rose",
    preview: "from-orange-500 to-pink-600",
    theme: SunsetTheme,
  },
  [ThemeType.MONOCHROME]: {
    id: ThemeType.MONOCHROME,
    name: "Monochrome",
    description: "Thème monochrome en nuances de gris",
    preview: "from-gray-600 to-slate-700",
    theme: MonochromeTheme,
  },
} as const;

// Fonction pour obtenir un thème par son ID
export function getTheme(themeId: ThemeType): GradientTheme {
  return (
    THEMES as unknown as Record<ThemeType, Theme & { theme: GradientTheme }>
  )[themeId]?.theme as GradientTheme;
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
