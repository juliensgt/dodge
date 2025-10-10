import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useIsMobile } from "@/hooks/useIsMobile";

interface ShopCoinsButtonProps {
  onClick: () => void;
}

export default function ShopCoinsButton({ onClick }: ShopCoinsButtonProps) {
  const isMobile = useIsMobile();
  const coins = 1250;
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full px-4 ${
        isMobile ? "py-3" : "py-2"
      } bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors cursor-pointer`}
    >
      <FontAwesomeIcon
        icon={faCoins}
        size={isMobile ? "1x" : undefined}
        color="#ffd700"
      />
      <span
        className={`${isMobile ? "text-sm" : "text-xl"} text-white font-bold`}
      >
        {coins}
      </span>
      {!isMobile && <span className="text-yellow-300 text-lg">COINS</span>}
    </button>
  );
}
