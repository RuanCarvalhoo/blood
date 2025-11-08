import { httpClient } from "./httpClient";
import { API_ENDPOINTS } from "@/config/api";
import { User, BloodType } from "@/types";

/**
 * Auth Service
 * Handles user authentication and registration
 */

export interface RegisterData {
  name: string;
  telephone: string;
  email: string;
  password: string;
  bloodType: BloodType;
  gender: "MALE" | "FEMALE";
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

class AuthService {
  /**
   * Register a new user
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    // Convert frontend BloodType format to backend format
    const bloodTypeMap: Record<BloodType, string> = {
      "A+": "A_POS",
      "A-": "A_NEG",
      "B+": "B_POS",
      "B-": "B_NEG",
      "AB+": "AB_POS",
      "AB-": "AB_NEG",
      "O+": "O_POS",
      "O-": "O_NEG",
    };

    const backendData = {
      ...data,
      bloodType: bloodTypeMap[data.bloodType],
    };

    const response = await httpClient.post<AuthResponse>(
      API_ENDPOINTS.REGISTER,
      backendData
    );

    // Store token
    if (response.token) {
      httpClient.setToken(response.token);
      // TODO: Store token in AsyncStorage for persistence
    }

    return response;
  }

  /**
   * Login user
   */
  async login(data: LoginData): Promise<AuthResponse> {
    const response = await httpClient.post<AuthResponse>(
      API_ENDPOINTS.LOGIN,
      data
    );

    // Store token
    if (response.token) {
      httpClient.setToken(response.token);
      // TODO: Store token in AsyncStorage for persistence
    }

    return response;
  }

  /**
   * Logout user
   */
  logout() {
    httpClient.setToken(null);
    // TODO: Remove token from AsyncStorage
  }

  /**
   * Set authentication token
   */
  setToken(token: string) {
    httpClient.setToken(token);
  }

  /**
   * Get current token
   */
  getToken(): string | null {
    return httpClient.getToken();
  }
}

export const authService = new AuthService();
