import { useState, useMemo, useEffect, Suspense, useRef, lazy } from "react";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { AuthLevel } from "@/types/auth/auth";
import AppHeader, { AppTab } from "@/components/layout/app/AppHeader";
import { useIsMobile } from "@/hooks/useIsMobile";
import AppContainer from "@/components/layout/app/AppContainer";
import { motion } from "framer-motion";
import { useRole } from "@/contexts/AuthContext";
import { useCollection } from "@/contexts/CollectionContext";
import LoadingOverlay from "@/components/utils/LoadingOverlay";

// Map des imports dynamiques des tabs (React.lazy gère déjà le cache interne)
const tabImports: Record<
  AppTab,
  () => Promise<{ default: React.ComponentType<Record<string, unknown>> }>
> = {
  shop: () => import("@/components/layout/app/tabs/ShopTab"),
  collection: () => import("@/components/layout/app/tabs/CollectionTab"),
  play: () => import("@/components/layout/app/tabs/PlayTab"),
  profile: () => import("@/components/layout/app/tabs/ProfileTab"),
  admin: () => import("@/components/layout/app/tabs/AdminTab"),
};

function DashboardContent() {
  const [activeTab, setActiveTab] = useState<AppTab>("play");
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();
  const { isAdmin } = useRole();
  const { getCurrentTheme } = useCollection();

  // Référence stable pour les composants lazy (ne jamais recréer)
  // React.lazy gère déjà le cache interne, donc on peut l'utiliser directement
  const tabComponentsRef = useRef<
    Record<string, React.ComponentType<Record<string, unknown>>>
  >({});

  // Initialiser les composants lazy une seule fois
  if (!tabComponentsRef.current.shop) {
    tabComponentsRef.current.shop = lazy(tabImports.shop);
    tabComponentsRef.current.collection = lazy(tabImports.collection);
    tabComponentsRef.current.play = lazy(tabImports.play);
    tabComponentsRef.current.profile = lazy(tabImports.profile);
    if (isAdmin) {
      tabComponentsRef.current.admin = lazy(tabImports.admin);
    }
  }

  // Précharger les tabs et masquer le loader quand ils sont chargés
  useEffect(() => {
    let isMounted = true;
    const timeoutId = setTimeout(() => {
      if (isMounted) {
        setIsLoading(false);
      }
    }, 10000); // Timeout de sécurité maximal

    const loadTabs = async () => {
      try {
        // Sur mobile, précharger tous les tabs car ils restent montés
        // Sur desktop, charger juste le tab actif
        const tabsToLoad: AppTab[] = isMobile
          ? ["shop", "collection", "play", "profile"]
          : [activeTab];

        if (isMobile && isAdmin) {
          tabsToLoad.push("admin");
        }

        // Attendre que tous les imports soient résolus
        await Promise.all(tabsToLoad.map((tab) => tabImports[tab]()));

        // Masquer le loader dès que les tabs sont chargés
        if (isMounted) {
          setTimeout(() => {
            clearTimeout(timeoutId);
            setIsLoading(false);
          }, 1000);
        }
      } catch (error) {
        console.warn("Error loading tabs:", error);
      }
    };

    loadTabs();

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [isMobile, isAdmin, activeTab]);

  // Mémoriser le contenu des tabs de manière stable
  // Le JSX est recréé mais les composants lazy sont stables grâce à useRef
  const appTabs = useMemo(() => {
    const ShopTabComponent = tabComponentsRef.current.shop;
    const CollectionTabComponent = tabComponentsRef.current.collection;
    const PlayTabComponent = tabComponentsRef.current.play;
    const ProfileTabComponent = tabComponentsRef.current.profile;

    const tabs: Array<{
      id: AppTab;
      content: React.ReactNode;
    }> = [
      {
        id: "shop" as AppTab,
        content: (
          <Suspense fallback={<TabFallback />}>
            <ShopTabComponent />
          </Suspense>
        ),
      },
      {
        id: "collection" as AppTab,
        content: (
          <Suspense fallback={<TabFallback />}>
            <CollectionTabComponent />
          </Suspense>
        ),
      },
      {
        id: "play" as AppTab,
        content: (
          <Suspense fallback={<TabFallback />}>
            <PlayTabComponent />
          </Suspense>
        ),
      },
      {
        id: "profile" as AppTab,
        content: (
          <Suspense fallback={<TabFallback />}>
            <ProfileTabComponent isActive={activeTab === "profile"} />
          </Suspense>
        ),
      },
    ];

    if (isAdmin && tabComponentsRef.current.admin) {
      const AdminTabComponent = tabComponentsRef.current.admin;
      tabs.push({
        id: "admin" as AppTab,
        content: (
          <Suspense fallback={<TabFallback />}>
            <AdminTabComponent />
          </Suspense>
        ),
      });
    }

    return tabs;
  }, [activeTab, isAdmin]);

  const handleTabChange = (tab: AppTab) => {
    if (tab === activeTab) return;
    setActiveTab(tab);
  };

  return (
    <>
      <div
        className={`min-h-screen ${getCurrentTheme().getGradient(getCurrentTheme().GradientType.BACKGROUND_MAIN, "to-br")} font-['MT'] relative`}
      >
        {/* Loading overlay */}
        <LoadingOverlay isLoading={isLoading} />

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

// Fallback minimal pour les tabs en chargement
function TabFallback() {
  return (
    <div className="flex items-center justify-center h-full min-h-[400px]">
      <div className="flex flex-col items-center gap-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
          className="w-8 h-8 border-4 border-purple-400 border-t-transparent rounded-full"
        />
        <p className="text-white/60 text-sm">Chargement...</p>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <AuthGuard level={AuthLevel.USER}>
      <DashboardContent />
    </AuthGuard>
  );
}
