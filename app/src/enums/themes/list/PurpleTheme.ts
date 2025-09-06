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
  PRIMARY = "from-purple-600 to-blue-600",
  BACKGROUND_MAIN = "from-purple-900 via-blue-900 to-indigo-900",
  AVATAR_DEFAULT = "from-purple-500 to-blue-500",
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
  [ColorType.PRIMARY]: "bg-purple-600",
  [ColorType.SECONDARY]: "bg-blue-600",
  [ColorType.SUCCESS]: "bg-green-600",
  [ColorType.WARNING]: "bg-yellow-600",
  [ColorType.DANGER]: "bg-red-600",
  [ColorType.INFO]: "bg-cyan-600",
  [ColorType.TRANSPARENT]: "bg-white/10 backdrop-blur-sm border border-white/5",
};

export function getColor(color: ColorType): string {
  return colors[color];
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
