import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import BoardGame from "@/components/game/BoardGame";
import { useGradient } from "@/hooks/useGradient";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { AuthLevel } from "@/types/auth/auth";
import { useTranslation } from "@/hooks/useTranslation";
import { gameService } from "@/services/game/game.service";
import { useGameStore } from "@/store/game/game";
import { socketService } from "@/services/sockets/socket.service";

export default function Game() {
  const { t } = useTranslation();
  const { getGradient, GradientType } = useGradient();
  const { resetGame } = useGameStore();

  const router = useRouter();
  const { id: gameId } = router.query;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (gameId) {
      resetGame();
      socketService.disconnect();

      gameService
        .initializeGame(gameId as string)
        .then(() => {
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error initializing game:", error);
          // Redirect to /app if game initialization fails
          router.push("/app");
        });
    }

    // Cleanup function to disconnect socket when component unmounts
    return () => {
      socketService.disconnect();
    };
  }, [gameId, resetGame, router]);

  // Handle browser navigation (back/forward buttons)
  useEffect(() => {
    const handleBeforeUnload = () => {
      socketService.disconnect();
    };

    const handleRouteChange = () => {
      socketService.disconnect();
    };

    // Listen for browser navigation events
    window.addEventListener("beforeunload", handleBeforeUnload);
    router.events.on("routeChangeStart", handleRouteChange);

    // Cleanup event listeners
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events]);

  return (
    <AuthGuard level={AuthLevel.USER}>
      <div
        className={`w-full h-screen overflow-hidden ${getGradient(GradientType.BACKGROUND_MAIN, "to-br")} relative`}
      >
        <BoardGame />
      </div>
    </AuthGuard>
  );
}
