import { useIsMobile } from "@/hooks/useIsMobile";
import ActionButton from "../utils/buttons/ActionButton";
import { ColorType } from "@/enums/themes/list/PurpleTheme";
import { ShopTab } from "./ShopTabs";
import BuyCoins from "./BuyCoins";
import ShopCoinsButton from "./header/shop-coins-button";
import ShopCartButton from "./header/shop-cart-button";
import ShopTitle from "./header/shop-title";

interface ShopHeaderProps {
  handleBackToApp: () => void;
  setActiveTab: (tab: ShopTab) => void;
  setActiveTabContent: (tab: React.ReactNode) => void;
  onTabChange?: (tab: ShopTab, content: React.ReactNode) => void;
}

// Reusable components
const BackButton = ({
  onClick,
  isMobile,
}: {
  onClick: () => void;
  isMobile: boolean;
}) => (
  <ActionButton
    onClick={onClick}
    label={isMobile ? "←" : "← Retour"}
    color={{ color: ColorType.TRANSPARENT }}
  />
);

export default function ShopHeader({
  handleBackToApp,
  setActiveTab,
  setActiveTabContent,
  onTabChange,
}: ShopHeaderProps) {
  const isMobile = useIsMobile();

  const handleCoinsClick = () => {
    if (onTabChange) {
      onTabChange("buy-coins", <BuyCoins />);
    } else {
      setActiveTab("buy-coins");
      setActiveTabContent(<BuyCoins />);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="relative">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent"></div>

        {/* Top navigation */}
        {isMobile ? (
          /* Mobile: inline-flex layout */
          <div className="relative z-10 flex items-center justify-between p-4 pb-4">
            {/* Left side - Back button and Title */}
            <div className="flex items-center gap-3">
              <BackButton onClick={handleBackToApp} isMobile={isMobile} />
              <ShopTitle />
            </div>

            {/* Right side - Coins and Cart */}
            <div className="flex items-center gap-2">
              <ShopCoinsButton onClick={handleCoinsClick} />
              <ShopCartButton />
            </div>
          </div>
        ) : (
          /* Desktop: centered title layout */
          <div className="relative z-10 grid grid-cols-3 items-start p-4 pb-0">
            {/* Left side - Back button */}
            <div className="flex items-start gap-4">
              <BackButton onClick={handleBackToApp} isMobile={isMobile} />
            </div>

            {/* Center - Title */}
            <div className="text-center pb-4">
              <ShopTitle />
            </div>

            {/* Right side - Coins and Cart */}
            <div className="flex items-start justify-end gap-4">
              <ShopCoinsButton onClick={handleCoinsClick} />
              <ShopCartButton />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
