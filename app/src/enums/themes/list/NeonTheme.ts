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
  PRIMARY = "from-green-400 to-blue-500",
  BACKGROUND_MAIN = "from-green-900 via-blue-900 to-purple-900",
  AVATAR_DEFAULT = "from-green-300 to-blue-400",
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
  [ColorType.PRIMARY]: "bg-green-400",
  [ColorType.SECONDARY]: "bg-blue-500",
  [ColorType.SUCCESS]: "bg-green-600",
  [ColorType.WARNING]: "bg-yellow-400",
  [ColorType.DANGER]: "bg-red-500",
  [ColorType.INFO]: "bg-cyan-400",
  [ColorType.TRANSPARENT]: "bg-white/10 backdrop-blur-sm border border-white/5",
};

// Couleurs hexadécimales du thème
export const hexColors = {
  primary: "#4ade80", // green-400
  secondary: "#3b82f6", // blue-500
  background: "#1e3a8a", // blue-900
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
