import React, { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { useAuth } from "@/contexts/AuthContext";
import ActionButton from "@/components/utils/buttons/ActionButton";
import { ColorType } from "@/enums/themes/list/PurpleTheme";
import { useGradient } from "@/hooks/useGradient";
import {
  faBell,
  faLanguage,
  faPalette,
  faVolumeUp,
  faShield,
  faSignOutAlt,
  faSave,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SettingsTab() {
  const { t } = useTranslation();
  const { logout } = useAuth();
  const { GradientType } = useGradient();
  const [settings, setSettings] = useState({
    notifications: {
      gameInvites: true,
      achievements: true,
      updates: false,
      marketing: false,
    },
    language: "fr",
    theme: "auto",
    sound: {
      master: 80,
      music: 60,
      effects: 90,
      voice: 70,
    },
    privacy: {
      showOnlineStatus: true,
      allowFriendRequests: true,
      showGameHistory: false,
    },
  });
  const [saved, setSaved] = useState(false);

  const handleSettingChange = (
    category: string,
    key: string,
    value: string | number | boolean
  ) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...(prev[category as keyof typeof prev] as Record<string, unknown>),
        [key]: value,
      },
    }));
    setSaved(false);
  };

  const handleSaveSettings = () => {
    // In a real app, you would save these settings to your backend
    console.log("Saving settings:", settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Notifications Settings */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <FontAwesomeIcon icon={faBell} />
          {t("Notifications")}
        </h2>

        <div className="space-y-4">
          {Object.entries(settings.notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <label className="text-white font-medium">
                {t(
                  key === "gameInvites"
                    ? "Invitations de jeu"
                    : key === "achievements"
                      ? "Succès et récompenses"
                      : key === "updates"
                        ? "Mises à jour du jeu"
                        : "Communications marketing"
                )}
              </label>
              <button
                onClick={() =>
                  handleSettingChange("notifications", key, !value)
                }
                className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                  value ? "bg-blue-500" : "bg-gray-600"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                    value ? "translate-x-6" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Language & Theme Settings */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <FontAwesomeIcon icon={faLanguage} />
          {t("Apparence")}
        </h2>

        <div className="space-y-6">
          {/* Language */}
          <div>
            <label className="block text-white font-medium mb-3">
              {t("Langue")}
            </label>
            <select
              value={settings.language}
              onChange={(e) =>
                handleSettingChange("language", "language", e.target.value)
              }
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="fr">Français</option>
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="de">Deutsch</option>
              <option value="it">Italiano</option>
              <option value="pt">Português</option>
            </select>
          </div>

          {/* Theme */}
          <div>
            <label className="block text-white font-medium mb-3">
              {t("Thème")}
            </label>
            <div className="flex gap-4">
              {[
                { value: "light", label: t("Clair"), icon: faSun },
                { value: "dark", label: t("Sombre"), icon: faMoon },
                { value: "auto", label: t("Automatique"), icon: faPalette },
              ].map(({ value, label, icon }) => (
                <button
                  key={value}
                  onClick={() => handleSettingChange("theme", "theme", value)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-all ${
                    settings.theme === value
                      ? "bg-blue-500/20 border-blue-400 text-blue-300"
                      : "bg-white/5 border-white/20 text-white/70 hover:bg-white/10"
                  }`}
                >
                  <FontAwesomeIcon icon={icon} />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sound Settings */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <FontAwesomeIcon icon={faVolumeUp} />
          {t("Audio")}
        </h2>

        <div className="space-y-4">
          {Object.entries(settings.sound).map(([key, value]) => (
            <div key={key}>
              <div className="flex justify-between items-center mb-2">
                <label className="text-white font-medium">
                  {t(
                    key === "master"
                      ? "Volume principal"
                      : key === "music"
                        ? "Musique"
                        : key === "effects"
                          ? "Effets sonores"
                          : "Voix"
                  )}
                </label>
                <span className="text-white/70">{value}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={value}
                onChange={(e) =>
                  handleSettingChange("sound", key, parseInt(e.target.value))
                }
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <FontAwesomeIcon icon={faShield} />
          {t("Confidentialité")}
        </h2>

        <div className="space-y-4">
          {Object.entries(settings.privacy).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <label className="text-white font-medium">
                {t(
                  key === "showOnlineStatus"
                    ? "Afficher mon statut en ligne"
                    : key === "allowFriendRequests"
                      ? "Autoriser les demandes d'ami"
                      : "Afficher l'historique de jeu"
                )}
              </label>
              <button
                onClick={() => handleSettingChange("privacy", key, !value)}
                className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                  value ? "bg-blue-500" : "bg-gray-600"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                    value ? "translate-x-6" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <ActionButton
          onClick={handleSaveSettings}
          label={saved ? t("Sauvegardé !") : t("Sauvegarder les paramètres")}
          leftSection={<FontAwesomeIcon icon={faSave} />}
          gradient={{ gradientType: GradientType.PRIMARY }}
        />

        <ActionButton
          onClick={handleLogout}
          label={t("Se déconnecter")}
          leftSection={<FontAwesomeIcon icon={faSignOutAlt} />}
          color={{ color: ColorType.TRANSPARENT }}
        />
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid white;
        }

        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid white;
        }
      `}</style>
    </div>
  );
}
