import { io, Socket } from "socket.io-client";
import JoinGameRequestDto from "@/types/game/JoinGameRequestDto";
import { authService } from "./auth.service";

interface SocketConfig {
  serverUrl: string;
  transports: string[];
  autoConnect: boolean;
}

interface JoinGameResponse {
  success: boolean;
  player: {
    _id: string;
    name: string;
    points: number;
    currentTime: number;
    skinCards: string;
  };
}

interface LeaveGameResponse {
  success: boolean;
}

interface PlayerJoinedData {
  playerId: string;
  userId: string;
}

interface PlayerLeftData {
  playerId: string;
}

interface GameStateChangedData {
  gameState: string;
}

interface ChatMessageData {
  id: string;
  gameId: string;
  playerId: string;
  message: string;
  timestamp: Date;
}

class SocketService {
  private socket: Socket | null = null;
  private isConnected = false;
  private userId: string | null = null;
  private config: SocketConfig = {
    serverUrl: process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001",
    transports: ["websocket"],
    autoConnect: true,
  };

  async connect(serverUrl?: string) {
    if (this.socket?.connected) {
      return this.socket;
    }

    // Initialize user session if not already done
    const userId = await authService.initializeUserSession();
    if (userId) {
      this.userId = userId;
    }

    const url = serverUrl || this.config.serverUrl;
    this.socket = io(url, {
      transports: this.config.transports,
      autoConnect: this.config.autoConnect,
      auth: {
        userId: this.userId,
      },
    });

    this.socket.on("connect", () => {
      console.log("Connected to server:", this.socket?.id);
      this.isConnected = true;

      // Send user authentication to server
      this.authenticateUser();
    });

    this.socket.on("disconnect", () => {
      console.log("Disconnected from server");
      this.isConnected = false;
    });

    this.socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
      this.isConnected = false;
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
      this.userId = null;
    }
  }

  getSocket(): Socket | null {
    return this.socket;
  }

  isSocketConnected(): boolean {
    return this.isConnected && this.socket?.connected === true;
  }

  getUserId(): string | null {
    return this.userId;
  }

  /**
   * Authenticate user with the server
   */
  private authenticateUser() {
    if (!this.socket || !this.userId) return;

    this.socket.emit(
      "authenticate",
      { userId: this.userId },
      (response: { success: boolean }) => {
        if (response.success) {
          console.log("User authenticated successfully:", this.userId);
        } else {
          console.error("Failed to authenticate user");
        }
      }
    );
  }

  /**
   * Update user information
   */
  updateUser(userId: string) {
    this.userId = userId;

    // Re-authenticate if connected
    if (this.isSocketConnected()) {
      this.authenticateUser();
    }
  }

  // Game events
  joinGame(data: JoinGameRequestDto): Promise<JoinGameResponse> {
    return new Promise((resolve, reject) => {
      if (!this.socket) {
        reject(new Error("Socket not connected"));
        return;
      }

      this.socket.emit("joinGame", data, (response: JoinGameResponse) => {
        if (response.success) {
          resolve(response);
        } else {
          reject(new Error("Failed to join game"));
        }
      });
    });
  }

  leaveGame(gameId: string, playerId: string): Promise<LeaveGameResponse> {
    return new Promise((resolve, reject) => {
      if (!this.socket) {
        reject(new Error("Socket not connected"));
        return;
      }

      this.socket.emit(
        "leaveGame",
        { gameId, playerId },
        (response: LeaveGameResponse) => {
          if (response.success) {
            resolve(response);
          } else {
            reject(new Error("Failed to leave game"));
          }
        }
      );
    });
  }

  // Event listeners
  onPlayerJoined(callback: (data: PlayerJoinedData) => void) {
    if (this.socket) {
      this.socket.on("game:player-joined", callback);
    }
  }

  onPlayerLeft(callback: (data: PlayerLeftData) => void) {
    if (this.socket) {
      this.socket.on("game:player-left", callback);
    }
  }

  onGameStateChanged(callback: (data: GameStateChangedData) => void) {
    if (this.socket) {
      this.socket.on("game:state-changed", callback);
    }
  }

  onNewMessage(callback: (data: ChatMessageData) => void) {
    if (this.socket) {
      this.socket.on("chat:new-message", callback);
    }
  }

  // Remove listeners
  removeAllListeners() {
    if (this.socket) {
      this.socket.removeAllListeners();
    }
  }

  removeListener(event: string, callback?: (...args: unknown[]) => void) {
    if (this.socket) {
      this.socket.off(event, callback);
    }
  }
}

export const socketService = new SocketService();
export default socketService;
