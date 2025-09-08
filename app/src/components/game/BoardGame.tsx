import { useState } from "react";
import Board from "@/components/game/board/Board";
import GameTabs from "@/components/game/tabs/GameTabs";
import ResizableSidebar from "@/components/utils/sidebar/ResizableSidebar";
import MobileSidebarButton from "@/components/utils/sidebar/MobileSidebarButton";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useGameStore } from "@/store/game";

export default function BoardGame() {
  const [sidebarWidth, setSidebarWidth] = useState(25);
  const isMobile = useIsMobile();
  const game = useGameStore();

  const handleSidebarToggle = () => {
    setSidebarWidth(sidebarWidth > 0 ? 0 : 25);
  };

  return (
    <div className="h-screen w-full select-none">
      {isMobile && (
        <MobileSidebarButton isOpen={false} onToggle={handleSidebarToggle} />
      )}

      <div className={`flex flex-row gap-2.5 p-2.5 h-full`}>
        <div className="flex flex-1 min-w-0">
          <Board />
        </div>

        {!isMobile && (
          <ResizableSidebar
            value={sidebarWidth}
            onChange={setSidebarWidth}
            isMobile={false}
          >
            <GameTabs />
          </ResizableSidebar>
        )}
      </div>

      {isMobile && (
        <ResizableSidebar
          value={sidebarWidth}
          onChange={setSidebarWidth}
          isMobile={true}
          isOpen={sidebarWidth > 0}
        >
          <GameTabs />
        </ResizableSidebar>
      )}
    </div>
  );
}
