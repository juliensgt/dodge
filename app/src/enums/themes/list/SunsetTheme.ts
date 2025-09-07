export interface Gradient {
  gradientType: GradientType;
  gradientDirection?:
    | "to-r"
    | "to-l"
    | "to-b"
    | "to-br"
    | "to-bl"
    | "to-t"
    | "to-tr"
    | "to-tl";
}

export enum GradientType {
  PRIMARY = "from-orange-500 to-pink-600",
  BACKGROUND_MAIN = "from-orange-900 via-pink-900 to-red-900",
  AVATAR_DEFAULT = "from-orange-400 to-pink-500",
}

// Couleurs pour les boutons et autres éléments
export enum ColorType {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  SUCCESS = "success",
  WARNING = "warning",
  DANGER = "danger",
  INFO = "info",
  TRANSPARENT = "transparent",
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

// Couleurs hexadécimales du thème
export const hexColors = {
  primary: "#ea580c", // orange-600
  secondary: "#db2777", // pink-600
  background: "#9a3412", // orange-900
  text: "#ffffff", // white
};

export function getColor(color: ColorType): string {
  return colors[color];
}

// Fonction pour récupérer les couleurs hexadécimales
export function getHexColors() {
  return hexColors;
}

// Fonction utilitaire pour obtenir les classes CSS complètes
export function getGradient(
  gradientType: GradientType,
  direction:
    | "to-r"
    | "to-l"
    | "to-b"
    | "to-br"
    | "to-bl"
    | "to-t"
    | "to-tr"
    | "to-tl" = "to-r"
): string {
  return `bg-gradient-${direction} ${gradientType}`;
}

// Fonction utilitaire pour obtenir les classes de hover
export function getGradientHover(
  gradientType: GradientType,
  direction:
    | "to-r"
    | "to-l"
    | "to-b"
    | "to-br"
    | "to-bl"
    | "to-t"
    | "to-tr"
    | "to-tl" = "to-r"
): string {
  return `hover:bg-gradient-${direction} ${gradientType}`;
}
