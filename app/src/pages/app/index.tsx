import { useState } from "react";
import { useGradient } from "@/hooks/useGradient";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { AuthLevel } from "@/types/auth/auth";
import AppHeader, { AppTab } from "@/components/layout/AppHeader";
import { AnimatePresence, motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import PlayTab from "@/components/layout/tabs/play/PlayTab";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<AppTab>("play");
  const [direction, setDirection] = useState(0);
  const { getGradient, GradientType } = useGradient();
  const isMobile = useIsMobile();
  const [activeTabContent, setActiveTabContent] = useState<React.ReactNode>(
    <PlayTab onShowGameList={() => {}} />
  );

  const handleTabChange = (tab: AppTab, content: React.ReactNode) => {
    if (tab === activeTab) return;

    // Determine animation direction based on tab order
    const tabOrder = ["play", "shop", "profile"];
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
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl"></div>
        </div>

        <AppHeader
          setActiveTab={setActiveTab}
          setActiveTabContent={setActiveTabContent}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />

        {/* Tab Content with Animation */}
        <div
          className={`overflow-hidden mx-auto ${isMobile ? "pt-14 px-2" : "max-w-7xl"}`}
        >
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
              <main className="relative z-10 mx-auto h-full">
                {activeTabContent}
              </main>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        {!isMobile && (
          <footer
            className={`relative z-10 text-center py-6 mt-8 ${isMobile ? "mb-16" : ""}`}
          >
            <p className="text-white/40 text-sm">© 2025 DODGE</p>
          </footer>
        )}
      </div>
    </AuthGuard>
  );
}
