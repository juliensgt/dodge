import { ITheme, ColorType, GradientDirection } from "../ITheme";
import { ThemeColors, ThemeType } from "../Theme";

export enum GradientType {
  PRIMARY = "from-orange-500 to-pink-600",
  BACKGROUND_MAIN = "from-orange-900 via-pink-900 to-red-900",
  AVATAR_DEFAULT = "from-orange-400 to-pink-500",
}

export const colors = {
  [ColorType.PRIMARY]: "bg-orange-600",
  [ColorType.SECONDARY]: "bg-pink-600",
  [ColorType.SUCCESS]: "bg-emerald-600",
  [ColorType.WARNING]: "bg-yellow-600",
  [ColorType.DANGER]: "bg-red-600",
  [ColorType.INFO]: "bg-cyan-600",
  [ColorType.TRANSPARENT]: "bg-white/10 backdrop-blur-sm border border-white/5",
};

export const hexColors: ThemeColors = {
  primary: "#ea580c", // orange-600
  secondary: "#db2777", // pink-600
  background: "#9a3412", // orange-900
  text: "#ffffff", // white
};

// Implémentation de l'interface ITheme
export const SunsetTheme: ITheme = {
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
    return ThemeType.SUNSET;
  },
};

// Export par défaut pour compatibilité
export default SunsetTheme;
