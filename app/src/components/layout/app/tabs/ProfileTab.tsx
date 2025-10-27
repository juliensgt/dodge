import React, { useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import ProfileTabs, { ProfileTabType } from "@/components/profile/ProfileTabs";
import AccountTab from "@/components/profile/tabs/AccountTab";
import { AnimatePresence, motion } from "framer-motion";

interface ProfileTabProps {
  isActive?: boolean;
}

export default function ProfileTab({ isActive = true }: ProfileTabProps) {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState<ProfileTabType>("profile");
  const [activeTabContent, setActiveTabContent] = useState<React.ReactNode>(
    <AccountTab />
  );
  const [direction, setDirection] = useState(0);

  const handleTabChange = (tab: ProfileTabType, content: React.ReactNode) => {
    if (tab === activeTab) return;

    const tabOrder = ["profile", "settings", "rules", "stats"];
    const currentIndex = tabOrder.indexOf(activeTab);
    const newIndex = tabOrder.indexOf(tab);
    const newDirection = newIndex > currentIndex ? 1 : -1;

    setDirection(newDirection);
    setActiveTab(tab);
    setActiveTabContent(content);
  };

  return (
    <div className={isMobile ? "h-full w-full" : ""}>
      {/* Profile Tabs - Hidden on mobile (it's fixed at bottom now) */}
      {!isMobile && (
        <div className="mb-8 mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ProfileTabs
              setActiveTab={setActiveTab}
              setActiveTabContent={setActiveTabContent}
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />
          </div>
        </div>
      )}

      {/* Mobile - Add the tabs component (only visible when this tab is active) */}
      {isMobile && isActive && (
        <ProfileTabs
          setActiveTab={setActiveTab}
          setActiveTabContent={setActiveTabContent}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      )}

      {/* Content Area */}
      <div className={`overflow-hidden px-6 ${isMobile ? "pb-16" : "pb-8"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeTab}
              custom={direction}
              initial={{
                x: -300,
                opacity: 0,
              }}
              animate={{
                x: 0,
                opacity: 1,
              }}
              exit={{
                x: 300,
                opacity: 0,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.4,
              }}
            >
              {activeTabContent}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
