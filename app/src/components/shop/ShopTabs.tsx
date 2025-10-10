import {
  faCoins,
  faPaintRoller,
  faPalette,
  faShop,
} from "@fortawesome/free-solid-svg-icons";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ShopOfTheWeek from "./ShopOfTheWeek";
import Collections from "./Collections";
import MySkins from "./MySkins";
import MyThemes from "./MyThemes";
import { useTranslation } from "@/hooks/useTranslation";
import BuyCoins from "./BuyCoins";
import { useIsMobile } from "@/hooks/useIsMobile";

interface ShopTabsProps {
  activeTab: ShopTab;
  setActiveTab: (tab: ShopTab) => void;
  setActiveTabContent: (tab: React.ReactNode) => void;
  onTabChange?: (tab: ShopTab, content: React.ReactNode) => void;
}

export type ShopTab =
  | "shop-week"
  | "collections"
  | "my-skins"
  | "my-themes"
  | "buy-coins";

export interface ShopCategory {
  id: ShopTab;
  label: string;
  icon: React.ReactNode;
  tab: React.ReactNode;
}

export default function ShopTabs({
  activeTab,
  setActiveTab,
  setActiveTabContent,
  onTabChange,
}: ShopTabsProps) {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const tabs: ShopCategory[] = [
    {
      id: "shop-week",
      label: t("Boutique de la semaine"),
      icon: <FontAwesomeIcon icon={faShop} size="lg" />,
      tab: <ShopOfTheWeek />,
    },
    {
      id: "collections",
      label: t("Collections"),
      icon: <FontAwesomeIcon icon={faBoxOpen} size="lg" />,
      tab: <Collections />,
    },
    {
      id: "my-skins",
      label: t("Mes Skins"),
      icon: <FontAwesomeIcon icon={faPalette} size="lg" />,
      tab: <MySkins />,
    },
    {
      id: "my-themes",
      label: t("Mes Thèmes"),
      icon: <FontAwesomeIcon icon={faPaintRoller} size="lg" />,
      tab: <MyThemes />,
    },
    {
      id: "buy-coins",
      label: t("Acheter des Coins"),
      icon: <FontAwesomeIcon icon={faCoins} size="lg" color="#ffd700" />,
      tab: <BuyCoins />,
    },
  ];
  return (
    <div className={`${isMobile ? "max-w-full px-4" : "max-w-6xl"} mx-auto`}>
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-2 flex flex-wrap justify-center gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              if (onTabChange) {
                onTabChange(tab.id, tab.tab);
              } else {
                setActiveTab(tab.id);
                setActiveTabContent(tab.tab);
              }
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
              activeTab === tab.id
                ? "bg-white/20 text-white shadow-lg scale-105"
                : "text-white/70 hover:text-white hover:bg-white/10"
            }`}
          >
            <div className="flex items-center gap-2">
              <span>{tab.icon}</span>
              {!isMobile && <span>{tab.label}</span>}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
