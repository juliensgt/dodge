import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { GameState } from "@/types/game/game.types";

interface GameTab {
  id: GameState | string; // Allow string for states like END_ROUND not in enum
  content: React.ReactNode;
}

interface GameContainerProps {
  activeState: GameState | string; // Allow string for states like END_ROUND not in enum
  tabs: GameTab[];
}

/**
 * Container for game board states with responsive layout
 * - Desktop: Direct content rendering
 * - Mobile: Only active state mounted (no swipe)
 */
export default function GameContainer({
  activeState,
  tabs,
}: GameContainerProps) {
  const isMobile = useIsMobile();

  // Find active tab
  const activeTab = tabs.find((tab) => tab.id === activeState);

  if (!isMobile) {
    // Desktop - Direct content rendering
    return <>{activeTab?.content}</>;
  }

  // Mobile - Only mount active tab
  return (
    <div className="relative h-full w-full overflow-hidden">
      <AnimatePresence mode="wait">
        {activeTab && (
          <motion.div
            key={activeTab.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="h-full w-full"
          >
            {activeTab.content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
