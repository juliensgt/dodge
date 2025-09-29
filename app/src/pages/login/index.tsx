import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { authService } from "@/services/auth.service";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { AuthLevel } from "@/types/auth/auth";
import { useGradient } from "@/hooks/useGradient";
import { useTranslation } from "@/hooks/useTranslation";
import ActionButton from "@/components/utils/buttons/ActionButton";
import { ColorType } from "@/enums/themes/list/PurpleTheme";
import LanguageSelector from "@/components/utils/selectors/LanguageSelector";
import ThemeSelector from "@/components/utils/selectors/ThemeSelector";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const { t } = useTranslation();
  const { getGradient, GradientType } = useGradient();

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      const isAuthenticated = await authService.isAuthenticated();
      if (isAuthenticated) {
        router.push("/app");
      }
    };
    checkAuth();
  }, [router]);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (isSignUp) {
        await authService.signUpWithEmail(email, password, {
          name: email.split("@")[0],
        });
      } else {
        await authService.signInWithEmail(email, password);
      }
      router.push("/app");
    } catch {
      setError(t("Une erreur est survenue"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    try {
      await authService.signInWithGoogle();
    } catch {
      setError(t("Une erreur avec Google est survenue"));
      setIsLoading(false);
    }
  };

  const handleAppleAuth = async () => {
    setIsLoading(true);
    try {
      await authService.signInWithApple();
    } catch {
      setError(t("Une erreur avec Apple est survenue"));
      setIsLoading(false);
    }
  };

  const handleBackToWelcome = () => {
    router.push("/welcome");
  };

  return (
    <AuthGuard level={AuthLevel.PUBLIC}>
      <div
        className={`min-h-screen ${getGradient(GradientType.BACKGROUND_MAIN, "to-br")} flex items-center justify-center p-8 font-['MT']`}
      >
        <div className="absolute top-4 right-4 flex gap-4">
          <ThemeSelector />
          <LanguageSelector />
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full shadow-2xl flex flex-col">
          <div className="text-center mb-8">
            <h1 className="text-6xl font-bold text-white">DODGE</h1>
            <h2 className="text-2xl font-bold text-white mt-4">
              {isSignUp ? t("Créer un compte") : t("Se connecter")}
            </h2>
            <p className="text-white/80 mt-2">
              {isSignUp ? t("Déjà un compte ?") : t("Pas encore de compte ?")}{" "}
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="font-medium text-white hover:text-white/80 underline"
              >
                {isSignUp ? t("Se connecter") : t("Créer un compte")}
              </button>
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleEmailAuth}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-white/90 mb-2">
                  {t("Adresse email")}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder={t("Entrez votre email")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-white/90 mb-2">
                  {t("Mot de passe")}
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder={t("Entrez votre mot de passe")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <div className="text-red-300 text-sm text-center bg-red-500/20 p-3 rounded-lg">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isLoading
                  ? t("Chargement...")
                  : isSignUp
                    ? t("Créer le compte")
                    : t("Se connecter")}
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/30" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-transparent text-white/70">
                    {t("Ou continuer avec")}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <ActionButton
                  onClick={handleGoogleAuth}
                  disabled={isLoading}
                  label="Google"
                  color={{ color: ColorType.SECONDARY }}
                />

                <ActionButton
                  onClick={handleAppleAuth}
                  disabled={isLoading}
                  label="Apple"
                  color={{ color: ColorType.SECONDARY }}
                />
              </div>
            </div>
          </form>

          <div className="mt-8 text-center">
            <ActionButton
              onClick={handleBackToWelcome}
              label={t("Retour à l'accueil")}
              color={{ color: ColorType.TRANSPARENT }}
            />
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
