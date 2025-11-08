import { Module } from "@nestjs/common";
import { DonationsController } from "./donations.controller";
import { DonationsService } from "./donations.service";
import { InfrastructureModule } from "@/infrastructure/infrastructure.module";
import { BadgesModule } from "@/badges/badges.module";

@Module({
  imports: [InfrastructureModule, BadgesModule],
  controllers: [DonationsController],
  providers: [DonationsService],
  exports: [DonationsService],
})
export class DonationsModule {}
