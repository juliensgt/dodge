import { socketService } from "../sockets/socket.service";

class GameService {
  constructor() {}

  async initializeGame(gameId: string) {
    if (!gameId) throw new Error("Invalid gameId");

    console.log("Initializing game for gameId:", gameId);

    await socketService.joinGame(gameId);
  }

  setupGameEventListeners() {
    // Écouter les événements de la partie
    /*socketService.on(GameEvents.PLAYER_JOINED, (data) => {
      console.log("Player joined:", data);
      // Mettre à jour l'UI si nécessaire
    });

    socketService.on(GameEvents.PLAYER_LEFT, (data) => {
      console.log("Player left:", data);
      // Mettre à jour l'UI si nécessaire
    });

    socketService.on(GameEvents.GAME_STARTED, (data) => {
      console.log("Game started:", data);
      // Mettre à jour l'UI si nécessaire
    });

    socketService.on(GameEvents.GAME_ENDED, (data) => {
      console.log("Game ended:", data);
      // Mettre à jour l'UI si nécessaire
    });

    socketService.on(ChatEvents.CHAT_MESSAGE_SENT, (data) => {
      console.log("New message:", data);
      // Mettre à jour l'UI si nécessaire
    });*/
  }
}

export const gameService = new GameService();
