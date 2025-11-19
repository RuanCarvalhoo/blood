import { Injectable, Logger } from "@nestjs/common";
import { Expo, ExpoPushMessage, ExpoPushTicket } from "expo-server-sdk";
import { PrismaService } from "@/infrastructure/prisma/prisma.service";
import { NotificationType, NotificationStatus, Prisma } from "@prisma/client";

export interface SendNotificationDto {
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  data?: Record<string, any>;
}

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);
  private expo: Expo;

  constructor(private readonly prisma: PrismaService) {
    this.expo = new Expo();
  }

  async registerPushToken(userId: string, expoPushToken: string) {
    if (!Expo.isExpoPushToken(expoPushToken)) {
      throw new Error("Invalid Expo push token");
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: { expoPushToken },
    });

    this.logger.log(`Push token registered for user ${userId}`);
  }

  async updateNotificationPreferences(
    userId: string,
    enabled: boolean,
    reminderDaysBefore?: number
  ) {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        notificationsEnabled: enabled,
        ...(reminderDaysBefore !== undefined && { reminderDaysBefore }),
      },
    });
  }

  async createNotification(dto: SendNotificationDto) {
    return this.prisma.notification.create({
      data: {
        userId: dto.userId,
        type: dto.type,
        title: dto.title,
        body: dto.body,
        data: dto.data as Prisma.InputJsonValue,
        status: NotificationStatus.PENDING,
      },
    });
  }

  async sendPushNotification(dto: SendNotificationDto): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id: dto.userId },
      select: { expoPushToken: true, notificationsEnabled: true },
    });

    if (!user?.notificationsEnabled || !user?.expoPushToken) {
      this.logger.warn(
        `User ${dto.userId} has notifications disabled or no push token`
      );
      return;
    }

    const notification = await this.createNotification(dto);

    const message: ExpoPushMessage = {
      to: user.expoPushToken,
      sound: "default",
      title: dto.title,
      body: dto.body,
      data: dto.data,
    };

    try {
      const tickets = await this.expo.sendPushNotificationsAsync([message]);
      const ticket = tickets[0] as ExpoPushTicket;

      if (ticket.status === "error") {
        this.logger.error(
          `Error sending notification: ${ticket.message}`,
          ticket.details
        );
        await this.updateNotificationStatus(
          notification.id,
          NotificationStatus.FAILED
        );
      } else {
        await this.updateNotificationStatus(
          notification.id,
          NotificationStatus.SENT
        );
        this.logger.log(`Notification sent to user ${dto.userId}`);
      }
    } catch (error) {
      this.logger.error(`Failed to send push notification`, error);
      await this.updateNotificationStatus(
        notification.id,
        NotificationStatus.FAILED
      );
      throw error;
    }
  }

  async sendBulkNotifications(dtos: SendNotificationDto[]): Promise<void> {
    const messages: ExpoPushMessage[] = [];
    const notificationRecords = [];

    for (const dto of dtos) {
      const user = await this.prisma.user.findUnique({
        where: { id: dto.userId },
        select: { expoPushToken: true, notificationsEnabled: true },
      });

      if (user?.notificationsEnabled && user?.expoPushToken) {
        const notification = await this.createNotification(dto);
        notificationRecords.push(notification);

        messages.push({
          to: user.expoPushToken,
          sound: "default",
          title: dto.title,
          body: dto.body,
          data: dto.data,
        });
      }
    }

    if (messages.length === 0) {
      this.logger.warn("No eligible recipients for bulk notification");
      return;
    }

    try {
      const chunks = this.expo.chunkPushNotifications(messages);
      for (const chunk of chunks) {
        await this.expo.sendPushNotificationsAsync(chunk);
      }

      for (const notification of notificationRecords) {
        await this.updateNotificationStatus(
          notification.id,
          NotificationStatus.SENT
        );
      }

      this.logger.log(`Sent ${messages.length} bulk notifications`);
    } catch (error) {
      this.logger.error("Failed to send bulk notifications", error);
      throw error;
    }
  }

  async notifyDonationReminder(userId: string, nextDonationDate: Date) {
    await this.sendPushNotification({
      userId,
      type: NotificationType.DONATION_REMINDER,
      title: "Lembrete de Doação 🩸",
      body: `Você já pode doar novamente! Sua próxima doação está disponível desde ${nextDonationDate.toLocaleDateString(
        "pt-BR"
      )}`,
      data: { type: "donation_reminder", date: nextDonationDate.toISOString() },
    });
  }

  async notifyBadgeEarned(userId: string, badgeName: string) {
    await this.sendPushNotification({
      userId,
      type: NotificationType.BADGE_EARNED,
      title: "Nova Conquista! 🏆",
      body: `Parabéns! Você desbloqueou o badge "${badgeName}"`,
      data: { type: "badge_earned", badgeName },
    });
  }

  async notifyLevelUp(userId: string, oldLevel: number, newLevel: number) {
    await this.sendPushNotification({
      userId,
      type: NotificationType.LEVEL_UP,
      title: "Level Up! ⬆️",
      body: `Você subiu do nível ${oldLevel} para o nível ${newLevel}!`,
      data: { type: "level_up", oldLevel, newLevel },
    });
  }

  async notifyCampaignAlert(
    userId: string,
    campaignTitle: string,
    urgency: string
  ) {
    await this.sendPushNotification({
      userId,
      type: NotificationType.CAMPAIGN_ALERT,
      title: `${urgency === "HIGH" ? "🚨 URGENTE" : "📢"} Nova Campanha`,
      body: campaignTitle,
      data: { type: "campaign_alert", campaignTitle, urgency },
    });
  }

  async getUserNotifications(userId: string, limit = 50) {
    return this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  }

  async markAsRead(notificationId: string) {
    return this.prisma.notification.update({
      where: { id: notificationId },
      data: {
        status: NotificationStatus.READ,
        readAt: new Date(),
      },
    });
  }

  async getUnreadCount(userId: string): Promise<number> {
    return this.prisma.notification.count({
      where: {
        userId,
        status: { in: [NotificationStatus.PENDING, NotificationStatus.SENT] },
      },
    });
  }

  private async updateNotificationStatus(
    id: string,
    status: NotificationStatus
  ) {
    await this.prisma.notification.update({
      where: { id },
      data: {
        status,
        ...(status === NotificationStatus.SENT && { sentAt: new Date() }),
      },
    });
  }

  async checkAndSendDonationReminders() {
    const users = await this.prisma.user.findMany({
      where: {
        notificationsEnabled: true,
        nextDonationDate: {
          lte: new Date(),
        },
        expoPushToken: { not: null },
      },
    });

    this.logger.log(
      `Found ${users.length} users eligible for donation reminders`
    );

    for (const user of users) {
      if (user.nextDonationDate) {
        try {
          await this.notifyDonationReminder(user.id, user.nextDonationDate);
        } catch (error) {
          this.logger.error(
            `Failed to send reminder to user ${user.id}`,
            error
          );
        }
      }
    }
  }
}
