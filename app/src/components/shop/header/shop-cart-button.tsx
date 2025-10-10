import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function ShopCartButton() {
  const isMobile = useIsMobile();
  const cart = 0;
  return (
    <button
      className={`inline-flex items-center gap-2 rounded-full px-4 ${
        isMobile ? "py-3" : "py-2"
      } bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors cursor-pointer`}
    >
      <FontAwesomeIcon
        icon={faShoppingCart}
        size={isMobile ? "1x" : undefined}
        color="#ffffff"
      />
      <span
        className={`${isMobile ? "text-sm" : "text-xl"} text-white font-bold`}
      >
        {cart}
      </span>
    </button>
  );
}
