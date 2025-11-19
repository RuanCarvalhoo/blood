import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { NotificationsService } from "@/notifications/notifications.service";

@Injectable()
export class NotificationScheduler {
  private readonly logger = new Logger(NotificationScheduler.name);

  constructor(private readonly notificationsService: NotificationsService) {}

  // Runs every day at 9:00 AM
  @Cron("0 9 * * *")
  async handleDonationReminders() {
    this.logger.log("Running donation reminder job");
    try {
      await this.notificationsService.checkAndSendDonationReminders();
    } catch (error) {
      this.logger.error("Failed to send donation reminders", error);
    }
  }

  // Runs every Monday at 10:00 AM
  @Cron("0 10 * * 1")
  async handleWeeklyEngagement() {
    this.logger.log("Running weekly engagement job");
    // Future: Send weekly stats, motivational messages, etc.
  }
}
