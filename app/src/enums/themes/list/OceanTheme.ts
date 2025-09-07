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
  PRIMARY = "from-cyan-500 to-blue-600",
  BACKGROUND_MAIN = "from-cyan-900 via-blue-900 to-indigo-900",
  AVATAR_DEFAULT = "from-cyan-400 to-blue-500",
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
  [ColorType.PRIMARY]: "bg-cyan-600",
  [ColorType.SECONDARY]: "bg-blue-600",
  [ColorType.SUCCESS]: "bg-emerald-600",
  [ColorType.WARNING]: "bg-amber-600",
  [ColorType.DANGER]: "bg-red-600",
  [ColorType.INFO]: "bg-sky-600",
  [ColorType.TRANSPARENT]: "bg-white/10 backdrop-blur-sm border border-white/5",
};

// Couleurs hexadécimales du thème
export const hexColors = {
  primary: "#0891b2", // cyan-600
  secondary: "#2563eb", // blue-600
  background: "#0c4a6e", // sky-900
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
