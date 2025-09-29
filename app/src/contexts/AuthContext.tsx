import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { authService } from "@/services/auth.service";
import { useSocket } from "./SocketProvider";
import {
  AuthContextType,
  AuthLevel,
  AuthProviderProps,
} from "@/types/auth/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  requiredLevel = AuthLevel.PUBLIC,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const { socketId, isSocketConnected, disconnect } = useSocket();
  const router = useRouter();

  useEffect(() => {
    const checkAuthStatus = async () => {
      setLoading(true);

      // Check if user is authenticated with Supabase
      const authenticated = await authService.isAuthenticated();
      setIsAuthenticated(authenticated);

      // Handle redirections based on required level
      if (requiredLevel === AuthLevel.USER && !authenticated) {
        router.push("/login");
        return;
      }

      setLoading(false);
    };

    checkAuthStatus();
  }, [socketId, isSocketConnected, requiredLevel, router]);

  const logout = async () => {
    await authService.signOut();
    disconnect();
    setIsAuthenticated(false);
    router.push("/");
  };

  const value: AuthContextType = {
    isAuthenticated,
    loading,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
