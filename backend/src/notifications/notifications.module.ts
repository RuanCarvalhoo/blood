import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { NotificationsService } from "./notifications.service";
import { NotificationsController } from "./notifications.controller";
import { NotificationScheduler } from "./notification.scheduler";
import { InfrastructureModule } from "@/infrastructure/infrastructure.module";

@Module({
  imports: [InfrastructureModule, ScheduleModule.forRoot()],
  providers: [NotificationsService, NotificationScheduler],
  controllers: [NotificationsController],
  exports: [NotificationsService],
})
export class NotificationsModule {}
