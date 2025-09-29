import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { authService } from "@/services/auth.service";
import { useSocket } from "./SocketProvider";
import { AuthContextType, AuthLevel } from "@/types/auth/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
  requiredLevel?: AuthLevel;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  requiredLevel = AuthLevel.PUBLIC,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isUserConnected, setIsUserConnected] = useState(false);
  const [isGameReady, setIsGameReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const { socketId, isSocketConnected, disconnect } = useSocket();
  const router = useRouter();

  useEffect(() => {
    const checkAuthStatus = async () => {
      setLoading(true);

      try {
        // Check if user is authenticated with Supabase
        const authenticated = await authService.isAuthenticated();
        setIsAuthenticated(authenticated);

        // Check if user is connected to our system
        const userConnected = authenticated && socketId !== null;
        setIsUserConnected(userConnected);

        // Check if game is ready (user + socket connected)
        const gameReady = userConnected && isSocketConnected;
        setIsGameReady(gameReady);

        // Handle redirections based on required level
        if (requiredLevel === AuthLevel.USER && !userConnected) {
          router.push("/login");
          return;
        }

        if (requiredLevel === AuthLevel.GAME && !gameReady) {
          if (!authenticated) {
            router.push("/login");
          } else if (!isSocketConnected) {
            // User is authenticated but socket not connected, redirect to home
            router.push("/");
          }
          return;
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        if (requiredLevel !== AuthLevel.PUBLIC) {
          router.push("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, [socketId, isSocketConnected, requiredLevel, router]);

  const logout = async () => {
    try {
      await authService.signOut();
      disconnect();
      setIsAuthenticated(false);
      setIsUserConnected(false);
      setIsGameReady(false);
      router.push("/welcome");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const value: AuthContextType = {
    isAuthenticated,
    isUserConnected,
    isGameReady,
    socketId,
    loading,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
