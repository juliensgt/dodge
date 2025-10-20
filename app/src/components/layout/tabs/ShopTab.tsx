import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ShopTabs, { ShopTab as ShopTabType } from "@/components/shop/ShopTabs";
import ShopOfTheWeek from "@/components/shop/ShopOfTheWeek";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function ShopTab() {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState<ShopTabType>("shop-week");
  const [activeTabContent, setActiveTabContent] = useState<React.ReactNode>(
    <ShopOfTheWeek />
  );
  const [direction, setDirection] = useState(0);

  const handleTabChange = (tab: ShopTabType, content: React.ReactNode) => {
    if (tab === activeTab) return;

    const tabOrder = [
      "shop-week",
      "collections",
      "my-skins",
      "my-themes",
      "buy-coins",
    ];
    const currentIndex = tabOrder.indexOf(activeTab);
    const newIndex = tabOrder.indexOf(tab);
    const newDirection = newIndex > currentIndex ? 1 : -1;

    setDirection(newDirection);
    setActiveTab(tab);
    setActiveTabContent(content);
  };

  return (
    <>
      {/* Shop Tabs - Hidden on mobile (it's fixed at bottom now) */}
      {!isMobile && (
        <div className="mb-8 mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ShopTabs
              setActiveTab={setActiveTab}
              setActiveTabContent={setActiveTabContent}
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />
          </div>
        </div>
      )}

      {/* Mobile - Add the tabs component (it will render as fixed bottom) */}
      {isMobile && (
        <ShopTabs
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
    </>
  );
}
