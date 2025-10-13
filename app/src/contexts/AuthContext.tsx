import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { authService } from "@/services/auth.service";
import { userService } from "@/services/user/user.service";
import {
  AuthContextType,
  AuthLevel,
  AuthProviderProps,
} from "@/types/auth/auth";
import { UserRole, User } from "@/types/auth/user.types";
import { useSocketsStore } from "@/store/sockets/sockets.store";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Convenience hook for role-based access
export const useRole = () => {
  const { user, isAdmin } = useAuth();
  return { user, role: user?.role || null, isAdmin };
};

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  requiredLevel = AuthLevel.PUBLIC,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const { socket, isConnected, getSocket } = useSocketsStore();
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
      setUser(await userService.getUser((await authService.getUserId()) ?? ""));
      setLoading(false);
    };

    checkAuthStatus();
  }, [socket, isConnected, requiredLevel, router]);

  const logout = async () => {
    await authService.signOut();
    getSocket()?.disconnect();
    setIsAuthenticated(false);
    setUser(null);
    router.push("/");
  };

  const value: AuthContextType = {
    isAuthenticated,
    loading,
    user,
    isAdmin: user?.role === UserRole.ADMIN,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
