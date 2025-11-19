import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  Container,
  Card,
  Title,
  Subtitle,
  Text,
  SmallText,
  Row,
  Button,
  ButtonText,
} from "@/components/StyledComponents";
import { COLORS } from "@/constants";
import { RootStackParamList } from "@/types";
import { useAuth, useNotifications } from "@/contexts";
import { API_BASE_URL } from "@/config/api";

type NotificationsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Notifications"
>;

interface Notification {
  id: string;
  type: string;
  title: string;
  body: string;
  status: string;
  createdAt: string;
  readAt: string | null;
}

export default function NotificationsScreen() {
  const navigation = useNavigation<NotificationsScreenNavigationProp>();
  const { user, token } = useAuth();
  const { unreadCount, refreshUnreadCount } = useNotifications();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchNotifications();
      fetchPreferences();
    }
  }, [user]);

  const fetchNotifications = async () => {
    if (!user) return;

    try {
      const response = await fetch(
        `${API_BASE_URL}/notifications/user/${user.id}`,
        {
          headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
      }
    } catch (error) {
      console.error("Failed to fetch notifications", error);
    }
  };

  const fetchPreferences = async () => {
    // Get from user object if available
    setNotificationsEnabled(user?.notificationsEnabled ?? true);
  };

  const handleToggleNotifications = async (value: boolean) => {
    if (!user) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/notifications/preferences/${user.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify({ enabled: value }),
        }
      );

      if (response.ok) {
        setNotificationsEnabled(value);
        const message = value
          ? "Notificações ativadas!"
          : "Notificações desativadas";

        if (Platform.OS === "web") {
          alert(message);
        } else {
          Alert.alert("Sucesso", message);
        }
      }
    } catch (error) {
      console.error("Failed to update preferences", error);
      if (Platform.OS === "web") {
        alert("Erro ao atualizar preferências");
      } else {
        Alert.alert("Erro", "Não foi possível atualizar as preferências");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await fetch(`${API_BASE_URL}/notifications/${notificationId}/read`, {
        method: "PATCH",
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      // Update local state
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === notificationId
            ? { ...n, status: "READ", readAt: new Date().toISOString() }
            : n
        )
      );

      refreshUnreadCount();
    } catch (error) {
      console.error("Failed to mark as read", error);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "DONATION_REMINDER":
        return "calendar";
      case "BADGE_EARNED":
        return "trophy";
      case "LEVEL_UP":
        return "arrow-up-circle";
      case "CAMPAIGN_ALERT":
        return "megaphone";
      default:
        return "notifications";
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Container>
      <StatusBar style="dark" />
      <ScrollView style={{ flex: 1 }}>
        <Row style={{ alignItems: "center", marginTop: 50, marginBottom: 20 }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginRight: 16 }}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.dark} />
          </TouchableOpacity>
          <Title>Notificações</Title>
          {unreadCount > 0 && (
            <View
              style={{
                backgroundColor: COLORS.danger,
                borderRadius: 12,
                paddingHorizontal: 8,
                paddingVertical: 2,
                marginLeft: 8,
              }}
            >
              <SmallText style={{ color: COLORS.white, fontWeight: "bold" }}>
                {unreadCount}
              </SmallText>
            </View>
          )}
        </Row>

        <Card>
          <Row
            style={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <View style={{ flex: 1 }}>
              <Subtitle>Receber Notificações</Subtitle>
              <SmallText style={{ marginTop: 4, color: COLORS.gray }}>
                Ative para receber lembretes de doação e conquistas
              </SmallText>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={handleToggleNotifications}
              disabled={isLoading}
              trackColor={{ false: COLORS.gray, true: COLORS.primary }}
              thumbColor={COLORS.white}
            />
          </Row>
        </Card>

        {notifications.length === 0 ? (
          <Card>
            <View style={{ alignItems: "center", padding: 20 }}>
              <Ionicons
                name="notifications-off"
                size={48}
                color={COLORS.gray}
              />
              <Text style={{ marginTop: 16, textAlign: "center" }}>
                Nenhuma notificação ainda
              </Text>
              <SmallText
                style={{
                  marginTop: 8,
                  textAlign: "center",
                  color: COLORS.gray,
                }}
              >
                Você receberá notificações sobre doações, badges e campanhas
                aqui
              </SmallText>
            </View>
          </Card>
        ) : (
          notifications.map((notification) => (
            <Card
              key={notification.id}
              style={{
                backgroundColor:
                  notification.status === "READ" ? COLORS.light : COLORS.white,
              }}
            >
              <TouchableOpacity
                onPress={() => handleMarkAsRead(notification.id)}
                disabled={notification.status === "READ"}
              >
                <Row style={{ alignItems: "flex-start" }}>
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      backgroundColor: COLORS.background,
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 12,
                    }}
                  >
                    <Ionicons
                      name={getNotificationIcon(notification.type) as any}
                      size={20}
                      color={COLORS.primary}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Row
                      style={{
                        justifyContent: "space-between",
                        marginBottom: 4,
                      }}
                    >
                      <Subtitle style={{ flex: 1 }}>
                        {notification.title}
                      </Subtitle>
                      {notification.status !== "READ" && (
                        <View
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: COLORS.primary,
                            marginLeft: 8,
                          }}
                        />
                      )}
                    </Row>
                    <Text>{notification.body}</Text>
                    <SmallText style={{ marginTop: 8, color: COLORS.gray }}>
                      {new Date(notification.createdAt).toLocaleString("pt-BR")}
                    </SmallText>
                  </View>
                </Row>
              </TouchableOpacity>
            </Card>
          ))
        )}
      </ScrollView>
    </Container>
  );
}
