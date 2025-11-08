import { Module } from "@nestjs/common";
import { AppController } from "@/app.controller";
import { PrismaModule } from "@/infrastructure/prisma/prisma.module";
import { ConfigModule } from "@/config/config.module";
import { InfrastructureModule } from "@/infrastructure/infrastructure.module";
import { UsersModule } from "@/users/users.module";
import { DonationsModule } from "@/donation/donations.module";
import { BadgesModule } from "@/badges/badges.module";
import { LevelsModule } from "@/levels/levels.module";

@Module({
  imports: [
    ConfigModule,
    PrismaModule,
    InfrastructureModule,
    UsersModule,
    DonationsModule,
    BadgesModule,
    LevelsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
