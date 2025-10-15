import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import Chat from "./chat/Chat";
import Settings from "./settings/Settings";
import Ranking from "./ranking/Ranking";
import { useIsMobile } from "@/hooks/useIsMobile";
import {
  faGear,
  faMessage,
  faTrophy,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AdminTab from "./admin/AdminTab";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/auth/user.types";

type TabType = "chat" | "settings" | "ranking" | "admin";

export default function GameTabs() {
  const { user } = useAuth();
  const isAdmin = user?.role === UserRole.ADMIN;
  const [activeTab, setActiveTab] = useState<TabType>("chat");
  const isMobile = useIsMobile();

  const tabs = [
    {
      id: "chat" as TabType,
      label: "",
      icon: <FontAwesomeIcon icon={faMessage} size="xl" color="#ffffff" />,
    },
    {
      id: "settings" as TabType,
      label: "",
      icon: <FontAwesomeIcon icon={faGear} size="xl" color="#ffffff" />,
    },
    {
      id: "ranking" as TabType,
      label: "",
      icon: <FontAwesomeIcon icon={faTrophy} size="xl" color="#ffffff" />,
    },
    ...(isAdmin
      ? [
          {
            id: "admin" as TabType,
            label: "",
            icon: (
              <FontAwesomeIcon icon={faUserShield} size="xl" color="#ffffff" />
            ),
          },
        ]
      : []),
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "chat":
        return <Chat />;
      case "settings":
        return <Settings />;
      case "ranking":
        return <Ranking />;
      case "admin":
        if (!isAdmin) return null;
        return <AdminTab />;
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col font-['MT'] select-none">
      {/* Navigation des onglets */}
      <div className="flex border-b border-[var(--text-color)]/10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-3 py-3 text-sm font-medium relative ${
              activeTab === tab.id
                ? "text-[var(--action-choice-active-color)] border-b-2 border-[var(--action-choice-active-color)]"
                : "text-[var(--action-chat-secondary-text-color)] hover:text-[var(--action-chat-primary-text-color)]"
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
        className={`flex-1 p-4 overflow-hidden ${isMobile && "bg-[var(--primary-color)]/80"}`}
      >
        {renderTabContent()}
      </div>
    </div>
  );
}
