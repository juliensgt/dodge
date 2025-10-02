import LanguageSelector from "@/components/utils/selectors/LanguageSelector";
import ThemeSelector from "@/components/utils/selectors/ThemeSelector";
import ActionButton from "@/components/utils/buttons/ActionButton";
import { useGradient } from "@/hooks/useGradient";
import { useState } from "react";
import { ColorType } from "@/enums/themes/list/PurpleTheme";
import CardSkinSelector from "@/components/utils/selectors/CardSkinSelector";
import Modal from "@/components/utils/modals/Modal";
import { useTranslation } from "@/hooks/useTranslation";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { AuthLevel } from "@/types/auth/auth";

export default function Dashboard() {
  const [playerName, setPlayerName] = useState("");
  const [isSkinSelectorOpen, setIsSkinSelectorOpen] = useState(false);
  const { t } = useTranslation();
  const { getGradient, GradientType } = useGradient();
  const { logout } = useAuth();
  const router = useRouter();

  const handleJoinGame = (playerName: string) => {
    if (!playerName.trim()) {
      alert(t("Veuillez entrer un nom de joueur"));
      return;
    }

    // Redirect to game page - the game will handle player creation via WebSocket
    const gameId = "66c3a1e23c0a6642ee088edc"; // Default game ID
    router.push(`/app/game/${gameId}`);
  };

  const openSkinSelector = () => {
    setIsSkinSelectorOpen(true);
  };

  const closeSkinSelector = () => {
    setIsSkinSelectorOpen(false);
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <AuthGuard level={AuthLevel.USER}>
      <div
        className={`min-h-screen ${getGradient(GradientType.BACKGROUND_MAIN, "to-br")} flex items-center justify-center p-8 font-['MT']`}
      >
        <div className="absolute top-4 right-4 flex gap-4">
          <ThemeSelector />
          <LanguageSelector />
          <ActionButton
            onClick={() => openSkinSelector()}
            label={t("Skins")}
            color={{ color: ColorType.SECONDARY }}
          />
          <ActionButton
            onClick={handleLogout}
            label={t("Déconnexion")}
            color={{ color: ColorType.TRANSPARENT }}
          />
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full shadow-2xl flex flex-col">
          <div className="text-center mb-4">
            <h1 className="text-6xl font-bold text-white">DODGE</h1>
            <p className="text-lg text-white">
              {t("Rejoignez une partie et défiez vos amis !")}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <label htmlFor="playerName" className="block text-white/90 mb-1">
                {t("Nom du joueur")}
              </label>
              <input
                id="playerName"
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder={t("Entrez votre nom")}
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="flex flex-col gap-2">
              <ActionButton
                onClick={() => handleJoinGame(playerName)}
                label={t("Rejoindre la partie")}
                gradient={{ gradientType: GradientType.PRIMARY }}
              />
            </div>
          </div>
        </div>

        {/* Modal pour le sélecteur de skins */}
        <Modal
          isOpen={isSkinSelectorOpen}
          onClose={closeSkinSelector}
          title={t("Sélectionner un skin de carte")}
        >
          <CardSkinSelector />
        </Modal>
      </div>
    </AuthGuard>
  );
}
