import { ITheme, ColorType, GradientDirection } from "../ITheme";
import { ThemeColors, ThemeType } from "../Theme";

export enum GradientType {
  PRIMARY = "from-cyan-500 to-blue-600",
  BACKGROUND_MAIN = "from-cyan-900 via-blue-900 to-indigo-900",
  AVATAR_DEFAULT = "from-cyan-400 to-blue-500",
}

export const colors = {
  [ColorType.PRIMARY]: "bg-cyan-600",
  [ColorType.SECONDARY]: "bg-blue-600",
  [ColorType.SUCCESS]: "bg-emerald-600",
  [ColorType.WARNING]: "bg-amber-600",
  [ColorType.DANGER]: "bg-red-600",
  [ColorType.INFO]: "bg-sky-600",
  [ColorType.TRANSPARENT]: "bg-white/10 backdrop-blur-sm border border-white/5",
};

export const hexColors: ThemeColors = {
  primary: "#0891b2", // cyan-600
  secondary: "#2563eb", // blue-600
  background: "#0c4a6e", // sky-900
  text: "#ffffff", // white
};

// Implémentation de l'interface ITheme
export const OceanTheme: ITheme = {
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
    return ThemeType.OCEAN;
  },
};

// Export par défaut pour compatibilité
export default OceanTheme;
