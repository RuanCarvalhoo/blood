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

  return (
    <Container>
      <StatusBar style="dark" />
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
              color={COLORS.dark}
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

        <DigitalCard user={user} />

        {/* Stats Card */}
        <Card>
          <Subtitle>Estatísticas</Subtitle>
          <Row style={{ marginTop: 12, marginBottom: 12 }}>
            <Center style={{ flex: 1 }}>
              <Ionicons name="trophy" size={32} color={COLORS.warning} />
              <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 8 }}>
                {user.points}
              </Text>
              <SmallText>Pontos</SmallText>
            </Center>
            <Center style={{ flex: 1 }}>
              <Ionicons name="water" size={32} color={COLORS.primary} />
              <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 8 }}>
                {user.totalDonations}
              </Text>
              <SmallText>Doações</SmallText>
            </Center>
            <Center style={{ flex: 1 }}>
              <Ionicons name="people" size={32} color={COLORS.success} />
              <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 8 }}>
                {user.totalDonations * 4}
              </Text>
              <SmallText>Vidas Salvas</SmallText>
            </Center>
          </Row>
        </Card>

        {/* Donation History */}
        <Card>
          <Subtitle>Histórico de Doações</Subtitle>
          {MOCK_DONATION_HISTORY.map((donation) => (
            <View key={donation.id} style={{ marginTop: 16, borderBottomWidth: 1, borderBottomColor: COLORS.border, paddingBottom: 8 }}>
              <Row>
                <View>
                  <Text style={{ fontWeight: "bold" }}>{donation.location}</Text>
                  <SmallText>{formatDate(new Date(donation.date))}</SmallText>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                  <Badge style={{ backgroundColor: COLORS.light, borderColor: COLORS.border, paddingVertical: 4 }}>
                    <SmallText style={{ color: COLORS.dark, fontSize: 12 }}>{donation.amount}</SmallText>
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
        <Card>
          <Subtitle>Seus Benefícios Atuais</Subtitle>
          {currentLevel.benefits.map((benefit, index) => (
            <Row key={index} style={{ marginTop: 8 }}>
              <Ionicons
                name="checkmark-circle"
                size={20}
                color={COLORS.success}
              />
              <Text style={{ marginLeft: 8, flex: 1 }}>{benefit}</Text>
            </Row>
          ))}
        </Card>

        {/* Settings Buttons */}
        <View style={{ paddingHorizontal: 16 }}>
          <GameButton variant="secondary">
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
