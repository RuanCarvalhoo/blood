import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, ActivityIndicator, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  Container,
  ScrollContainer,
  Card,
  Title,
  Subtitle,
  Text,
  SmallText,
  GameButton,
  ButtonText,
  Row,
  Center,
  Badge,
  BadgeText,
} from "@/components/StyledComponents";
import DigitalCard from "@/components/DigitalCard";
import { COLORS } from "@/constants";
import { MOCK_DONATION_HISTORY } from "@/constants/mocks";
import { calculateLevel, formatDate } from "@/utils";
import { useAuth, useNotifications } from "@/contexts";
import { RootStackParamList } from "@/types";
import AvatarWithFrame from "@/components/AvatarWithFrame";

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList>;

export default function ProfileScreen() {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const { user, isLoading, logout } = useAuth();
  const { unreadCount } = useNotifications();

  if (isLoading) {
    return (
      <Container>
        <Center style={{ flex: 1 }}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={{ marginTop: 16 }}>Carregando...</Text>
        </Center>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container>
        <Center style={{ flex: 1 }}>
          <Ionicons
            name="person-circle-outline"
            size={80}
            color={COLORS.gray}
          />
          <Title style={{ marginTop: 16 }}>Faça login</Title>
          <Text style={{ marginTop: 8, textAlign: "center" }}>
            Entre para acessar seu perfil
          </Text>
        </Center>
      </Container>
    );
  }

  const currentLevel = calculateLevel(user.points);
  const profileTheme = user.profileCustomization?.profileTheme || "light";
  const avatarFrame = user.profileCustomization?.avatarFrame || "none";

  const getThemeColors = () => {
    switch (profileTheme) {
      case "dark":
        return { bg: "#121212", text: "#FFF", card: "#1E1E1E", border: "#333" };
      case "red":
        return { bg: "#FFF0F0", text: "#333", card: "#FFF", border: "#FFCDD2" };
      default:
        return { bg: COLORS.background, text: COLORS.dark, card: COLORS.white, border: COLORS.border };
    }
  };

  const themeColors = getThemeColors();

  return (
    <Container style={{ backgroundColor: themeColors.bg }}>
      <StatusBar style={profileTheme === "dark" ? "light" : "dark"} />
      <ScrollContainer contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Profile Header with Notifications */}
        <Row style={{ marginTop: 50, marginBottom: 20, paddingHorizontal: 16 }}>
          <View style={{ flex: 1 }} />
          <TouchableOpacity
            onPress={() => navigation.navigate("Notifications")}
            style={{ position: "relative" }}
          >
            <Ionicons
              name="notifications-outline"
              size={28}
              color={themeColors.text}
            />
            {unreadCount > 0 && (
              <View
                style={{
                  position: "absolute",
                  top: -4,
                  right: -4,
                  backgroundColor: COLORS.danger,
                  borderRadius: 10,
                  minWidth: 20,
                  height: 20,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingHorizontal: 4,
                }}
              >
                <SmallText
                  style={{
                    color: COLORS.white,
                    fontSize: 10,
                    fontWeight: "bold",
                  }}
                >
                  {unreadCount > 99 ? "99+" : unreadCount}
                </SmallText>
              </View>
            )}
          </TouchableOpacity>
        </Row>

        {/* Avatar Section */}
        <Center style={{ marginBottom: 24 }}>
             {/* @ts-ignore - Import AvatarWithFrame if not already imported */}
            <AvatarWithFrame 
                frame={avatarFrame} 
                size={120} 
            />
        </Center>

        <DigitalCard user={user} />

        {/* Stats Card */}
        <Card style={{ backgroundColor: themeColors.card, borderColor: themeColors.border }}>
          <Subtitle style={{ color: themeColors.text }}>Estatísticas</Subtitle>
          <Row style={{ marginTop: 12, marginBottom: 12 }}>
            <Center style={{ flex: 1 }}>
              <Ionicons name="trophy" size={32} color={COLORS.warning} />
              <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 8, color: themeColors.text }}>
                {user.points}
              </Text>
              <SmallText style={{ color: themeColors.text, opacity: 0.7 }}>Pontos</SmallText>
            </Center>
            <Center style={{ flex: 1 }}>
              <Ionicons name="water" size={32} color={COLORS.primary} />
              <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 8, color: themeColors.text }}>
                {user.totalDonations}
              </Text>
              <SmallText style={{ color: themeColors.text, opacity: 0.7 }}>Doações</SmallText>
            </Center>
            <Center style={{ flex: 1 }}>
              <Ionicons name="people" size={32} color={COLORS.success} />
              <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 8, color: themeColors.text }}>
                {user.totalDonations * 4}
              </Text>
              <SmallText style={{ color: themeColors.text, opacity: 0.7 }}>Vidas Salvas</SmallText>
            </Center>
          </Row>
        </Card>

        {/* Donation History */}
        <Card style={{ backgroundColor: themeColors.card, borderColor: themeColors.border }}>
          <Subtitle style={{ color: themeColors.text }}>Histórico de Doações</Subtitle>
          {MOCK_DONATION_HISTORY.map((donation) => (
            <View key={donation.id} style={{ marginTop: 16, borderBottomWidth: 1, borderBottomColor: themeColors.border, paddingBottom: 8 }}>
              <Row>
                <View>
                  <Text style={{ fontWeight: "bold", color: themeColors.text }}>{donation.location}</Text>
                  <SmallText style={{ color: themeColors.text, opacity: 0.7 }}>{formatDate(new Date(donation.date))}</SmallText>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                  <Badge style={{ backgroundColor: profileTheme === 'dark' ? '#333' : COLORS.light, borderColor: themeColors.border, paddingVertical: 4 }}>
                    <SmallText style={{ color: themeColors.text, fontSize: 12 }}>{donation.amount}</SmallText>
                  </Badge>
                </View>
              </Row>
            </View>
          ))}
          <TouchableOpacity style={{ marginTop: 12, alignItems: "center" }}>
            <Text style={{ color: COLORS.primary, fontWeight: "bold" }}>Ver histórico completo</Text>
          </TouchableOpacity>
        </Card>

        {/* Benefits Card */}
        <Card style={{ backgroundColor: themeColors.card, borderColor: themeColors.border }}>
          <Subtitle style={{ color: themeColors.text }}>Seus Benefícios Atuais</Subtitle>
          {currentLevel.benefits.map((benefit, index) => (
            <Row key={index} style={{ marginTop: 8 }}>
              <Ionicons
                name="checkmark-circle"
                size={20}
                color={COLORS.success}
              />
              <Text style={{ marginLeft: 8, flex: 1, color: themeColors.text }}>{benefit}</Text>
            </Row>
          ))}
        </Card>

        {/* Settings Buttons */}
        <View style={{ paddingHorizontal: 16 }}>
          <GameButton variant="secondary" onPress={() => navigation.navigate("EditProfile")}>
            <ButtonText>Editar Perfil</ButtonText>
          </GameButton>
          
          <GameButton
            variant="outline"
            onPress={logout}
            style={{ marginTop: 8, borderColor: COLORS.danger }}
          >
            <ButtonText style={{ color: COLORS.danger }} variant="outline">Sair da Conta</ButtonText>
          </GameButton>
        </View>
      </ScrollContainer>
    </Container>
  );
}
