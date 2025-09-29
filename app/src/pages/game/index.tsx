import { useEffect } from "react";
import { useRouter } from "next/router";
import BoardGame from "@/components/game/BoardGame";
import { useGradient } from "@/hooks/useGradient";
import { useGameConnection } from "@/hooks/useGameConnection";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { AuthLevel } from "@/types/auth/auth";
import { useAuth } from "@/contexts/AuthContext";
import ActionButton from "@/components/utils/buttons/ActionButton";
import { ColorType } from "@/enums/themes/list/PurpleTheme";
import { useTranslation } from "@/hooks/useTranslation";

export default function Game() {
  const { getGradient, GradientType } = useGradient();
  const { loadStoredGame } = useGameConnection();
  const { isGameReady, loading, logout } = useAuth();
  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    console.log("Game page mounted");

    // Load stored game data
    const hasStoredGame = loadStoredGame();

    if (!hasStoredGame) {
      // If no stored game, redirect to dashboard
      console.log("No stored game, redirecting to dashboard");
      router.push("/dashboard");
    }
  }, [loadStoredGame, router]);

  // Redirect to dashboard if not game ready
  useEffect(() => {
    if (!loading && !isGameReady) {
      router.push("/dashboard");
    }
  }, [isGameReady, loading, router]);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <AuthGuard level={AuthLevel.GAME}>
      <div
        className={`w-full min-h-screen ${getGradient(GradientType.BACKGROUND_MAIN, "to-br")} relative`}
      >
        <div className="absolute top-4 right-4 z-10">
          <ActionButton
            onClick={handleLogout}
            label={t("Déconnexion")}
            color={{ color: ColorType.TRANSPARENT }}
          />
        </div>
        <BoardGame />
      </div>
    </AuthGuard>
  );
}
