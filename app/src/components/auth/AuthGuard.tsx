import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { AuthLevel } from "@/types/auth/auth";

interface AuthGuardProps {
  children: React.ReactNode;
  level: AuthLevel;
  fallback?: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  level,
  fallback = null,
}) => {
  const { isUserConnected, isGameReady, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white">Chargement...</div>
      </div>
    );
  }

  // Check access based on required level
  const hasAccess = (() => {
    switch (level) {
      case AuthLevel.PUBLIC:
        return true;
      case AuthLevel.USER:
        return isUserConnected;
      case AuthLevel.GAME:
        return isGameReady;
      default:
        return false;
    }
  })();

  if (!hasAccess) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
