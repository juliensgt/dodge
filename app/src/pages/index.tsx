import { useState } from "react";
import { useRouter } from "next/navigation";
import LanguageSelector from "@/components/LanguageSelector";
import { LanguageProvider } from "@/contexts/LanguageContext";

export default function Home() {
  const [playerName, setPlayerName] = useState("");
  const router = useRouter();

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
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-8">
        <div className="absolute top-4 right-4">
          <LanguageSelector />
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full shadow-2xl flex flex-col">
          <div className="text-center mb-4">
            <h1 className="text-6xl font-bold">DODGE</h1>
            <p className="text-lg">Rejoignez une partie et défiez vos amis !</p>
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
              <button
                onClick={() => joinGame(playerName, "66c3a1e23c0a6642ee088edc")}
                className="hover:cursor-pointer w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Rejoindre la partie
              </button>

              <button
                onClick={() => clearGame("66c3a1e23c0a6642ee088edc")}
                className="hover:cursor-pointer w-full bg-red-600/80 hover:bg-red-700/80 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Reset de la partie
              </button>
            </div>
          </div>
        </div>
      </div>
    </LanguageProvider>
  );
}
