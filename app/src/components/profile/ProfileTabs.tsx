import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "@/hooks/useTranslation";
import { useIsMobile } from "@/hooks/useIsMobile";
import AccountTab from "./tabs/AccountTab";
import SettingsTab from "./tabs/SettingsTab";
import StatsTab from "./tabs/StatsTab";
import RulesTab from "./tabs/RulesTab";
import { motion, AnimatePresence } from "framer-motion";

import {
  faUser,
  faCog,
  faGamepad,
  faFileContract,
} from "@fortawesome/free-solid-svg-icons";
interface ProfileTabsProps {
  activeTab: ProfileTabType;
  setActiveTab: (tab: ProfileTabType) => void;
  setActiveTabContent: (tab: React.ReactNode) => void;
  onTabChange?: (tab: ProfileTabType, content: React.ReactNode) => void;
}

export type ProfileTabType = "profile" | "settings" | "rules" | "stats";

interface ProfileCategory {
  id: ProfileTabType;
  label: string;
  icon: React.ReactNode;
  tab: React.ReactNode;
}

export default function ProfileTabs({
  activeTab,
  setActiveTab,
  setActiveTabContent,
  onTabChange,
}: ProfileTabsProps) {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const tabs: ProfileCategory[] = [
    {
      id: "profile",
      label: t("Profil"),
      icon: <FontAwesomeIcon icon={faUser} size="lg" />,
      tab: <AccountTab />,
    },
    {
      id: "stats",
      label: t("Vos statistiques"),
      icon: <FontAwesomeIcon icon={faGamepad} size="lg" />,
      tab: <StatsTab />,
    },
    {
      id: "settings",
      label: t("Paramètres"),
      icon: <FontAwesomeIcon icon={faCog} size="lg" />,
      tab: <SettingsTab />,
    },
    {
      id: "rules",
      label: t("Règles & CGU"),
      icon: <FontAwesomeIcon icon={faFileContract} size="lg" />,
      tab: <RulesTab />,
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
            key="profile-mobile-nav"
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
            <div className="flex justify-around items-center h-14 px-2">
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
                  className={`flex flex-col items-center justify-center gap-0.5 transition-all duration-200 flex-1 ${
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
                  <span className="text-[10px] font-light text-center leading-tight max-w-[70px]">
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
