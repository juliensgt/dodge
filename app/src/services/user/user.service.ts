import { httpService } from "../http/http.service";
import { User } from "@/types/auth/user.types";

class UserService {
  async getUser(userId: string): Promise<User> {
    const user = await httpService.get<User>(`/users/${userId}`);
    return user;
  }
}

export const userService = new UserService();
