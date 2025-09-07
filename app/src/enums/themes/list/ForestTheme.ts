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
  PRIMARY = "from-emerald-500 to-teal-600",
  BACKGROUND_MAIN = "from-green-900 via-emerald-900 to-teal-900",
  AVATAR_DEFAULT = "from-green-500 to-emerald-500",
}

export enum ColorType {
  PRIMARY = "primary",
  TRANSPARENT = "transparent",
  SECONDARY = "secondary",
  SUCCESS = "success",
  WARNING = "warning",
  DANGER = "danger",
  INFO = "info",
}

export const colors = {
  [ColorType.PRIMARY]: "bg-emerald-600",
  [ColorType.SECONDARY]: "bg-teal-600",
  [ColorType.SUCCESS]: "bg-green-600",
  [ColorType.WARNING]: "bg-yellow-600",
  [ColorType.DANGER]: "bg-red-600",
  [ColorType.INFO]: "bg-cyan-600",
  [ColorType.TRANSPARENT]: "bg-white/10 backdrop-blur-sm border border-white/5",
};

// Couleurs hexadécimales du thème
export const hexColors = {
  primary: "#059669", // emerald-600
  secondary: "#0d9488", // teal-600
  background: "#064e3b", // emerald-900
  text: "#ffffff", // white
};

export function getColor(color: ColorType): string {
  return colors[color];
}

// Fonction pour récupérer les couleurs hexadécimales
export function getHexColors() {
  return hexColors;
}

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
