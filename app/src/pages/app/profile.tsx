import React, { useState } from "react";
import { useGradient } from "@/hooks/useGradient";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { AuthLevel } from "@/types/auth/auth";
import { useRouter } from "next/router";
import ProfileHeader from "@/components/profile/ProfileHeader";
import { useIsMobile } from "@/hooks/useIsMobile";
import ProfileTabs, { ProfileTabType } from "@/components/profile/ProfileTabs";
import AccountTab from "@/components/profile/tabs/AccountTab";
import { AnimatePresence, motion } from "framer-motion";

export default function Profile() {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState<ProfileTabType>("profile");
  const [activeTabContent, setActiveTabContent] = useState<React.ReactNode>(
    <AccountTab />
  );
  const [direction, setDirection] = useState(0);
  const { getGradient, GradientType } = useGradient();
  const router = useRouter();

  const handleBackToApp = () => {
    router.back();
  };

  const handleTabChange = (tab: ProfileTabType, content: React.ReactNode) => {
    if (tab === activeTab) return;

    // Determine animation direction based on tab order
    const tabOrder = ["profile", "settings", "rules", "stats"];
    const currentIndex = tabOrder.indexOf(activeTab);
    const newIndex = tabOrder.indexOf(tab);
    const newDirection = newIndex > currentIndex ? 1 : -1;

    setDirection(newDirection);
    setActiveTab(tab);
    setActiveTabContent(content);
  };

  return (
    <AuthGuard level={AuthLevel.USER}>
      <div
        className={`min-h-screen ${getGradient(GradientType.BACKGROUND_MAIN, "to-br")} font-['MT']`}
      >
        <ProfileHeader handleBackToApp={handleBackToApp} />
        <div className={`${isMobile ? "mb-4" : "mb-8"}`}>
          <ProfileTabs
            setActiveTab={setActiveTab}
            setActiveTabContent={setActiveTabContent}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        </div>

        {/* Content with Framer Motion slide animation */}
        <div className={`overflow-hidden px-6 pb-8`}>
          <div className="max-w-7xl mx-auto">
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
    </AuthGuard>
  );
}
