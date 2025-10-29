import { useCollection } from "@/contexts/CollectionContext";
import { ColorType } from "@/enums/themes/ITheme";
import { GradientDirection } from "@/enums/themes/ITheme";

export function useGradient() {
  const { getCurrentTheme } = useCollection();
  const theme = getCurrentTheme();

  return {
    getGradient: (
      gradientType: string,
      direction: GradientDirection = "to-r"
    ) => {
      return theme.getGradient(gradientType, direction);
    },
    getGradientHover: (
      gradientType: string,
      direction: GradientDirection = "to-r"
    ) => {
      return theme.getGradientHover(gradientType, direction);
    },
    GradientType: theme.GradientType,
    getColor: (color: ColorType | string) => {
      // Si c'est une string, convertir en ColorType
      const colorType =
        typeof color === "string" ? (color as ColorType) : color;
      return theme.getColor(colorType);
    },
    ColorType: theme.ColorType,
  };
}
