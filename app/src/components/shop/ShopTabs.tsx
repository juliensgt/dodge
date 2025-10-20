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
import { motion, AnimatePresence } from "framer-motion";

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
    <>
      {/* Desktop - Top Tabs */}
      {!isMobile && (
        <div className="max-w-6xl mx-auto">
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
                  <span>{tab.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mobile - Bottom Tabs */}
      <AnimatePresence>
        {isMobile && (
          <motion.nav
            key="shop-mobile-nav"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className="fixed bottom-16 left-0 right-0 z-40 bg-gradient-to-t from-gray-900/95 via-gray-900/90 to-gray-900/85 backdrop-blur-xl border-t border-white/30 shadow-lg"
          >
            <div className="flex justify-around items-center h-14 px-2 overflow-x-auto">
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
                  className={`flex flex-col items-center justify-center gap-0.5 transition-all duration-200 min-w-[60px] flex-shrink-0 ${
                    activeTab === tab.id ? "text-yellow-400" : "text-white/80"
                  }`}
                >
                  <motion.span
                    animate={
                      activeTab === tab.id
                        ? { scale: [1, 1.15, 1.1] }
                        : { scale: 1 }
                    }
                    transition={{ duration: 0.3 }}
                  >
                    {tab.icon}
                  </motion.span>
                  <span className="text-[10px] font-light text-center leading-tight max-w-[60px]">
                    {tab.label}
                  </span>
                </button>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
