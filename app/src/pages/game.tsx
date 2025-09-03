import { useEffect } from "react";
import BoardGame from "@/components/game/BoardGame";
import { LanguageProvider } from "@/contexts/LanguageContext";

export default function Game() {
  useEffect(() => {
    console.log("Game page mounted");
  }, []);

  return (
    <LanguageProvider>
      <div className="w-full min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <BoardGame />
      </div>
    </LanguageProvider>
  );
}
