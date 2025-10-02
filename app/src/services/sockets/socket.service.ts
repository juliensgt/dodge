// services/sockets.service.ts
import { io, Socket } from "socket.io-client";
import { useSocketsStore } from "@/store/sockets/sockets.store";
import authService from "../auth.service";

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
      },
    });
    return socket;
  }

  async joinGame(gameId: string) {
    const { socket: actualSocket } = useSocketsStore.getState();

    //check if socket is already connected
    if (actualSocket && actualSocket.connected) {
      return;
    }

    // initialize socket
    const socket = await this.initializeSocket(gameId);

    // setup listeners
    socket.on("connect", () => {
      socket.emit("joinGame", { gameId });
      this.connect(socket, gameId);
    });

    socket.on("disconnect", () => {
      this.disconnect();
    });
  }

  connect(socket: Socket, gameId: string) {
    const { setSocket, setIsConnected, setCurrentGameId } =
      useSocketsStore.getState();
    setSocket(socket);
    setIsConnected(true);
    setCurrentGameId(gameId);

    //TODO : set game data
    console.log("Socket connected");
  }

  disconnect() {
    const { getSocket, setIsConnected } = useSocketsStore.getState();
    const socket = getSocket();
    if (socket) {
      socket.disconnect();
      setIsConnected(false);
    }
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
}

export const socketService = SocketService.getInstance();
