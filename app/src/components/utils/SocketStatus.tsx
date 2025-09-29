import React from "react";
import { useSocket } from "@/contexts/SocketProvider";

const SocketStatus: React.FC = () => {
  const { isSocketConnected, socketId } = useSocket();

  return (
    <div className="fixed top-4 left-4 bg-black/50 text-white p-2 rounded text-sm">
      <div>
        Socket: {isSocketConnected ? "🟢 Connected" : "🔴 Disconnected"}
      </div>
      <div>User ID: {socketId || "Not authenticated"}</div>
    </div>
  );
};

export default SocketStatus;
