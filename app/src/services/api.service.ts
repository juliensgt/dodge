interface UserDetails {
  _id: string;
  name: string;
  email?: string;
  skinCards: string;
  language: string;
  createdAt: string;
  updatedAt: string;
}

interface UserUpdateData {
  name?: string;
  email?: string;
  skinCards?: string;
  language?: string;
}

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(
        `API request failed: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  }

  // User API methods
  async getUserDetails(userId: string): Promise<UserDetails> {
    return this.request<UserDetails>(`/users/${userId}`);
  }

  async updateUser(
    userId: string,
    userData: UserUpdateData
  ): Promise<UserDetails> {
    return this.request<UserDetails>(`/users/${userId}`, {
      method: "PUT",
      body: JSON.stringify(userData),
    });
  }

  async createUser(userData: {
    name: string;
    email?: string;
    language?: string;
    skinCards?: string;
  }): Promise<UserDetails> {
    return this.request<UserDetails>("/users", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  }
}

export const apiService = new ApiService();
export default apiService;
