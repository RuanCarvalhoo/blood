import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function registerForPushNotificationsAsync(): Promise<
  string | undefined
> {
  let token: string | undefined;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#E74C3C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      console.warn("Failed to get push token for push notification!");
      return;
    }

    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: "your-project-id", // Será configurado no app.json
      })
    ).data;
  } else {
    console.warn("Must use physical device for Push Notifications");
  }

  return token;
}

export function addNotificationReceivedListener(
  callback: (notification: Notifications.Notification) => void
) {
  return Notifications.addNotificationReceivedListener(callback);
}

export function addNotificationResponseReceivedListener(
  callback: (response: Notifications.NotificationResponse) => void
) {
  return Notifications.addNotificationResponseReceivedListener(callback);
}

export async function schedulePushNotification(
  title: string,
  body: string,
  data?: any,
  trigger?: Notifications.NotificationTriggerInput
) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data,
      sound: "default",
    },
    trigger: trigger || { seconds: 2, type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL },
  });
}

export async function cancelAllScheduledNotifications() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

export async function getBadgeCount(): Promise<number> {
  return await Notifications.getBadgeCountAsync();
}

export async function setBadgeCount(count: number) {
  await Notifications.setBadgeCountAsync(count);
}

export async function scheduleDonationReminder(lastDonationDate: Date, gender: 'male' | 'female') {
  // 60 days for men, 90 for women (approx) - using constant would be better but avoiding circular deps if any
  const intervalDays = gender === 'male' ? 60 : 90; 
  
  const nextDate = new Date(lastDonationDate);
  nextDate.setDate(nextDate.getDate() + intervalDays);
  
  const now = new Date();
  // Calculate seconds until the date. If date is past, don't schedule.
  const secondsUntil = Math.floor((nextDate.getTime() - now.getTime()) / 1000);

  if (secondsUntil > 0) {
    await schedulePushNotification(
      "Você já pode doar sangue!",
      "Seu intervalo de recuperação acabou. Agende sua doação e salve vidas!",
      { type: "reminder" },
      { seconds: secondsUntil, type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL }
    );
  }
}

export async function scheduleEngagementNotification() {
  // Schedule a "tip" notification for 10 seconds from now (for demo)
  await schedulePushNotification(
    "Você sabia?",
    "Uma única doação pode salvar até 4 vidas. Continue sendo um herói!",
    { type: "tip" },
    { seconds: 10, type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL }
  );
}
