import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { socketService } from "@/services/socket.service";
import { useGameStore } from "@/store/game/game";
import { useSocket } from "@/contexts/SocketProvider";
import { useUser } from "@/hooks/useUser";
import JoinGameRequestDto from "@/types/game/JoinGameRequestDto";

export const useGameConnection = () => {
  const router = useRouter();
  const { connect } = useSocket();
  const { setGameId, initGame, addPlayer } = useGameStore();
  const { userDetails, updateUser } = useUser();

  const joinGame = useCallback(
    async (gameId?: string, playerName?: string) => {
      // Connect to socket if not already connected
      connect();

      // Get current userId from socket service
      const currentUserId = socketService.getUserId();
      if (!currentUserId) {
        throw new Error("User not authenticated");
      }

      // Use provided gameId or default
      const targetGameId = gameId || "66c3a1e23c0a6642ee088edc";

      // Update user name if provided
      if (playerName && userDetails) {
        await updateUser({ name: playerName });
      }

      const data: JoinGameRequestDto = {
        gameId: targetGameId,
        userId: currentUserId,
      };

      // Join the game
      await socketService.joinGame(data).then((response) => {
        if (response.success) {
          const playerId = response.player._id;
          console.log("Successfully joined game with playerId:", playerId);

          // Store player info in localStorage
          localStorage.setItem("playerId", playerId);
          localStorage.setItem("gameId", targetGameId);

          // Update store
          setGameId(targetGameId);
          initGame(playerId, {
            id: targetGameId,
            gameState: "WAITING",
            round: 0,
          });

          addPlayer({
            id: response.player._id,
            name: response.player.name,
            points: response.player.points,
            currentTime: response.player.currentTime,
            skinCards: response.player.skinCards,
          });

          // Redirect to game page
          router.push("/game");
        } else {
          throw new Error("Failed to join game");
        }
      });
    },
    [connect, setGameId, initGame, addPlayer, router, userDetails, updateUser]
  );

  const loadStoredGame = useCallback(() => {
    const storedGameId = localStorage.getItem("gameId");
    const storedPlayerId = localStorage.getItem("playerId");
    const storedPlayerName = localStorage.getItem("playerName");

    if (storedGameId && storedPlayerId && storedPlayerName) {
      setGameId(storedGameId);
      initGame(storedPlayerId, {
        id: storedGameId,
        gameState: "WAITING",
        round: 0,
      });
      return true;
    }
    return false;
  }, [setGameId, initGame]);

  return {
    joinGame,
    loadStoredGame,
  };
};
