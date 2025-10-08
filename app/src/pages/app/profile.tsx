import React, { useState, useEffect } from "react";
import { useGradient } from "@/hooks/useGradient";
import { useTranslation } from "@/hooks/useTranslation";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { AuthLevel } from "@/types/auth/auth";
import { useRouter } from "next/router";
import ActionButton from "@/components/utils/buttons/ActionButton";
import { ColorType } from "@/enums/themes/list/PurpleTheme";
import {
  faUser,
  faCog,
  faFileContract,
  faChartBar,
  faSignOutAlt,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ProfileTab,
  SettingsTab,
  RulesTab,
  AccountTab,
} from "@/components/profile";

type ProfileTabType = "profile" | "settings" | "rules" | "account";

interface ProfileCategory {
  id: ProfileTabType;
  label: string;
  icon: React.ReactNode;
  tab: React.ReactNode;
}

export default function Profile() {
  const [activeTab, setActiveTab] = useState<ProfileTabType>("profile");
  const { t } = useTranslation();
  const { getGradient, GradientType } = useGradient();
  const router = useRouter();

  const handleBackToApp = () => {
    router.back();
  };

  const tabs: ProfileCategory[] = [
    {
      id: "profile",
      label: t("Profil"),
      icon: <FontAwesomeIcon icon={faUser} size="lg" />,
      tab: <ProfileTab />,
    },
    {
      id: "settings",
      label: t("Paramètres"),
      icon: <FontAwesomeIcon icon={faCog} size="lg" />,
      tab: <SettingsTab />,
    },
    {
      id: "account",
      label: t("Compte"),
      icon: <FontAwesomeIcon icon={faChartBar} size="lg" />,
      tab: <AccountTab />,
    },
    {
      id: "rules",
      label: t("Règles & CGU"),
      icon: <FontAwesomeIcon icon={faFileContract} size="lg" />,
      tab: <RulesTab />,
    },
  ];

  const renderTabContent = () => {
    return tabs.find((tab) => tab.id === activeTab)?.tab;
  };

  return (
    <AuthGuard level={AuthLevel.USER}>
      <div
        className={`min-h-screen ${getGradient(GradientType.BACKGROUND_MAIN, "to-br")} font-['MT']`}
      >
        {/* Header */}
        <div className="relative">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent"></div>

          {/* Top navigation */}
          <div className="relative z-10 flex justify-between items-center p-4">
            <div className="flex items-center gap-4">
              <ActionButton
                onClick={handleBackToApp}
                label={t("← Retour")}
                color={{ color: ColorType.TRANSPARENT }}
              />
            </div>
            {/* Security indicator */}
            <div className="inline-flex items-center gap-2 bg-green-500/20 backdrop-blur-lg rounded-full px-4 py-3 border border-green-400/30">
              <span className="text-2xl">
                <FontAwesomeIcon icon={faShieldAlt} color="#10b981" />
              </span>
              <span className="text-white font-bold text-xl">
                {t("Sécurisé")}
              </span>
            </div>
          </div>

          {/* Profile title */}
          <div className="relative z-10 text-center pb-4">
            <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-2xl">
              {t("PROFIL")}
            </h1>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 mb-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-2 flex flex-wrap justify-center gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-white/20 text-white shadow-lg scale-105"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-8">
          <div className="max-w-7xl mx-auto">{renderTabContent()}</div>
        </div>
      </div>
    </AuthGuard>
  );
}
