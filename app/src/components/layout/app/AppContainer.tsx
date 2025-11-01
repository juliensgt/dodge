import React, { useState, useEffect, useRef } from "react";
import { motion, PanInfo } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { AppTab } from "./AppHeader";

interface AppContainerProps {
  activeTab: AppTab;
  tabs: Array<{
    id: AppTab;
    content: React.ReactNode;
  }>;
  onTabChange?: (tabId: AppTab) => void;
}

/**
 * Container for main app tabs with horizontal drag/swipe on mobile
 * - Desktop: Direct content rendering
 * - Mobile: Horizontal swipe between tabs (all tabs stay mounted)
 */
export default function AppContainer({
  activeTab,
  tabs,
  onTabChange,
}: AppContainerProps) {
  const isMobile = useIsMobile();
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  // Sync current slide with active tab changes from header and reset scroll
  useEffect(() => {
    const newIndex = tabs.findIndex((tab) => tab.id === activeTab);
    if (newIndex !== -1 && newIndex !== currentSlide) {
      setCurrentSlide(newIndex);
    }
  }, [activeTab, tabs, currentSlide]);

  // Reset scroll when currentSlide changes (from swipe or header click)
  useEffect(() => {
    const scrollContainer = scrollRefs.current[currentSlide];
    if (scrollContainer) {
      scrollContainer.scrollTop = 0;
    }
  }, [currentSlide]);

  // Navigate to next/previous slide
  const paginate = (newDirection: number) => {
    const newSlide = currentSlide + newDirection;

    if (newSlide >= 0 && newSlide < tabs.length) {
      setCurrentSlide(newSlide);

      // Notify parent to update active tab
      if (onTabChange && tabs[newSlide]) {
        onTabChange(tabs[newSlide].id);
      }
    }
  };

  // Handle drag end to determine if we should change slides
  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    // Simple threshold: just check distance and velocity
    if (info.offset.x < -50 || info.velocity.x < -500) {
      paginate(1); // Swipe left
    } else if (info.offset.x > 50 || info.velocity.x > 500) {
      paginate(-1); // Swipe right
    }
  };

  if (!isMobile) {
    // Desktop - Direct content rendering
    return <>{tabs[currentSlide]?.content}</>;
  }

  // Mobile - All tabs mounted, positioned absolutely, slide via transform
  return (
    <div className="relative h-[calc(100vh-3.5rem-3.75rem)] w-full overflow-hidden">
      {tabs.map((tab, index) => (
        <motion.div
          key={tab.id}
          drag={index === currentSlide ? "x" : false}
          dragConstraints={{ left: -0, right: 0 }}
          onDragEnd={index === currentSlide ? handleDragEnd : undefined}
          animate={{
            x: `${(index - currentSlide) * 100}%`,
          }}
          transition={{
            type: "tween",
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1], // ease-out pour animation plus fluide
          }}
          className="absolute inset-0"
          style={{
            pointerEvents: index === currentSlide ? "auto" : "none",
            willChange: "transform",
          }}
        >
          <div
            ref={(el) => {
              scrollRefs.current[index] = el;
            }}
            className="h-full w-full overflow-y-auto scrollbar-hide px-2"
            style={{ touchAction: "pan-y" }}
          >
            {tab.content}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
