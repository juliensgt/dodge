import { useCollection } from "@/contexts/CollectionContext";
import { ThemeType } from "@/enums/themes/Theme";

interface CardFrontProps {
  cardValue?: number;
  className?: string;
}

// Function to get card gradient classes based on theme
const getCardGradient = (theme: ThemeType): string => {
  const gradientMap = {
    [ThemeType.PURPLE]: "bg-gradient-to-br from-purple-600 to-blue-600",
    [ThemeType.OCEAN]: "bg-gradient-to-br from-cyan-500 to-blue-600",
    [ThemeType.FOREST]: "bg-gradient-to-br from-emerald-500 to-teal-600",
    [ThemeType.SUNSET]: "bg-gradient-to-br from-orange-500 to-pink-600",
    [ThemeType.NEON]: "bg-gradient-to-br from-green-400 to-blue-500",
    [ThemeType.MONOCHROME]: "bg-gradient-to-br from-gray-600 to-slate-700",
  };

  return gradientMap[theme] || gradientMap[ThemeType.PURPLE];
};

export default function CardFront({
  cardValue,
  className = "",
}: CardFrontProps) {
  const { getCurrentTheme } = useCollection();
  const cardGradient = getCardGradient(getCurrentTheme().getThemeType());
  return (
    <div
      className={`w-full h-full relative rounded-lg shadow-md ${cardGradient} ${className}`}
    >
      <div className="w-full h-full flex justify-center items-center">
        <div className="text-3xl font-bold text-white drop-shadow-lg">
          {cardValue ? cardValue : "?"}
        </div>
      </div>
    </div>
  );
}
