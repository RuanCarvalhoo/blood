import { Module } from "@nestjs/common";
import { AppController } from "@/app.controller";
import { UsersModule } from "@/users/users.module";
import { PrismaModule } from "@/infrastructure/prisma/prisma.module";
import { InfrastructureModule } from "@/infrastructure/infrastructure.module";
import { ConfigModule } from "@/config/config.module";

@Module({
  imports: [ConfigModule, PrismaModule, InfrastructureModule, UsersModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
