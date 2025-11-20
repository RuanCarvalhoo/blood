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
  weight?: number;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Mock User Data
const MOCK_USER: User = {
  id: "1",
  name: "Usuário de Teste",
  email: "teste@exemplo.com",
  bloodType: "O+",
  gender: "male",
  level: 5,
  points: 1250,
  totalDonations: 8,
  totalDonationsThisYear: 2,
  badges: [],
  lastDonationDate: new Date("2023-08-15"),
  weight: 70,
  profileCustomization: {
    cardTheme: "default",
    avatarFrame: "none",
    profileTheme: "light",
  },
};

class AuthService {
  /**
   * Register a new user
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    console.log("MOCK REGISTER:", data);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newUser: User = {
      ...MOCK_USER,
      name: data.name,
      email: data.email,
      bloodType: data.bloodType,
      gender: data.gender === "MALE" ? "male" : "female",
      weight: data.weight,
    };

    return {
      token: "mock-jwt-token",
      user: newUser,
    };
  }

  /**
   * Login user
   */
  async login(data: LoginData): Promise<AuthResponse> {
    console.log("MOCK LOGIN:", data);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      token: "mock-jwt-token",
      user: {
        ...MOCK_USER,
        email: data.email,
      },
    };
  }

  /**
   * Logout user
   */
  logout() {
    httpClient.setToken(null);
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
