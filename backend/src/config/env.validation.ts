import { z } from "zod";

export const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z
    .string()
    .transform((v) => parseInt(v, 10))
    .default("4000"),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
});

export type EnvironmentVariables = z.infer<typeof envSchema>;

export function validateEnv(config: Record<string, unknown>) {
  const result = envSchema.safeParse(config);

  if (!result.success) {
    const errors = result.error.format();
    throw new Error(
      `Environment validation failed:\n${JSON.stringify(errors, null, 2)}`
    );
  }

  return result.data;
}
