interface CardProps {
  cardState: string;
  cardImage: string;
  cardValue: number;
  cliquable?: boolean;
  size?: "small" | "medium" | "large";
  onClick?: () => void;
  className?: string;
}

export default function Card({
  cardState,
  cardImage,
  cardValue,
  cliquable = false,
  size = "medium",
  onClick,
  className = "",
}: CardProps) {
  const sizeClasses = {
    small: "w-16 h-24",
    medium: "w-20 h-32",
    large: "w-24 h-36",
  };

  return (
    <div
      className={`card ${sizeClasses[size]} bg-white rounded-lg shadow-lg cursor-pointer transition-transform duration-200 hover:scale-105 select-none ${className}`}
      onClick={cliquable ? onClick : undefined}
    >
      <div className="card-content w-full h-full flex items-center justify-center">
        <div className="text-gray-800 font-bold text-lg">{cardValue}</div>
      </div>
    </div>
  );
}
