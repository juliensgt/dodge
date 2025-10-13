import { useTheme } from "../../../../contexts/ThemeContext";
import { ThemeType } from "../../../../enums/themes/Theme";
import Image from "next/image";

interface CardFrontProps {
  cardImage?: string;
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
  cardImage,
  cardValue,
  className = "",
}: CardFrontProps) {
  const { currentTheme } = useTheme();
  const cardGradient = getCardGradient(currentTheme);

  return (
    <div
      className={`card-front w-full h-full relative rounded-lg shadow-md ${cardGradient} ${className}`}
    >
      {cardImage ? (
        <>
          <Image
            src={cardImage}
            alt="Character"
            fill
            className="character absolute object-cover rounded-lg"
          />
          {cardValue !== undefined && (
            <div className="value absolute bottom-1 left-1 right-1 text-center p-1 text-xs font-bold text-white bg-black bg-opacity-50 rounded">
              {cardValue}
            </div>
          )}
        </>
      ) : (
        <div className="noSpecialCard w-full h-full flex justify-center items-center">
          {/* Center area with subtle highlight for number visibility */}
          <div className="w-12 h-8 flex justify-center items-center backdrop-blur-sm">
            <div className="noSpecialCard-value text-3xl font-bold text-white drop-shadow-lg">
              {cardValue}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
