import { useTranslation } from "@/hooks/useTranslation";
import { useRouter } from "next/router";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShop } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/contexts/AuthContext";
import ProfileTab from "./tabs/ProfileTab";
import ShopTab from "./tabs/ShopTab";
import PlayTab from "./tabs/play/PlayTab";
import { useIsMobile } from "@/hooks/useIsMobile";
import { motion, AnimatePresence } from "framer-motion";

export type AppTab = "play" | "shop" | "profile";

export interface AppCategory {
  id: AppTab;
  label: string;
  icon: React.ReactNode;
  tab: React.ReactNode;
}
interface AppHeaderProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  setActiveTabContent: (tab: React.ReactNode) => void;
  onTabChange?: (tab: AppTab, content: React.ReactNode) => void;
}

export default function AppHeader({
  onTabChange,
  activeTab,
  setActiveTab,
  setActiveTabContent,
}: AppHeaderProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const tabs: AppCategory[] = [
    {
      id: "shop",
      label: t("Boutique"),
      icon: <FontAwesomeIcon icon={faShop} size="lg" />,
      tab: <ShopTab />,
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
      tab: <PlayTab onShowGameList={() => {}} />,
    },
    {
      id: "profile",
      label: t("Profil"),
      icon: <FontAwesomeIcon icon={faUser} size="lg" />,
      tab: <ProfileTab />,
    },
  ];

  // Simulated player stats - in the future this should come from a context or API
  const playerStats = {
    coins: 1250,
  };

  const handleTabClick = (tab: AppCategory) => {
    if (onTabChange) {
      onTabChange(tab.id, tab.tab);
    } else {
      setActiveTab(tab.id);
      setActiveTabContent(tab.tab);
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
        ? "relative -top-4 font-['MT'] font-bold text-sm"
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
            className={`flex ${isMobile ? "h-14" : "h-22"} items-center justify-between`}
          >
            {/* Logo and User Info */}
            <div className="flex gap-4 items-center">
              <Image
                src="/images/logos/dodge_logo.png"
                alt="DODGE Logo"
                width={isMobile ? 40 : 60}
                height={isMobile ? 40 : 60}
                priority
                className="drop-shadow-lg cursor-pointer"
                onClick={() => router.push("/app")}
              />
              <div className="flex flex-col text-white text-lg justify-center">
                <span
                  className={`${isMobile ? "text-sm" : "text-lg"} font-bold`}
                >
                  {user?.name || "Utilisateur"}
                </span>
                <span
                  className={`${isMobile ? "text-xs" : "text-sm"} font-light`}
                >
                  Niveau {user?.level || 1}
                </span>
              </div>
            </div>

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
            <div className="flex items-center gap-3">
              <div
                className={`flex items-center backdrop-blur-md rounded-full border border-yellow-400/30 bg-yellow-500/20 ${
                  isMobile ? "gap-0.5 px-2 py-0.5" : "gap-1 px-3 py-1"
                }`}
              >
                <span
                  className={`text-white ${isMobile ? "text-xs" : "text-xl"} font-light`}
                >
                  {playerStats.coins}
                </span>
                <Image
                  src="/images/logos/dodge_crown.png"
                  alt="Crowns"
                  width={isMobile ? 18 : 35}
                  height={isMobile ? 18 : 35}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Bottom Navigation Bar (Mobile Only) */}
      <AnimatePresence>
        {isMobile && (
          <motion.nav
            key="main-mobile-nav"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-gray-900/85 via-gray-900/80 to-gray-900/75 backdrop-blur-xl border-t border-white/30 shadow-lg"
          >
            <div className="flex justify-around items-center h-16 px-4">
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
                      {renderTabContent(tab, isActive, true)}
                    </motion.span>
                  </button>
                );
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
