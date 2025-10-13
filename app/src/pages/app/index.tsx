import LanguageSelector from "@/components/utils/selectors/LanguageSelector";
import ActionButton from "@/components/utils/buttons/ActionButton";
import { useGradient } from "@/hooks/useGradient";
import { useState } from "react";
import { ColorType } from "@/enums/themes/list/PurpleTheme";
import { useTranslation } from "@/hooks/useTranslation";
import { useRouter } from "next/router";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { AuthLevel } from "@/types/auth/auth";
import GameList from "@/components/game-list/GameList";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"quick" | "list">("list");
  const { t } = useTranslation();
  const { getGradient, GradientType } = useGradient();
  const router = useRouter();

  const handleJoinGame = () => {
    // Redirect to game page - the game will handle player creation via WebSocket
    const gameId = "66c3a1e23c0a6642ee088edc"; // Default game ID
    router.push(`/app/game/${gameId}`);
  };

  const handleJoinGameFromList = (gameId: string) => {
    router.push(`/app/game/${gameId}`);
  };

  const handleSpectateGame = (gameId: string) => {
    router.push(`/app/game/${gameId}?spectate=true`);
  };

  const handleCreateGame = () => {
    router.push("/app/create-game");
  };

  return (
    <AuthGuard level={AuthLevel.USER}>
      <div
        className={`min-h-screen ${getGradient(GradientType.BACKGROUND_MAIN, "to-br")} flex items-center justify-center p-8 font-['MT']`}
      >
        <div className="absolute top-4 right-4 flex gap-4">
          <LanguageSelector />
          <ActionButton
            onClick={() => router.push("/app/shop")}
            label={t("Boutique")}
            color={{ color: ColorType.PRIMARY }}
          />
          <ActionButton
            onClick={() => router.push("/app/profile")}
            label={t("Profil")}
            color={{ color: ColorType.PRIMARY }}
          />
        </div>

        <div className="w-full max-w-6xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-6xl font-bold text-white mb-4">DODGE</h1>
            <p className="text-lg text-white">
              {t("Rejoignez une partie et défiez vos amis !")}
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-1 flex">
              <button
                onClick={() => setActiveTab("quick")}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === "quick"
                    ? "bg-white/20 text-white shadow-lg"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {t("Rejoindre rapidement")}
              </button>
              <button
                onClick={() => setActiveTab("list")}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === "list"
                    ? "bg-white/20 text-white shadow-lg"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {t("Liste des parties")}
              </button>
            </div>
          </div>

          {/* Content */}
          {activeTab === "quick" ? (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md mx-auto shadow-2xl flex flex-col">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <ActionButton
                    onClick={handleCreateGame}
                    label={t("Créer une partie")}
                    gradient={{ gradientType: GradientType.PRIMARY }}
                  />
                  <ActionButton
                    onClick={() => handleJoinGame()}
                    label={t("Rejoindre la partie")}
                    gradient={{ gradientType: GradientType.PRIMARY }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <GameList
              onJoinGame={handleJoinGameFromList}
              onSpectateGame={handleSpectateGame}
              onCreateGame={handleCreateGame}
            />
          )}
        </div>
      </div>
    </AuthGuard>
  );
}
