import { useState, useMemo, useEffect } from "react";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { AuthLevel } from "@/types/auth/auth";
import AppHeader, { AppTab } from "@/components/layout/app/AppHeader";
import { useIsMobile } from "@/hooks/useIsMobile";
import PlayTab from "@/components/layout/app/tabs/PlayTab";
import ShopTab from "@/components/layout/app/tabs/ShopTab";
import CollectionTab from "@/components/layout/app/tabs/CollectionTab";
import ProfileTab from "@/components/layout/app/tabs/ProfileTab";
import AppContainer from "@/components/layout/app/AppContainer";
import { motion } from "framer-motion";
import * as PurpleTheme from "@/enums/themes/list/PurpleTheme";

function DashboardContent() {
  const [activeTab, setActiveTab] = useState<AppTab>("play");
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();

  // Define all tabs with their content (all tabs stay mounted for smooth transitions)
  const appTabs = useMemo(
    () => [
      {
        id: "shop" as AppTab,
        content: <ShopTab />,
      },
      {
        id: "play" as AppTab,
        content: <PlayTab />,
      },
      {
        id: "collection" as AppTab,
        content: <CollectionTab />,
      },
      {
        id: "profile" as AppTab,
        content: <ProfileTab isActive={activeTab === "profile"} />,
      },
    ],
    [activeTab]
  );

  const handleTabChange = (tab: AppTab) => {
    if (tab === activeTab) return;
    setActiveTab(tab);
  };

  // Ensure all tabs are loaded before showing the app
  useEffect(() => {
    // First hide the loading screen
    const hideLoaderTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(hideLoaderTimer);
    };
  }, [appTabs]);

  return (
    <>
      <div
        className={`min-h-screen ${PurpleTheme.getGradient(PurpleTheme.GradientType.BACKGROUND_MAIN, "to-br")} font-['MT'] relative`}
      >
        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-purple-800">
            <div className="flex flex-col items-center gap-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="w-20 h-20 border-6 border-yellow-400 border-t-transparent rounded-full shadow-2xl"
              />
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="font-lucky text-4xl text-white drop-shadow-2xl"
              >
                DODGE
              </motion.div>
            </div>
          </div>
        )}

        {/* App content - hidden during loading, no transitions until loaded */}
        <div
          className={`${isLoading ? "opacity-0 pointer-events-none no-transitions" : "opacity-100"}`}
        >
          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl"></div>
          </div>

          <AppHeader
            setActiveTab={setActiveTab}
            setActiveTabContent={() => {}} // Not used anymore with AppContainer
            activeTab={activeTab}
            onTabChange={(tab) => handleTabChange(tab)}
          />

          {/* Tab Content with AppContainer */}
          <div
            className={`relative z-10 ${isMobile ? "pt-14" : "max-w-7xl mx-auto"}`}
          >
            <AppContainer
              activeTab={activeTab}
              tabs={appTabs}
              onTabChange={handleTabChange}
            />
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
      </div>
    </>
  );
}

export default function Dashboard() {
  return (
    <AuthGuard level={AuthLevel.USER}>
      <DashboardContent />
    </AuthGuard>
  );
}
