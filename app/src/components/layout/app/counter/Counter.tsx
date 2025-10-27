import { useIsMobile } from "@/hooks/useIsMobile";

interface CounterProps {
  value: number;
  onClick: () => void;
}
export default function Counter({ value, onClick }: CounterProps) {
  const isMobile = useIsMobile();
  return (
    <div
      className={`flex z-0 items-center bg-gradient-to-t from-black to-gray-600 rounded-md`}
    >
      {/* Plus Button */}
      <button
        className={`flex items-center scale-105 hover:scale-110 cursor-pointer justify-center 
            bg-gradient-to-br from-green-400 to-green-600 rounded-md ${
              isMobile ? "w-5 h-5" : "w-8 h-8"
            } hover:from-green-500 transition-all duration-200`}
        onClick={onClick}
      >
        <span
          className={`text-white text-shadow-lg ${isMobile ? "text-xl" : "text-3xl"} font-bold`}
        >
          +
        </span>
      </button>

      {/* Coins Counter */}
      <span
        className={`text-white ${isMobile ? "text-sm min-w-[4ch] pl-2 pr-3" : "text-lg min-w-[4ch] pl-2 pr-5"} font-bold text-right`}
      >
        {value}
      </span>
    </div>
  );
}
