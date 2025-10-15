import { GameEvents } from "@/types/events/game.events";
import { TurnEvents } from "@/types/events/turn.events";
import { ActionType } from "../../enums/action-type.enum";
import { socketService } from "../sockets/socket.service";
import { Socket } from "socket.io-client";
import { ChatEvents } from "@/types/events/chat.events";
import {
  GameMessage,
  GameAndPlayerResponse,
  GameCardData,
  GameState,
} from "@/types/game/game.types";
import { Player } from "@/store/game/types";
import { useGameStore } from "@/store/game/game";
import { httpService } from "../http/http.service";
import { useMessagesStore } from "@/store/messages/messages.store";
import { Card, CardState } from "@/store/cards/cards.type";

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

      // set current player id
      if (!game.getCurrentPlayerId()) {
        game.setGame(data.gameData!, data.playerData!.id);
      } else {
        game.setGame(data.gameData!, game.getCurrentPlayerId());
      }

      // Mettre à jour l'UI si nécessaire
    });

    client.on(GameEvents.PLAYER_LEFT, (data: GameAndPlayerResponse) => {
      const game = useGameStore.getState();
      console.log("Player left:", data);

      // update game
      game.setGame(data.gameData!);
      // Mettre à jour l'UI si nécessaire
    });

    client.on(GameEvents.GAME_STATE_CHANGED, (data: GameAndPlayerResponse) => {
      const game = useGameStore.getState();
      const gameState = data.gameData!.state as GameState;
      console.log("Game state changed:", gameState);
      game.setGameState(gameState);
    });

    client.on(GameEvents.GAME_STARTED, () => {
      console.log("Game started");
      // Banner will be handled by the component that uses this service
    });

    client.on(GameEvents.GAME_ENDED, (data) => {
      console.log("Game ended:", data);
      // Mettre à jour l'UI si nécessaire
    });

    client.on(ChatEvents.CHAT_MESSAGE_SENT, (data: GameMessage) => {
      useMessagesStore.getState().addMessage(data);
    });

    // Turn events
    client.on(TurnEvents.TURN_STARTED, (data: { player: Player }) => {
      const game = useGameStore.getState();
      console.log("Turn started for player:", data.player);

      // Update current player in store
      game.setPlayerWhoPlays(data.player);

      // Start player timer
      game.startPlayerTimer();
    });

    client.on(
      TurnEvents.CARD_SOURCE_CHOSEN,
      (data: { choice: ActionType; card: Card }) => {
        if (data && data.card && data.choice) {
          console.log("Card source chosen:", data);

          const game = useGameStore.getState();
          if (data.choice === ActionType.SWITCH_WITH_DECK) {
            data.card = { ...data.card, cardState: CardState.CARD_FRONT };
            game.setDeck(data.card);
          } else if (data.choice === ActionType.SWITCH_WITH_DEFAUSSE) {
            game.addDefausse(data.card);
          }
          game.stopPlayerTimer();
        }
      }
    );
  }

  async sendMessage(message: string) {
    console.log("Sending message on", ChatEvents.CHAT_MESSAGE_SENT, message);
    await socketService.emit(ChatEvents.CHAT_MESSAGE_SENT, { message });
  }

  async sendCardSourceChoice(choice: ActionType) {
    console.log("Sending card source choice:", choice);
    await socketService.emit(TurnEvents.CARD_SOURCE_CHOSEN, { choice });
  }

  async getMessages(gameId: string): Promise<GameMessage[]> {
    const data = await httpService.get<GameMessage[]>(
      `/messages/game/${gameId}`
    );
    return data ?? [];
  }

  async getGames(): Promise<GameCardData[]> {
    const data = await httpService.get<GameCardData[]>(`/games`);
    return data ?? [];
  }

  async resetGame(gameId: string): Promise<void> {
    await httpService.post(`/games/${gameId}/reset`);
  }

  async deleteGame(gameId: string): Promise<void> {
    await httpService.delete(`/games/${gameId}`);
  }
}

export const gameService = new GameService();
