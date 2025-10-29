import { ITheme, ColorType, GradientDirection } from "../ITheme";
import { ThemeColors, ThemeType } from "../Theme";

export enum GradientType {
  PRIMARY = "from-purple-600 to-blue-600",
  BACKGROUND_MAIN = "from-purple-900 via-blue-900 to-indigo-900",
  AVATAR_DEFAULT = "from-purple-500 to-blue-500",
}

export const colors = {
  [ColorType.PRIMARY]: "bg-purple-600",
  [ColorType.SECONDARY]: "bg-blue-600",
  [ColorType.SUCCESS]: "bg-green-600",
  [ColorType.WARNING]: "bg-yellow-600",
  [ColorType.DANGER]: "bg-red-600",
  [ColorType.INFO]: "bg-cyan-600",
  [ColorType.TRANSPARENT]: "bg-white/10 backdrop-blur-sm border border-white/5",
};

export const hexColors: ThemeColors = {
  primary: "#9333ea", // purple-600
  secondary: "#2563eb", // blue-600
  background: "#1e1b4b", // indigo-900
  text: "#ffffff", // white
};

// Implémentation de l'interface ITheme
export const PurpleTheme: ITheme = {
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
    return ThemeType.PURPLE;
  },
};

// Export par défaut pour compatibilité
export default PurpleTheme;
