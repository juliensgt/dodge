import React from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

interface TabContainerProps {
  children: React.ReactNode[];
}

/**
 * Generic container for tabs that handles mobile and desktop layouts
 * - Desktop: Natural page flow with no scroll management
 * - Mobile: Vertical scroll with fixed height
 */
export default function TabContainer({ children }: TabContainerProps) {
  const isMobile = useIsMobile();

  if (!isMobile) {
    // Desktop - Natural page flow
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 py-6 pb-20">
        {children}
      </div>
    );
  }

  // Mobile - Vertical scroll content (parent container manages dimensions)
  return (
    <div
      className="h-full w-full scrollbar-hide px-2"
      style={{ touchAction: "pan-y" }}
    >
      <div className="space-y-4 py-4 pb-20 w-full">{children}</div>
    </div>
  );
}
