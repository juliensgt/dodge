import { ITheme, ColorType, GradientDirection } from "../ITheme";
import { ThemeColors, ThemeType } from "../Theme";

export enum GradientType {
  PRIMARY = "from-gray-600 to-slate-700",
  BACKGROUND_MAIN = "from-gray-900 via-slate-900 to-zinc-900",
  AVATAR_DEFAULT = "from-gray-500 to-slate-600",
}

export const colors = {
  [ColorType.PRIMARY]: "bg-gray-600",
  [ColorType.SECONDARY]: "bg-slate-600",
  [ColorType.SUCCESS]: "bg-emerald-600",
  [ColorType.WARNING]: "bg-yellow-600",
  [ColorType.DANGER]: "bg-red-600",
  [ColorType.INFO]: "bg-cyan-600",
  [ColorType.TRANSPARENT]: "bg-white/10 backdrop-blur-sm border border-white/5",
};

export const hexColors: ThemeColors = {
  primary: "#4b5563", // gray-600
  secondary: "#475569", // slate-600
  background: "#111827", // gray-900
  text: "#ffffff", // white
};

// Implémentation de l'interface ITheme
export const MonochromeTheme: ITheme = {
  GradientType: {
    PRIMARY: GradientType.PRIMARY,
    BACKGROUND_MAIN: GradientType.BACKGROUND_MAIN,
    AVATAR_DEFAULT: GradientType.AVATAR_DEFAULT,
  },
  ColorType,
  colors,
  hexColors,
  getColor(color: ColorType): string {
    return colors[color];
  },
  getHexColors(): ThemeColors {
    return hexColors;
  },
  getGradient(
    gradientType: string,
    direction: GradientDirection = "to-r"
  ): string {
    return `bg-gradient-${direction} ${gradientType}`;
  },
  getGradientHover(
    gradientType: string,
    direction: GradientDirection = "to-r"
  ): string {
    return `hover:bg-gradient-${direction} ${gradientType}`;
  },
  getThemeType(): ThemeType {
    return ThemeType.MONOCHROME;
  },
  getGlowHex(): string {
    // Amber stands out on grayscale
    return "#f59e0b";
  },
};

// Export par défaut pour compatibilité
export default MonochromeTheme;
