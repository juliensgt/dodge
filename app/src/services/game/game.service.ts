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
import {
  applyClickabilityForState,
  applyClickabilityForChoices,
} from "@/store/cards/clickability.rules";
import { httpService } from "../http/http.service";
import { useMessagesStore } from "@/store/messages/messages.store";
import { Card, CardState } from "@/store/cards/cards.type";
import { addActionPoints } from "@/services/game/game.setters";

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

      if (gameState === GameState.COUP_OEIL) {
        addActionPoints(game.options.nbSeeFirstCards || 0);
      }

      // Apply centralized clickability rules after state change
      applyClickabilityForState(gameState, useGameStore.getState());
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
    client.on(
      TurnEvents.TURN_STARTED,
      (data: { player: Player; nextChoices: ActionType[] }) => {
        const game = useGameStore.getState();
        console.log("Turn started for player:", data.player);

        game.setChoices(data.nextChoices);

        // Update current player in store
        game.setPlayerWhoPlays(data.player);

        // Start player timer
        game.startPlayerTimer();

        // UI update
        applyClickabilityForChoices(data.nextChoices, game);
      }
    );

    client.on(
      TurnEvents.CARD_SOURCE_CHOSEN,
      (data: { choice: ActionType; card: Card; nextChoices: ActionType[] }) => {
        if (data && data.card && data.choice) {
          console.log("Card source chosen:", data);

          const game = useGameStore.getState();
          game.setChoices(data.nextChoices);
          if (data.choice === ActionType.GET_CARD_IN_DECK) {
            data.card = { ...data.card, cardState: CardState.CARD_FRONT };
            game.setDeck(data.card);
          } else if (data.choice === ActionType.GET_CARD_IN_DEFAUSSE) {
            game.addDefausse(data.card);
          }
          game.startPlayerTimer();

          // UI update
          applyClickabilityForChoices(data.nextChoices, game);
        }
      }
    );

    client.on(
      TurnEvents.CARD_SWITCHED,
      (data: { choice: ActionType; card: Card; targetCardIndex?: number }) => {
        console.log("Card switched:", data);
        if (data && data.card && data.choice) {
          const game = useGameStore.getState();

          game.resetDeck();
          game.addDefausse(data.card);
          if (data.choice === ActionType.SWITCH_FROM_DECK_TO_DEFAUSSE) {
            // animate card going to defausse
          } else if (
            data.choice === ActionType.SWITCH_FROM_DEFAUSSE_TO_PLAYER
          ) {
            // animate card going to player's main
          } else if (data.choice === ActionType.SWITCH_FROM_DECK_TO_PLAYER) {
            // animate card going to player's main
          }
        }
      }
    );
  }

  async sendMessage(message: string) {
    await socketService.emit(ChatEvents.CHAT_MESSAGE_SENT, { message });
  }

  async sendCardSourceChoice(choice: ActionType) {
    await socketService.emit(TurnEvents.CARD_SOURCE_CHOSEN, { choice });
  }

  async sendCardSwitchChoice(choice: ActionType, targetCardIndex?: number) {
    await socketService.emit(TurnEvents.CARD_SWITCHED, {
      choice,
      targetCardIndex,
    });
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
