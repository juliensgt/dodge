import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useSocketsStore } from "@/store/sockets/sockets.store";

export const AuthStatus: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();
  const { isConnected, userId } = useSocketsStore();

  return (
    <div className="fixed top-4 left-4 bg-black/50 text-white p-4 rounded-lg text-sm z-50">
      <h3 className="font-bold mb-2">Auth Status Debug</h3>
      <div>Loading: {loading ? "Yes" : "No"}</div>
      <div>Authenticated: {isAuthenticated ? "Yes" : "No"}</div>
      <div>Socket Connected: {isConnected ? "Yes" : "No"}</div>
      <div>User ID: {userId || "None"}</div>
    </div>
  );
};
