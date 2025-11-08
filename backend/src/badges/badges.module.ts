import { Module } from "@nestjs/common";
import { BadgesController } from "./badges.controller";
import { BadgesService } from "./badges.service";
import { InfrastructureModule } from "@/infrastructure/infrastructure.module";

@Module({
  imports: [InfrastructureModule],
  controllers: [BadgesController],
  providers: [BadgesService],
  exports: [BadgesService],
})
export class BadgesModule {}
