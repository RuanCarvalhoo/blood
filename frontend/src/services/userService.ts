import { httpClient } from "./httpClient";
import { API_ENDPOINTS } from "@/config/api";
import { User } from "@/types";

class UserService {

  async getProfile(userId: string): Promise<User> {
    const response = await httpClient.get<User>(
      API_ENDPOINTS.USER_PROFILE(userId)
    );

    return response;
  }

  async updateProfile(userId: string, data: Partial<User>): Promise<User> {
    // TODO: Implement update profile
    throw new Error("Not implemented yet");
  }
}

export const userService = new UserService();
