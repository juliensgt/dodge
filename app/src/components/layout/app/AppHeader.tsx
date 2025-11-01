import { useTranslation } from "@/hooks/useTranslation";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserShield } from "@fortawesome/free-solid-svg-icons";
import { useIsMobile } from "@/hooks/useIsMobile";
import { motion, AnimatePresence } from "framer-motion";
import CrownCounter from "./counter/CrownCounter";
import CoinsCounter from "./counter/CoinsCounter";
import { useRole } from "@/contexts/AuthContext";

export type AppTab = "shop" | "collection" | "play" | "profile" | "admin";

export interface AppCategory {
  id: AppTab;
  label: string;
  icon: React.ReactNode;
}
interface AppHeaderProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  setActiveTabContent: (tab: React.ReactNode) => void;
  onTabChange?: (tab: AppTab) => void;
}

export default function AppHeader({
  onTabChange,
  activeTab,
  setActiveTab,
}: AppHeaderProps) {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const { isAdmin } = useRole();
  const tabs: AppCategory[] = [
    {
      id: "shop",
      label: t("Boutique"),
      icon: (
        <Image
          src="/images/icons/shop.png"
          alt="Boutique"
          width={isMobile ? 50 : 55}
          height={isMobile ? 50 : 55}
          className="drop-shadow-lg"
        />
      ),
    },
    {
      id: "collection",
      label: t("Collection"),
      icon: (
        <Image
          src="/images/icons/quest.png"
          alt="Collection"
          width={isMobile ? 50 : 55}
          height={isMobile ? 50 : 55}
          className="drop-shadow-lg"
        />
      ),
    },
    {
      id: "play",
      label: t("Jouer"),
      icon: (
        <Image
          src="/images/icons/play.png"
          alt="Jouer"
          width={isMobile ? 55 : 65}
          height={isMobile ? 55 : 65}
          className="drop-shadow-lg"
        />
      ),
    },
    {
      id: "profile",
      label: t("Profil"),
      icon: <FontAwesomeIcon icon={faUser} size="lg" />,
    },
    ...(isAdmin
      ? [
          {
            id: "admin" as AppTab,
            label: t("Admin"),
            icon: <FontAwesomeIcon icon={faUserShield} size="lg" />,
          },
        ]
      : []),
  ];

  const handleTabClick = (tab: AppCategory) => {
    if (onTabChange) {
      onTabChange(tab.id);
    } else {
      setActiveTab(tab.id);
    }
  };

  const renderTabContent = (
    tab: AppCategory,
    isActive: boolean,
    isMobileNav = false
  ) => {
    const showLabel = !isMobileNav || isActive;
    const labelClass =
      isMobileNav && isActive
        ? "relative -top-4 font-['MT'] font-bold text-xs"
        : "font-['MT'] font-bold text-sm";
    const iconClass = isMobileNav && isActive ? "relative -top-2" : "";
    const gap = isMobileNav && isActive ? "gap-1" : "";

    return (
      <div className={`flex flex-col items-center justify-center ${gap}`}>
        <span className={iconClass}>{tab.icon}</span>
        {showLabel && <span className={labelClass}>{tab.label}</span>}
      </div>
    );
  };

  return (
    <>
      {/* Top Header */}
      <header
        className={`${isMobile ? "fixed top-0 left-0 right-0" : "relative"} z-50 bg-white/10 backdrop-blur-md border-b border-white/20`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex ${isMobile ? "h-12" : "h-22"} items-center justify-between`}
          >
            {/* Navigation Actions - Centered (Desktop Only) */}
            {!isMobile && (
              <div className="flex gap-6 absolute left-1/2 transform -translate-x-1/2 text-white">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleTabClick(tab)}
                      className={`flex items-center justify-center transition-all duration-200 flex-1 ${
                        isActive ? "text-yellow-400" : "text-white/80"
                      }`}
                    >
                      <motion.span
                        animate={
                          isActive ? { scale: [1, 1.15, 1.1] } : { scale: 1 }
                        }
                        transition={{ duration: 0.3 }}
                      >
                        {renderTabContent(tab, isActive, false)}
                      </motion.span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Right Side - Crowns Counter */}
            <span
              className={`flex items-center gap-2 text-white font-bold ${isMobile ? "text-lg" : "text-2xl"}`}
            >
              <Image
                src="/images/logos/dodge_head_logo.png"
                alt="Dodge"
                width={isMobile ? 38 : 60}
                height={isMobile ? 38 : 60}
                className="relative drop-shadow-lg -rotate-12"
              />
              <span
                className={`relative top-1 -left-1 font-lucky font-bold shadow-4xl ${isMobile ? "text-2xl" : "text-3xl"}`}
              >
                DODGE
              </span>
            </span>
            <div
              className={`flex items-center ${isMobile ? "gap-5" : "gap-6"}`}
            >
              <CoinsCounter />
              <CrownCounter />
            </div>
          </div>
        </div>
      </header>

      {/* Bottom Navigation Bar (Mobile Only) */}
      <AnimatePresence>
        {isMobile && (
          <nav className="fixed bottom-0 left-0 right-0 z-50 bg-blue-900/95 backdrop-blur-md border-t border-white/20">
            <div className="flex items-stretch h-18">
              {tabs.map((tab, index) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab)}
                    className={`flex items-start justify-center transition-all duration-200 flex-1 h-full border-r border-l ${
                      isActive
                        ? "text-white bg-gradient-to-t from-white/30 to-white/5 border-white/30 shadow-[inset_0_2px_2px_-1px_rgba(255,255,255,0.4)]"
                        : "bg-white/5 border-white/10"
                    } ${index === 0 ? "border-l-0" : ""} ${index === tabs.length - 1 ? "border-r-0" : ""}`}
                  >
                    <motion.span
                      animate={
                        isActive ? { scale: [1, 1.15, 1.1] } : { scale: 1 }
                      }
                      transition={{ duration: 0.3 }}
                    >
                      {renderTabContent(tab, isActive, true)}
                    </motion.span>
                  </button>
                );
              })}
            </div>
          </nav>
        )}
      </AnimatePresence>
    </>
  );
}
