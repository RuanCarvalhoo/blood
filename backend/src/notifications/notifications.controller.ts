import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Patch,
  Query,
} from "@nestjs/common";
import { NotificationsService } from "./notifications.service";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("notifications")
@Controller("notifications")
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post("register-token")
  @ApiOperation({ summary: "Registrar token de push notification" })
  @ApiResponse({ status: 200, description: "Token registrado com sucesso" })
  async registerToken(@Body() body: { userId: string; expoPushToken: string }) {
    await this.notificationsService.registerPushToken(
      body.userId,
      body.expoPushToken
    );
    return { success: true };
  }

  @Patch("preferences/:userId")
  @ApiOperation({ summary: "Atualizar preferências de notificação" })
  @ApiResponse({
    status: 200,
    description: "Preferências atualizadas com sucesso",
  })
  async updatePreferences(
    @Param("userId") userId: string,
    @Body() body: { enabled: boolean; reminderDaysBefore?: number }
  ) {
    await this.notificationsService.updateNotificationPreferences(
      userId,
      body.enabled,
      body.reminderDaysBefore
    );
    return { success: true };
  }

  @Get("user/:userId")
  @ApiOperation({ summary: "Listar notificações do usuário" })
  @ApiResponse({ status: 200, description: "Lista de notificações" })
  async getUserNotifications(
    @Param("userId") userId: string,
    @Query("limit") limit?: string
  ) {
    const notifications = await this.notificationsService.getUserNotifications(
      userId,
      limit ? parseInt(limit) : 50
    );
    return notifications;
  }

  @Get("user/:userId/unread-count")
  @ApiOperation({ summary: "Contar notificações não lidas" })
  @ApiResponse({ status: 200, description: "Contagem de não lidas" })
  async getUnreadCount(@Param("userId") userId: string) {
    const count = await this.notificationsService.getUnreadCount(userId);
    return { count };
  }

  @Patch(":id/read")
  @ApiOperation({ summary: "Marcar notificação como lida" })
  @ApiResponse({ status: 200, description: "Notificação marcada como lida" })
  async markAsRead(@Param("id") id: string) {
    await this.notificationsService.markAsRead(id);
    return { success: true };
  }

  @Post("test/:userId")
  @ApiOperation({ summary: "Enviar notificação de teste (desenvolvimento)" })
  @ApiResponse({ status: 200, description: "Notificação de teste enviada" })
  async sendTest(@Param("userId") userId: string) {
    await this.notificationsService.sendPushNotification({
      userId,
      type: "DONATION_REMINDER" as any,
      title: "Teste de Notificação",
      body: "Esta é uma notificação de teste do sistema Blood Donation!",
      data: { test: true },
    });
    return { success: true };
  }
}
