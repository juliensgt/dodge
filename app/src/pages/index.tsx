import LanguageSelector from "@/components/utils/selectors/LanguageSelector";
import ThemeSelector from "@/components/utils/selectors/ThemeSelector";
import ActionButton from "@/components/utils/buttons/ActionButton";
import { useGradient } from "@/hooks/useGradient";
import { ColorType } from "@/enums/themes/list/PurpleTheme";
import { useTranslation } from "@/hooks/useTranslation";
import { useRouter } from "next/router";
import { AuthStatus } from "@/components/auth/AuthStatus";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { AuthLevel } from "@/types/auth/auth";

export default function Welcome() {
  const { t } = useTranslation();
  const { getGradient, GradientType } = useGradient();
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        // User is authenticated, redirect to app
        router.push("/app");
      }
    }
  }, [isAuthenticated, loading, router]);

  const handleLogin = () => {
    router.push("/login");
  };

  const handlePlayAsGuest = () => {
    //router.push("/");
  };

  return (
    <AuthGuard level={AuthLevel.PUBLIC}>
      <div
        className={`min-h-screen ${getGradient(GradientType.BACKGROUND_MAIN, "to-br")} flex items-center justify-center p-8 font-['MT']`}
      >
        <AuthStatus />
        <div className="absolute top-4 right-4 flex gap-4">
          <ThemeSelector />
          <LanguageSelector />
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full shadow-2xl flex flex-col">
          <div className="text-center mb-8">
            <h1 className="text-6xl font-bold text-white">DODGE</h1>
            <p className="text-lg text-white mt-4">
              {t("Bienvenue dans le jeu de cartes le plus addictif !")}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <ActionButton
              onClick={handleLogin}
              label={t("Se connecter")}
              gradient={{ gradientType: GradientType.PRIMARY }}
            />

            <ActionButton
              onClick={handlePlayAsGuest}
              label={t("Jouer en invité")}
              color={{ color: ColorType.SECONDARY }}
            />
          </div>

          <div className="mt-8 text-center">
            <p className="text-white/70 text-sm">
              {t(
                "Connectez-vous pour sauvegarder vos parties et personnaliser votre expérience"
              )}
            </p>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
