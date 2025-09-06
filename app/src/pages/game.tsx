import { useEffect } from "react";
import BoardGame from "@/components/game/BoardGame";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { useGradient } from "@/hooks/useGradient";

export default function Game() {
  const { getGradient, GradientType } = useGradient();

  useEffect(() => {
    console.log("Game page mounted");
  }, []);

  return (
    <LanguageProvider>
      <div
        className={`w-full min-h-screen ${getGradient(GradientType.BACKGROUND_MAIN, "to-br")}`}
      >
        <BoardGame />
      </div>
    </LanguageProvider>
  );
}
