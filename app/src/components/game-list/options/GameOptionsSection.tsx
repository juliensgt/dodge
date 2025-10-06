import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { GameOption, GameOptionsCard } from "./GameOptionsCard";

interface GameOptionsSectionProps {
  title: string;
  icon: IconProp;
  iconColor: string;
  bgColor: string;
  borderColor: string;
  items: GameOption[];
}

// Composant pour une section
export const GameOptionsSection = ({
  title,
  icon,
  iconColor,
  bgColor,
  borderColor,
  items,
}: GameOptionsSectionProps) => (
  <div className="space-y-4">
    <div className="flex items-center gap-3 mb-4">
      <div
        className={`w-8 h-8 ${bgColor} rounded-lg flex items-center justify-center border ${borderColor}`}
      >
        <FontAwesomeIcon icon={icon} className={`${iconColor} text-sm`} />
      </div>
      <h3 className="text-white font-semibold text-lg">{title}</h3>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map((item, index) => (
        <GameOptionsCard key={index} item={item} index={index} />
      ))}
    </div>
  </div>
);
