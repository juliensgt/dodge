import { StateCreator } from "zustand";
import { GameState, Player } from "./types";
import { socketService } from "@/services/socket.service";
import { GameActions } from "./actions";

export interface SocketActions {
  setupSocketListeners: () => void;
  cleanupSocketListeners: () => void;
}

export const createSocketActions: StateCreator<
  GameState & GameActions,
  [],
  [],
  SocketActions
> = (set, get) => ({
  setupSocketListeners: () => {
    // Listen for player joined events
    socketService.onPlayerJoined(
      (data: { playerId: string; userId: string }) => {
        console.log("Player joined:", data);
        // Add player to store - we'll need to fetch player details from API
        // For now, create a basic player object
        const newPlayer: Player = {
          id: data.playerId,
          name: data.userId, // Using userId as name for now
          points: 0,
          currentTime: 0,
          skinCards: "",
        };
        get().addPlayer(newPlayer);
      }
    );

    // Listen for player left events
    socketService.onPlayerLeft((data: { playerId: string }) => {
      console.log("Player left:", data);
      get().removePlayer(data.playerId);
    });

    // Listen for game state changes
    socketService.onGameStateChanged((data: { gameState: string }) => {
      console.log("Game state changed:", data);
      get().setGameState(data.gameState);
    });

    // Listen for new messages
    socketService.onNewMessage((data: unknown) => {
      console.log("New message:", data);
      // Handle chat messages here if needed
    });
  },

  cleanupSocketListeners: () => {
    socketService.removeAllListeners();
  },
});
