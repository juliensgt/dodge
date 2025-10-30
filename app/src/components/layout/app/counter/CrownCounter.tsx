import { useIsMobile } from "@/hooks/useIsMobile";
import Image from "next/image";
import Counter from "./Counter";
import router from "next/router";

export default function CrownCounter() {
  const isMobile = useIsMobile();
  const playerStats = {
    crowns: 100,
  };
  const handleIncrement = () => {
    router.push("/shop");
  };
  return (
    <div className="flex items-center relative pt-1">
      <Counter value={playerStats.crowns} onClick={handleIncrement} />
      {/* Crown Logo */}
      <Image
        src="/images/icons/crown.png"
        alt="Crown"
        width={isMobile ? 33 : 45}
        height={isMobile ? 33 : 45}
        className={`absolute ${isMobile ? "-top-3 -right-3" : "-top-6 -right-4"} drop-shadow-lg rotate-30 z-0`}
      />
    </div>
  );
}
