import { Module } from "@nestjs/common";
import { ConfigModule as NestConfigModule } from "@nestjs/config";
import { validateEnv } from "./env.validation";
import { appConfig, databaseConfig, authConfig } from "./configuration";

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validate: validateEnv,
      load: [appConfig, databaseConfig, authConfig],
    }),
  ],
  exports: [NestConfigModule],
})
export class ConfigModule {}
