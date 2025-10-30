import { ITheme, ColorType, GradientDirection } from "../ITheme";
import { ThemeColors, ThemeType } from "../Theme";

export enum GradientType {
  PRIMARY = "from-emerald-500 to-teal-600",
  BACKGROUND_MAIN = "from-green-900 via-emerald-900 to-teal-900",
  AVATAR_DEFAULT = "from-green-500 to-emerald-500",
}

export const colors = {
  [ColorType.PRIMARY]: "bg-emerald-600",
  [ColorType.SECONDARY]: "bg-teal-600",
  [ColorType.SUCCESS]: "bg-green-600",
  [ColorType.WARNING]: "bg-yellow-600",
  [ColorType.DANGER]: "bg-red-600",
  [ColorType.INFO]: "bg-cyan-600",
  [ColorType.TRANSPARENT]: "bg-white/10 backdrop-blur-sm border border-white/5",
};

export const hexColors: ThemeColors = {
  primary: "#059669", // emerald-600
  secondary: "#0d9488", // teal-600
  background: "#064e3b", // emerald-900
  text: "#ffffff", // white
};

// Implémentation de l'interface ITheme
export const ForestTheme: ITheme = {
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
    return ThemeType.FOREST;
  },
  getGlowHex(): string {
    // Bright lime for contrast on dark greens
    return "#a3e635";
  },
};

// Export par défaut pour compatibilité
export default ForestTheme;
