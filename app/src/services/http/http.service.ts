import { errorService } from "@/services/error/error.service";
import { authService } from "@/services/auth.service";
import { useGameStore } from "@/store/game/game";

class HttpService {
  private static instance: HttpService;
  private baseURL: string;

  private constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || "";
  }

  static getInstance() {
    if (!HttpService.instance) {
      HttpService.instance = new HttpService();
    }
    return HttpService.instance;
  }

  private async getAuthHeaders(): Promise<HeadersInit> {
    const token = await authService.getAccessToken();
    const playerId = useGameStore.getState().getCurrentPlayerId();

    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(playerId && { "X-Player-ID": playerId }),
    };
  }

  private async handleResponse(response: Response) {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const error = {
        response: {
          status: response.status,
          data: errorData,
        },
      };
      throw error;
    }
    return response.json();
  }

  async get<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: "GET",
        headers: await this.getAuthHeaders(),
      });
      return await this.handleResponse(response);
    } catch (error) {
      errorService.handleApiError(error);
      throw error;
    }
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: "POST",
        headers: await this.getAuthHeaders(),
        body: data ? JSON.stringify(data) : undefined,
      });
      return await this.handleResponse(response);
    } catch (error) {
      errorService.handleApiError(error);
      throw error;
    }
  }

  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: "PUT",
        headers: await this.getAuthHeaders(),
        body: data ? JSON.stringify(data) : undefined,
      });
      return await this.handleResponse(response);
    } catch (error) {
      errorService.handleApiError(error);
      throw error;
    }
  }

  async delete<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: "DELETE",
        headers: await this.getAuthHeaders(),
      });
      return await this.handleResponse(response);
    } catch (error) {
      errorService.handleApiError(error);
      throw error;
    }
  }
}

export const httpService = HttpService.getInstance();
