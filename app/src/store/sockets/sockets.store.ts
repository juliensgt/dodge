import { ConnectionType } from "@/types/game/game.types";
import { Socket } from "socket.io-client";
import { create } from "zustand";

export interface SocketState {
  socket: Socket | null;
  connectionType: ConnectionType | null;
  isConnected: boolean;
  currentGameId: string | null;
}

// actions pour manipuler le state
export interface SocketActions {
  setSocket: (socket: Socket) => void;
  setIsConnected: (isConnected: boolean) => void;
  setCurrentGameId: (currentGameId: string) => void;

  getSocket: () => Socket | null;
  getConnectionType: () => ConnectionType | null;
  getIsConnected: () => boolean;
  getCurrentGameId: () => string | null;
}

// Combined store type
type SocketsStore = SocketState & SocketActions;

const useSocketsStore = create<SocketsStore>((set, get) => {
  return {
    socket: null,
    connectionType: null,
    isConnected: false,
    currentGameId: null,

    // Socket actions
    setSocket: (socket: Socket) => {
      set({ socket });
    },
    setIsConnected: (isConnected: boolean) => {
      set({ isConnected });
    },
    setCurrentGameId: (currentGameId: string) => {
      set({ currentGameId });
    },
    getSocket: () => {
      return get().socket;
    },
    getConnectionType: () => {
      return get().connectionType;
    },
    getIsConnected: () => {
      return get().isConnected;
    },
    getCurrentGameId: () => {
      return get().currentGameId;
    },
  };
});

export { useSocketsStore };
