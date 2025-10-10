import { useTheme } from "@/contexts/ThemeContext";

type GradientDirection =
  | "to-r"
  | "to-l"
  | "to-b"
  | "to-br"
  | "to-bl"
  | "to-t"
  | "to-tr"
  | "to-tl";

export function useGradient() {
  const { getCurrentTheme } = useTheme();
  const theme = getCurrentTheme();

  return {
    getGradient: (
      gradientType: string,
      direction: GradientDirection = "to-r"
    ) => {
      // Create a dynamic gradient class based on the string value
      return `bg-gradient-${direction} ${gradientType}`;
    },
    getGradientHover: (
      gradientType: string,
      direction: GradientDirection = "to-r"
    ) => {
      return `hover:bg-gradient-${direction} ${gradientType}`;
    },
    GradientType: theme.GradientType,
    getColor: (color: string) => {
      // Map color strings to CSS classes
      const colorMap: Record<string, string> = {
        primary: "bg-purple-600",
        secondary: "bg-blue-600",
        success: "bg-green-600",
        warning: "bg-yellow-600",
        danger: "bg-red-600",
        info: "bg-cyan-600",
        transparent: "bg-white/10 backdrop-blur-sm border border-white/5",
      };
      return colorMap[color] || "bg-gray-600";
    },
    ColorType: theme.ColorType,
  };
}
