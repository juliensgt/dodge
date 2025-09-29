import React, { createContext, useContext, useEffect, useState } from "react";
import { socketService } from "@/services/socket.service";
import { authService } from "@/services/auth.service";
import { useGameStore } from "@/store/game/game";

interface SocketContextType {
  isSocketConnected: boolean;
  socketId: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  updateUser: (userId: string, userName?: string) => void;
  initializeUser: () => Promise<string | null>;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

interface SocketProviderProps {
  children: React.ReactNode;
  autoConnect?: boolean;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({
  children,
  autoConnect = false,
}) => {
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [socketId, setSocketId] = useState<string | null>(null);
  const { setupSocketListeners, cleanupSocketListeners, setSocketConnected } =
    useGameStore();

  const connect = async () => {
    if (!socketService.isSocketConnected()) {
      await socketService.connect();
    }
  };

  const disconnect = () => {
    socketService.disconnect();
    setIsSocketConnected(false);
    setSocketConnected(false);
    setSocketId(null);
  };

  const updateUser = (newUserId: string) => {
    socketService.updateUser(newUserId);
    setSocketId(newUserId);
  };

  const initializeUser = async (): Promise<string | null> => {
    try {
      const currentUserId = await authService.initializeUserSession();
      if (currentUserId) {
        setSocketId(currentUserId);
        return currentUserId;
      }
      return null;
    } catch (error) {
      console.error("Failed to initialize user:", error);
      return null;
    }
  };

  useEffect(() => {
    // Only auto-connect if enabled
    if (autoConnect) {
      const initializeAndConnect = async () => {
        await initializeUser();
        await connect();
      };
      initializeAndConnect();
    }

    // Setup socket listeners when provider mounts
    setupSocketListeners();

    // Listen for connection status changes
    const checkConnection = () => {
      const connected = socketService.isSocketConnected();
      const currentUserId = socketService.getUserId();
      setIsSocketConnected(connected);
      setSocketConnected(connected);
      setSocketId(currentUserId);
    };

    // Check initial connection status
    checkConnection();

    // Set up interval to check connection status
    const interval = setInterval(checkConnection, 1000);

    // Cleanup on unmount
    return () => {
      clearInterval(interval);
      cleanupSocketListeners();
    };
  }, [
    autoConnect,
    setupSocketListeners,
    cleanupSocketListeners,
    setSocketConnected,
  ]);

  const value: SocketContextType = {
    isSocketConnected,
    socketId,
    connect,
    disconnect,
    updateUser,
    initializeUser,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
