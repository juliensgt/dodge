import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface GameOption {
  icon: IconProp;
  label: string;
  description: string;
  value: string;
  category: string;
}

interface GameOptionsCardProps {
  item: GameOption;
  index: number;
}
// Composant pour une carte d'option
export const GameOptionsCard = ({ item, index }: GameOptionsCardProps) => {
  const getCategoryStyle = (category: string) => {
    switch (category) {
      case "players":
        return {
          bgColor: "bg-blue-500/20",
          iconColor: "text-blue-400",
          borderColor: "border-blue-500/40",
          accentColor: "text-blue-300",
        };
      case "points":
        return {
          bgColor: "bg-amber-500/20",
          iconColor: "text-amber-400",
          borderColor: "border-amber-500/40",
          accentColor: "text-amber-300",
        };
      case "cards":
        return {
          bgColor: "bg-purple-500/20",
          iconColor: "text-purple-400",
          borderColor: "border-purple-500/40",
          accentColor: "text-purple-300",
        };
      case "time":
        return {
          bgColor: "bg-emerald-500/20",
          iconColor: "text-emerald-400",
          borderColor: "border-emerald-500/40",
          accentColor: "text-emerald-300",
        };
      default:
        return {
          bgColor: "bg-white/20",
          iconColor: "text-white/70",
          borderColor: "border-white/40",
          accentColor: "text-white/90",
        };
    }
  };

  const style = getCategoryStyle(item.category);

  return (
    <div
      key={index}
      className={`${style.bgColor} backdrop-blur-lg rounded-xl p-5 border ${style.borderColor} hover:bg-opacity-30 transition-all duration-300 group`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`flex-shrink-0 w-12 h-12 ${style.bgColor} rounded-xl flex items-center justify-center border ${style.borderColor} group-hover:scale-105 transition-transform duration-200`}
        >
          <FontAwesomeIcon
            icon={item.icon}
            className={`${style.iconColor} text-lg`}
          />
        </div>
        <div className="flex justify-between items-center flex-1">
          <div className="flex flex-col flex-1">
            <h4 className="text-white font-semibold text-base">{item.label}</h4>
            <p className="text-white/80 text-[13px]">{item.description}</p>
          </div>
          <span
            className={`${style.accentColor} font-bold text-2xl ml-4 flex-shrink-0`}
          >
            {item.value}
          </span>
        </div>
      </div>
    </div>
  );
};
