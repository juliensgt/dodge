export interface SocketProviderProps {
  children: React.ReactNode;
}

export interface SocketContextType {
  isSocketConnected: boolean;
  socketId: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  updateUser: (userId: string, userName?: string) => void;
  initializeUser: () => Promise<string | null>;
}
