import { ThemeColors, ThemeType } from "./Theme";

export type GradientDirection =
  | "to-r"
  | "to-l"
  | "to-b"
  | "to-br"
  | "to-bl"
  | "to-t"
  | "to-tr"
  | "to-tl";

export enum ColorType {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  SUCCESS = "success",
  WARNING = "warning",
  DANGER = "danger",
  INFO = "info",
  TRANSPARENT = "transparent",
}

// Interface commune pour tous les thèmes
export interface ITheme {
  // Enum des types de gradients (unique pour chaque thème)
  GradientType: {
    PRIMARY: string;
    BACKGROUND_MAIN: string;
    AVATAR_DEFAULT: string;
    [key: string]: string;
  };

  // Enum des types de couleurs (commun à tous les thèmes)
  ColorType: typeof ColorType;

  // Objet des couleurs CSS
  colors: Record<ColorType, string>;

  // Objet des couleurs hexadécimales
  hexColors: ThemeColors;

  // Méthodes communes
  getColor(color: ColorType): string;
  getHexColors(): ThemeColors;
  getGradient(gradientType: string, direction?: GradientDirection): string;
  getGradientHover(gradientType: string, direction?: GradientDirection): string;
  getThemeType(): ThemeType;
}
