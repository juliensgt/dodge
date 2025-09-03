import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import Chat from "./chat/Chat";
import Settings from "./settings/Settings";
import Ranking from "./ranking/Ranking";
import { useIsMobile } from "@/hooks/useIsMobile";

type TabType = "chat" | "settings" | "ranking";

export default function GameTabs() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<TabType>("chat");
  const isMobile = useIsMobile();

  const tabs = [
    { id: "chat" as TabType, label: t("Chat"), icon: "💬" },
    { id: "settings" as TabType, label: t("Paramètres"), icon: "⚙️" },
    { id: "ranking" as TabType, label: t("Classement"), icon: "🏆" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "chat":
        return <Chat />;
      case "settings":
        return <Settings />;
      case "ranking":
        return <Ranking />;
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col font-['MT'] select-none">
      {/* Navigation des onglets */}
      <div className="flex border-b border-[var(--action-chat-border-color)] bg-[var(--action-chat-background-color)]/25">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-3 py-3 text-sm font-medium relative ${
              activeTab === tab.id
                ? "text-[var(--action-choice-active-color)] border-b-2 border-[var(--action-choice-active-color)] bg-[var(--action-chat-background-color)]/30"
                : "text-[var(--action-chat-secondary-text-color)] hover:text-[var(--action-chat-primary-text-color)] hover:bg-[var(--action-chat-background-color)]/20"
            }`}
          >
            <div className="flex items-center justify-center gap-1">
              <span className="text-xs">{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Contenu des onglets */}
      <div
        className={`flex-1 p-4 overflow-hidden ${
          isMobile ? "bg-[var(--primary-color)]/80" : "bg-[var(--text-color)]/5"
        }`}
      >
        {renderTabContent()}
      </div>
    </div>
  );
}
