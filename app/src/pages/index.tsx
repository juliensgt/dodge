import LanguageSelector from "@/components/utils/selectors/LanguageSelector";
import ThemeSelector from "@/components/utils/selectors/ThemeSelector";
import ActionButton from "@/components/utils/buttons/ActionButton";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { useGradient } from "@/hooks/useGradient";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ColorType } from "@/enums/themes/list/PurpleTheme";

export default function Home() {
  const [playerName, setPlayerName] = useState("");
  const router = useRouter();
  const { getGradient, GradientType } = useGradient();

  const joinGame = (playerName: string, _gameId: string) => {
    if (!playerName.trim()) {
      alert("Veuillez entrer un nom de joueur");
      return;
    }

    // TODO: Implémenter la logique de connexion au socket
    // Pour l'instant, on redirige directement vers la page de jeu
    router.push("/game");
  };

  const clearGame = (gameId: string) => {
    // TODO: Implémenter la logique de reset de partie
    console.log("Clear game:", gameId);
  };

  return (
    <LanguageProvider>
      <div
        className={`min-h-screen ${getGradient(GradientType.BACKGROUND_MAIN, "to-br")} flex items-center justify-center p-8`}
      >
        <div className="absolute top-4 right-4 flex gap-4">
          <ThemeSelector />
          <LanguageSelector />
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full shadow-2xl flex flex-col">
          <div className="text-center mb-4">
            <h1 className="text-6xl font-bold text-white">DODGE</h1>
            <p className="text-lg text-white">
              Rejoignez une partie et défiez vos amis !
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <label htmlFor="playerName" className="block text-white/90 mb-1">
                Nom du joueur
              </label>
              <input
                id="playerName"
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Entrez votre nom"
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="flex flex-col gap-2">
              <ActionButton
                onClick={() => joinGame(playerName, "66c3a1e23c0a6642ee088edc")}
                label="Rejoindre la partie"
                gradient={{ gradientType: GradientType.PRIMARY }}
              />

              <ActionButton
                onClick={() => clearGame("66c3a1e23c0a6642ee088edc")}
                label="Reset de la partie"
                color={{ color: ColorType.TRANSPARENT }}
              />
            </div>
          </div>
        </div>
      </div>
    </LanguageProvider>
  );
}
