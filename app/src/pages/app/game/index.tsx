import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LoadingOverlay from "@/components/utils/LoadingOverlay";
import { httpService } from "@/services/http/http.service";
import { GameMode } from "@/components/create-game/types";

/**
 * Page de chargement et recherche automatique de partie
 * Affiche le loader, cherche ou crée une partie, puis redirige vers /app/game/{gameId}
 */
export default function LoadingGame() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const findOrCreateGame = async () => {
      try {
        // D'abord, essayer de trouver une partie en attente
        const games =
          await httpService.get<Array<{ _id: string; state: string }>>(
            "/games"
          );

        // Chercher une partie en attente (WAITING) avec de la place
        const availableGame = games.find((game) => game.state === "WAITING");

        let gameId: string;

        if (availableGame) {
          // Rejoindre une partie existante
          gameId = availableGame._id;
        } else {
          // Créer une nouvelle partie avec les options par défaut (mode QUICK)
          const newGame = await httpService.post<{ _id: string }>("/games", {
            options: {
              maxPlayers: 2,
              nbCardsPerPlayer: 4,
              nbSeeFirstCards: 2,
              pointsForActionError: 2,
              limitPoints: 50,
              timeToPlay: 8,
              timeToStartGame: 10,
              timeToSeeCards: 10,
            },
            gameState: "WAITING",
            players: [],
            deck: [],
            defausse: [],
            round: 0,
            tour: 0,
            indexLastPlayerWhoPlay: 0,
            indexPlayerWhoPlays: 0,
            playerDodge: "",
            gameMode: GameMode.QUICK,
            privateGame: false,
          });

          gameId = newGame._id;
        }

        if (isMounted && gameId) {
          // Rediriger vers la partie
          router.push(`/app/game/${gameId}`);
        }
      } catch (error) {
        console.error("Error finding/creating game:", error);
        // En cas d'erreur, rediriger vers la page principale
        if (isMounted) {
          router.push("/app");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    findOrCreateGame();

    return () => {
      isMounted = false;
    };
  }, [router]);

  return <LoadingOverlay isLoading={isLoading} />;
}
