// services/sockets.service.ts
import { io, Socket } from "socket.io-client";
import { useSocketsStore } from "@/store/sockets/sockets.store";
import authService from "../auth.service";
import { gameService } from "@/services/game/game.service";
import { errorService } from "../error/error.service";

class SocketService {
  private static instance: SocketService;

  private constructor() {}

  static getInstance() {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  async initializeSocket(gameId: string): Promise<Socket> {
    const user = await authService.getCurrentUser();
    const accessToken = await authService.getAccessToken();
    if (!user || !accessToken) {
      throw new Error("No user or access token available");
    }

    const socket: Socket = io(process.env.NEXT_PUBLIC_API_URL, {
      extraHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
      query: {
        gameId,
        userId: user.id,
      },
    });
    return socket;
  }

  async joinGame(gameId: string) {
    const { socket: actualSocket, currentGameId } = useSocketsStore.getState();

    // If socket is already connected to the same game, do nothing
    if (actualSocket && actualSocket.connected && currentGameId === gameId) {
      return;
    }

    // If socket is connected to a different game, disconnect first
    if (actualSocket && actualSocket.connected && currentGameId !== gameId) {
      this.disconnect();
    }

    // initialize socket
    const socket = await this.initializeSocket(gameId);

    // setup listeners
    socket.on("connect", () => {
      this.connect(socket, gameId);
    });

    socket.on("disconnect", () => {
      this.disconnect();
    });

    // Intercepte r les erreurs WebSocket
    socket.on("error", (error) => {
      console.error("WebSocket error:", error);
      errorService.handleWebSocketError(error);
    });

    gameService.setupGameEventListeners(socket);
  }

  connect(socket: Socket, gameId: string) {
    const { setSocket, setIsConnected, setCurrentGameId } =
      useSocketsStore.getState();
    setSocket(socket);
    setIsConnected(true);
    setCurrentGameId(gameId);
  }

  emit(event: string, data?: unknown) {
    const { getSocket } = useSocketsStore.getState();
    const socket = getSocket();
    if (socket) {
      socket.emit(event, data);
    }
  }

  on(event: string, callback: (...args: unknown[]) => void) {
    const { getSocket } = useSocketsStore.getState();
    const socket = getSocket();
    if (socket) {
      socket.on(event, callback);
    }
  }

  disconnect() {
    const { socket, setSocket, setIsConnected, setCurrentGameId } =
      useSocketsStore.getState();
    if (socket) {
      socket.removeAllListeners();
      socket.disconnect();
      setSocket(null);
      setIsConnected(false);
      setCurrentGameId(null);
    }
  }
}

export const socketService = SocketService.getInstance();
