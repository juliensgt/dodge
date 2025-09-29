import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useSocket } from "@/contexts/SocketProvider";

export const AuthStatus: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();
  const { isSocketConnected, socketId } = useSocket();

  return (
    <div className="fixed top-4 left-4 bg-black/50 text-white p-4 rounded-lg text-sm z-50">
      <h3 className="font-bold mb-2">Auth Status Debug</h3>
      <div>Loading: {loading ? "Yes" : "No"}</div>
      <div>Authenticated: {isAuthenticated ? "Yes" : "No"}</div>
      <div>Socket Connected: {isSocketConnected ? "Yes" : "No"}</div>
      <div>User ID: {socketId || "None"}</div>
    </div>
  );
};
