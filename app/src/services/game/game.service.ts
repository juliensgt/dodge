import { GameEvents } from "@/types/events/game.events";
import { socketService } from "../sockets/socket.service";
import { Socket } from "socket.io-client";
import { ChatEvents } from "@/types/events/chat.events";
import { GameMessage, GameAndPlayerResponse } from "@/types/game/game.types";
import { useGameStore } from "@/store/game/game";
import { httpService } from "../http/http.service";
import { useMessagesStore } from "@/store/messages/messages.store";

class GameService {
  constructor() {}

  async initializeGame(gameId: string) {
    console.log("Initializing game for gameId:", gameId);
    if (!gameId) throw new Error("Invalid gameId");

    await socketService.joinGame(gameId);
  }

  setupGameEventListeners(client: Socket) {
    console.log("Client setup game event listeners");
    // Écouter les événements de la partie
    client.on(GameEvents.PLAYER_JOINED, async (data: GameAndPlayerResponse) => {
      const game = useGameStore.getState();

      console.log("Player joined:", data);

      // update game
      game.setGame(data.gameData!);

      // Mettre à jour l'UI si nécessaire
    });

    client.on(GameEvents.PLAYER_LEFT, (data: GameAndPlayerResponse) => {
      const game = useGameStore.getState();
      console.log("Player left:", data);

      // update game
      game.setGame(data.gameData!);
      // Mettre à jour l'UI si nécessaire
    });

    client.on(GameEvents.GAME_STARTED, (data) => {
      console.log("Game started:", data);
      // Mettre à jour l'UI si nécessaire
    });

    client.on(GameEvents.GAME_ENDED, (data) => {
      console.log("Game ended:", data);
      // Mettre à jour l'UI si nécessaire
    });

    client.on(ChatEvents.CHAT_MESSAGE_SENT, (data: GameMessage) => {
      useMessagesStore.getState().addMessage(data);
    });
  }

  async sendMessage(message: string) {
    console.log("Sending message on", ChatEvents.CHAT_MESSAGE_SENT, message);
    await socketService.emit(ChatEvents.CHAT_MESSAGE_SENT, { message });
  }

  async getMessages(gameId: string): Promise<GameMessage[]> {
    const data = await httpService.get<GameMessage[]>(
      `/messages/game/${gameId}`
    );
    return data ?? [];
  }
}

export const gameService = new GameService();
