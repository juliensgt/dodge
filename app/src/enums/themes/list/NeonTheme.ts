import { ITheme, ColorType, GradientDirection } from "../ITheme";
import { ThemeColors, ThemeType } from "../Theme";

export enum GradientType {
  PRIMARY = "from-green-400 to-blue-500",
  BACKGROUND_MAIN = "from-green-900 via-blue-900 to-purple-900",
  AVATAR_DEFAULT = "from-green-300 to-blue-400",
}

export const colors = {
  [ColorType.PRIMARY]: "bg-green-400",
  [ColorType.SECONDARY]: "bg-blue-500",
  [ColorType.SUCCESS]: "bg-green-600",
  [ColorType.WARNING]: "bg-yellow-400",
  [ColorType.DANGER]: "bg-red-500",
  [ColorType.INFO]: "bg-cyan-400",
  [ColorType.TRANSPARENT]: "bg-white/10 backdrop-blur-sm border border-white/5",
};

export const hexColors: ThemeColors = {
  primary: "#4ade80", // green-400
  secondary: "#3b82f6", // blue-500
  background: "#1e3a8a", // blue-900
  text: "#ffffff", // white
};

// Implémentation de l'interface ITheme
export const NeonTheme: ITheme = {
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
    return ThemeType.NEON;
  },
  getGlowHex(): string {
    // Hot pink to contrast neon green/blue
    return "#ec4899";
  },
};

// Export par défaut pour compatibilité
export default NeonTheme;
