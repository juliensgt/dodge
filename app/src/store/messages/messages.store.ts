import { create } from "zustand";
import { GameMessage } from "@/types/game/game.types";
import { gameService } from "@/services/game/game.service";

export interface MessagesActions {
  initializeMessages: (gameId: string) => void;
  setMessages: (messages: GameMessage[]) => void;
  addMessage: (message: GameMessage) => void;
}

export interface MessagesState {
  messages: GameMessage[];
}

// Combined store type
type MessagesStore = MessagesState & MessagesActions;

const useMessagesStore = create<MessagesStore>((set, get) => {
  return {
    messages: [],
    initializeMessages: (gameId: string) => {
      gameService.getMessages(gameId).then((messages) => {
        set({ messages });
      });
    },
    setMessages: (messages: GameMessage[]) => {
      set({ messages });
    },
    addMessage: (message: GameMessage) => {
      set((state) => ({ messages: [...state.messages, message] }));
    },
  };
});

export { useMessagesStore };
