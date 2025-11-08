import { registerAs } from "@nestjs/config";

export const appConfig = registerAs("app", () => ({
  nodeEnv: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT || "4000", 10),
}));

export const databaseConfig = registerAs("database", () => ({
  url: process.env.DATABASE_URL,
}));

export const authConfig = registerAs("auth", () => ({
  jwtSecret: process.env.JWT_SECRET,
}));

export interface AppConfig {
  nodeEnv: string;
  port: number;
}

export interface DatabaseConfig {
  url: string;
}

export interface AuthConfig {
  jwtSecret: string;
}
