import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import * as Notifications from "expo-notifications";
import { useNavigation } from "@react-navigation/native";
import type { NavigationContainerRefWithCurrent } from "@react-navigation/native";
import {
  registerForPushNotificationsAsync,
  addNotificationReceivedListener,
  addNotificationResponseReceivedListener,
  setBadgeCount,
} from "@/services/notificationService";
import { API_BASE_URL } from "@/config/api";
import { useAuth } from "./AuthContext";
import { RootStackParamList } from "@/types";

interface NotificationContextState {
  expoPushToken: string | null;
  notification: Notifications.Notification | null;
  unreadCount: number;
  refreshUnreadCount: () => Promise<void>;
  navigationRef: React.RefObject<NavigationContainerRefWithCurrent<RootStackParamList> | null>;
}

const NotificationContext = createContext<NotificationContextState | undefined>(
  undefined
);

interface NotificationProviderProps {
  children: React.ReactNode;
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  const { user, token } = useAuth();
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [notification, setNotification] =
    useState<Notifications.Notification | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigationRef =
    useRef<NavigationContainerRefWithCurrent<RootStackParamList> | null>(null);

  const handleNotificationResponse = (
    response: Notifications.NotificationResponse
  ) => {
    console.log("Notification tapped:", response);
    const data = response.notification.request.content.data;

    // Wait for navigation to be ready
    setTimeout(() => {
      if (navigationRef.current?.isReady()) {
        if (data?.type === "donation_reminder") {
          navigationRef.current.navigate("Schedule" as any);
        } else if (data?.type === "badge_earned") {
          navigationRef.current.navigate("Profile" as any);
        } else if (data?.type === "level_up") {
          navigationRef.current.navigate("Profile" as any);
        } else if (data?.type === "campaign_alert") {
          navigationRef.current.navigate("Home" as any);
        } else if (data?.type === "next_donation_available") {
          navigationRef.current.navigate("Schedule" as any);
        }
      }
    }, 100);
  };

  useEffect(() => {
    if (user && token) {
      registerForPushNotificationsAsync().then(async (token) => {
        if (token) {
          setExpoPushToken(token);
          // Register token with backend
          try {
            await fetch(`${API_BASE_URL}/notifications/register-token`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userId: user.id,
                expoPushToken: token,
              }),
            });
            console.log("Push token registered with backend");
          } catch (error) {
            console.error("Failed to register push token", error);
          }
        }
      });

      // Fetch initial unread count
      refreshUnreadCount();

      // Listen for received notifications
      const notificationListener = addNotificationReceivedListener(
        (notification) => {
          setNotification(notification);
          refreshUnreadCount();
        }
      );

      // Listen for notification taps
      const responseListener = addNotificationResponseReceivedListener(
        handleNotificationResponse
      );

      return () => {
        notificationListener.remove();
        responseListener.remove();
      };
    }
  }, [user, token]);

  const refreshUnreadCount = async () => {
    if (!user) return;

    try {
      const response = await fetch(
        `${API_BASE_URL}/notifications/user/${user.id}/unread-count`
      );
      const data = await response.json();
      setUnreadCount(data.count);
      await setBadgeCount(data.count);
    } catch (error) {
      console.error("Failed to fetch unread count", error);
    }
  };

  const value: NotificationContextState = {
    expoPushToken,
    notification,
    unreadCount,
    refreshUnreadCount,
    navigationRef,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications(): NotificationContextState {
  const context = useContext(NotificationContext);

  if (context === undefined) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider"
    );
  }

  return context;
}
