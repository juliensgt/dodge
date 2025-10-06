import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { AuthLevel, AuthGuardProps } from "@/types/auth/auth";

export const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  level,
  fallback = null,
}) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white"></div>
      </div>
    );
  }

  // Check access based on required level
  const hasAccess = (() => {
    switch (level) {
      case AuthLevel.PUBLIC:
        return true;
      case AuthLevel.USER:
        return isAuthenticated;
      default:
        return false;
    }
  })();

  if (!hasAccess) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
