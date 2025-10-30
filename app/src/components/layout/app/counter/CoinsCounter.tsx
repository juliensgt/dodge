import { useIsMobile } from "@/hooks/useIsMobile";
import Image from "next/image";
import Counter from "./Counter";
import router from "next/router";

export default function CoinsCounter() {
  const isMobile = useIsMobile();
  const playerStats = {
    coins: 1250,
  };
  const handleIncrement = () => {
    router.push("/shop");
  };
  return (
    <div className="flex items-center relative pt-1">
      <Counter value={playerStats.coins} onClick={handleIncrement} />
      {/* Coins Logo */}
      <Image
        src="/images/icons/coins.png"
        alt="Coins"
        width={isMobile ? 30 : 35}
        height={isMobile ? 30 : 35}
        className={`absolute ${isMobile ? "-right-4" : "-right-4"} drop-shadow-lg rotate-45 z-0`}
      />
    </div>
  );
}
