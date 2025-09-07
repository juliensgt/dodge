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
  PRIMARY = "from-gray-600 to-slate-700",
  BACKGROUND_MAIN = "from-gray-900 via-slate-900 to-zinc-900",
  AVATAR_DEFAULT = "from-gray-500 to-slate-600",
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
  [ColorType.PRIMARY]: "bg-gray-600",
  [ColorType.SECONDARY]: "bg-slate-600",
  [ColorType.SUCCESS]: "bg-emerald-600",
  [ColorType.WARNING]: "bg-yellow-600",
  [ColorType.DANGER]: "bg-red-600",
  [ColorType.INFO]: "bg-cyan-600",
  [ColorType.TRANSPARENT]: "bg-white/10 backdrop-blur-sm border border-white/5",
};

// Couleurs hexadécimales du thème
export const hexColors = {
  primary: "#4b5563", // gray-600
  secondary: "#475569", // slate-600
  background: "#111827", // gray-900
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
