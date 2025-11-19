import { Module } from "@nestjs/common";
import { DonationsController } from "./donations.controller";
import { DonationsService } from "./donations.service";
import { InfrastructureModule } from "@/infrastructure/infrastructure.module";
import { BadgesModule } from "@/badges/badges.module";
import { LevelsModule } from "@/levels/levels.module";
import { NotificationsModule } from "@/notifications/notifications.module";

@Module({
  imports: [
    InfrastructureModule,
    BadgesModule,
    LevelsModule,
    NotificationsModule,
  ],
  controllers: [DonationsController],
  providers: [DonationsService],
  exports: [DonationsService],
})
export class DonationsModule {}
