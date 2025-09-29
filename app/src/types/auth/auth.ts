export enum AuthLevel {
  PUBLIC = "public",
  USER = "user",
}

export interface AuthConfig {
  level: AuthLevel;
  redirectTo?: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  logout: () => Promise<void>;
}

export interface AuthProviderProps {
  children: React.ReactNode;
  requiredLevel?: AuthLevel;
}

export interface AuthGuardProps {
  children: React.ReactNode;
  level: AuthLevel;
  fallback?: React.ReactNode;
}
