export enum AuthLevel {
  PUBLIC = "public",
  USER = "user",
  GAME = "game",
}

export interface AuthConfig {
  level: AuthLevel;
  redirectTo?: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  isUserConnected: boolean;
  isGameReady: boolean;
  socketId: string | null;
  loading: boolean;
  logout: () => Promise<void>;
}
