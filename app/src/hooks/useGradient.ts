import { useTheme } from "@/contexts/ThemeContext";

export function useGradient() {
  const { getCurrentTheme } = useTheme();
  const theme = getCurrentTheme();

  return {
    getGradient: theme.getGradient,
    getGradientHover: theme.getGradientHover,
    GradientType: theme.GradientType,
    getColor: theme.getColor,
    ColorType: theme.ColorType,
  };
}
