import { io, Socket } from "socket.io-client";
import { authService } from "../auth.service";

export enum ConnectionType {
  SPECTATOR = "spectator",
  PLAYER = "player",
}

export interface JoinGameRoomRequest {
  gameId: string;
  type: ConnectionType;
  playerId?: string;
  token: string;
}

export interface JoinGameRoomResponse {
  success: boolean;
  gameData?: {
    id: string;
    gameState: string;
    round: number;
    players: Array<{
      id: string;
      name: string;
      points: number;
      currentTime: number;
    }>;
  };
  playerData?: {
    id: string;
    name: string;
    points: number;
    currentTime: number;
    skinCards: string;
  };
  error?: string;
}

export interface GameRoomEvents {
  "game:player-joined": (data: {
    gameId: string;
    connectionType: ConnectionType;
    playerId: string | null;
    userId: string;
    gameStats: {
      totalConnections: number;
      players: number;
      spectators: number;
    };
  }) => void;
  "game:player-left": (data: {
    gameId: string;
    connectionType: ConnectionType;
    playerId: string | null;
    userId: string;
    gameStats: {
      totalConnections: number;
      players: number;
      spectators: number;
    };
  }) => void;
  "game:started": (data: unknown) => void;
  "game:ended": (data: unknown) => void;
  "game:round-started": (data: unknown) => void;
  "game:round-ended": (data: unknown) => void;
  "game:state-changed": (data: unknown) => void;
  "chat:new-message": (data: unknown) => void;
}

class SocketService {
  private socket: Socket | null = null;
  private currentGameId: string | null = null;
  private connectionType: ConnectionType | null = null;
  private isConnected = false;
  private userId: string | null = null;

  async connect(serverUrl?: string): Promise<void> {
    if (this.socket?.connected) {
      return;
    }

    // Initialize user session if not already done
    const userId = await authService.initializeUserSession();
    if (userId) {
      this.userId = userId;
    }

    const token = await authService.getAccessToken();
    console.log("Token:", token);
    this.socket = io(process.env.NEXT_PUBLIC_API_URL, {
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return new Promise((resolve, reject) => {
      if (!this.socket) {
        reject(new Error("Socket not initialized"));
        return;
      }

      this.socket.on("connect", () => {
        console.log("Connected to server:", this.socket?.id);
        this.isConnected = true;
        resolve();
      });

      this.socket.on("disconnect", () => {
        console.log("Disconnected from server");
        this.isConnected = false;
      });

      this.socket.on("connect_error", (error) => {
        console.error("Connection error:", error);
        this.isConnected = false;
        reject(error);
      });

      // Timeout après 10 secondes
      setTimeout(() => {
        if (!this.socket?.connected) {
          reject(new Error("Connection timeout"));
        }
      }, 10000);
    });
  }

  async joinGameRoom(
    request: Omit<JoinGameRoomRequest, "token">
  ): Promise<JoinGameRoomResponse> {
    if (!this.socket?.connected) {
      await this.connect();
    }

    if (!this.socket) {
      throw new Error("Socket not available");
    }

    // Récupérer le token d'authentification
    const accessToken = await authService.getAccessToken();
    if (!accessToken) {
      throw new Error("No access token available");
    }

    // Ajouter le token à la requête
    const requestWithToken: JoinGameRoomRequest = {
      ...request,
      token: accessToken,
    };

    return new Promise((resolve, reject) => {
      this.socket!.emit(
        "joinGameRoom",
        requestWithToken,
        (response: JoinGameRoomResponse) => {
          if (response.success) {
            this.currentGameId = request.gameId;
            this.connectionType = request.type;
            console.log(
              `Joined game room dgd-${request.gameId} as ${request.type}`
            );
          }
          resolve(response);
        }
      );

      // Timeout après 5 secondes
      setTimeout(() => {
        reject(new Error("Join game room timeout"));
      }, 5000);
    });
  }

  async leaveGameRoom(): Promise<void> {
    if (this.socket && this.currentGameId) {
      this.socket.emit("leaveRoom", { gameId: this.currentGameId });
      this.currentGameId = null;
      this.connectionType = null;
    }
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.currentGameId = null;
      this.connectionType = null;
    }
  }

  // Écouter les événements de la partie
  on<K extends keyof GameRoomEvents>(
    event: K,
    callback: GameRoomEvents[K]
  ): void {
    if (this.socket) {
      this.socket.on(event, callback as any);
    }
  }

  // Arrêter d'écouter un événement
  off<K extends keyof GameRoomEvents>(
    event: K,
    callback?: GameRoomEvents[K]
  ): void {
    if (this.socket) {
      if (callback) {
        this.socket.off(event, callback as any);
      } else {
        this.socket.off(event);
      }
    }
  }

  // Émettre un événement (seulement pour les joueurs actifs)
  emit(event: string, data: unknown): void {
    if (this.socket && this.connectionType === ConnectionType.PLAYER) {
      this.socket.emit(event, data);
    } else {
      console.warn("Cannot emit events as spectator");
    }
  }

  // Envoyer un message dans le chat
  async sendMessage(
    gameId: string,
    message: string
  ): Promise<{ success: boolean; message?: unknown }> {
    if (!this.socket || this.connectionType !== ConnectionType.PLAYER) {
      throw new Error("Cannot send messages as spectator");
    }

    return new Promise((resolve, reject) => {
      this.socket!.emit(
        "sendMessage",
        { gameId, message },
        (response: { success: boolean; message?: unknown }) => {
          resolve(response);
        }
      );

      setTimeout(() => {
        reject(new Error("Send message timeout"));
      }, 5000);
    });
  }

  // Quitter la partie
  async leaveGame(gameId: string): Promise<{ success: boolean }> {
    if (!this.socket) {
      throw new Error("Socket not available");
    }

    return new Promise((resolve, reject) => {
      this.socket!.emit(
        "leaveGame",
        { gameId },
        (response: { success: boolean }) => {
          resolve(response);
        }
      );

      setTimeout(() => {
        reject(new Error("Leave game timeout"));
      }, 5000);
    });
  }

  // Obtenir les informations de connexion
  getConnectionInfo(): { gameId: string | null; type: ConnectionType | null } {
    return {
      gameId: this.currentGameId,
      type: this.connectionType,
    };
  }

  // Vérifier si on est un joueur actif
  isPlayer(): boolean {
    return this.connectionType === ConnectionType.PLAYER;
  }

  // Vérifier si on est un spectateur
  isSpectator(): boolean {
    return this.connectionType === ConnectionType.SPECTATOR;
  }

  // ===== MÉTHODES GÉNÉRALES DE SOCKET =====

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
   * Update user information
   */
  updateUser(userId: string) {
    this.userId = userId;
  }

  /**
   * Join a socket room
   */
  async joinRoom(roomName: string): Promise<void> {
    if (!this.socket || !this.isSocketConnected()) {
      throw new Error("Socket not connected");
    }

    return new Promise((resolve, reject) => {
      this.socket!.emit(
        "joinRoom",
        { roomName },
        (response: { success: boolean; error?: string }) => {
          if (response.success) {
            console.log(`Joined room: ${roomName}`);
            resolve();
          } else {
            console.error(`Failed to join room ${roomName}:`, response.error);
            reject(new Error(response.error || "Failed to join room"));
          }
        }
      );
    });
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
