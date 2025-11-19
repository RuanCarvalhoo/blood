import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, TouchableOpacity, ActivityIndicator } from "react-native";
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
  ProgressBar,
  ProgressFill,
  Row,
  Center,
  Badge,
  BadgeText,
} from "@/components/StyledComponents";
import DonationIntervalModal from "@/components/DonationIntervalModal";
import { COLORS } from "@/constants";
import { calculateLevel, getProgressToNextLevel, formatDate } from "@/utils";
import { useAuth } from "@/contexts";
import { RootStackParamList } from "@/types";
import Mascot from "@/components/Mascot";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { user, isLoading } = useAuth();
  const [showIntervalModal, setShowIntervalModal] = useState(false);

  if (isLoading) {
    return (
      <Container>
        <Center style={{ flex: 1 }}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </Center>
      </Container>
    );
  }

  if (!user) return null;

  const currentLevel = calculateLevel(user.points);
  const progress = getProgressToNextLevel(user.points);

  return (
    <Container>
      <StatusBar style="dark" />
      <ScrollContainer>
        {/* Header Gamificado */}
        <View
          style={{
            padding: 20,
            paddingTop: 60,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View>
            <Title style={{ fontSize: 24 }}>
              Olá, {user.name.split(" ")[0]}!
            </Title>
            <Text style={{ fontWeight: "bold", color: COLORS.mediumGray }}>
              Vamos salvar vidas hoje?
            </Text>
          </View>
          <View style={{ marginLeft: "auto" }}>
            {/* Mini Mascote no Header */}
            <Mascot size={60} expression="wink" />
          </View>
        </View>

        {/* Card de Nível (Estilo Banner) */}
        <View style={{ paddingHorizontal: 16 }}>
          <Card
            style={{
              backgroundColor: COLORS.secondary,
              borderColor: COLORS.secondaryDark,
              margin: 0,
            }}
          >
            <Row>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    color: "rgba(255,255,255,0.8)",
                    fontWeight: "700",
                    fontSize: 14,
                  }}
                >
                  NÍVEL ATUAL
                </Text>
                <Text
                  style={{
                    color: COLORS.white,
                    fontSize: 22,
                    fontWeight: "900",
                    marginBottom: 8,
                  }}
                >
                  {currentLevel.name}
                </Text>
                <Badge
                  style={{
                    alignSelf: "flex-start",
                    backgroundColor: "rgba(0,0,0,0.2)",
                    borderColor: "transparent",
                  }}
                >
                  <BadgeText>{user.points} XP</BadgeText>
                </Badge>
              </View>
              <Ionicons name="trophy" size={64} color={COLORS.warning} />
            </Row>
            <View style={{ marginTop: 16 }}>
              <ProgressBar style={{ backgroundColor: "rgba(0,0,0,0.2)" }}>
                <ProgressFill
                  progress={progress}
                  style={{ backgroundColor: COLORS.warning }}
                />
              </ProgressBar>
              <Text
                style={{
                  color: COLORS.white,
                  textAlign: "right",
                  fontWeight: "700",
                  fontSize: 12,
                }}
              >
                {progress.toFixed(0)}% para o próximo nível
              </Text>
            </View>
          </Card>
        </View>

        {/* Ações Principais */}
        <View style={{ padding: 16 }}>
          <GameButton
            variant="primary"
            onPress={() => navigation.navigate("Schedule")}
          >
            <ButtonText>AGENDAR DOAÇÃO</ButtonText>
          </GameButton>
        </View>

        {/* Status Grid */}
        <View style={{ flexDirection: "row", paddingHorizontal: 8 }}>
          <View style={{ flex: 1 }}>
            <Card>
              <Center>
                <Ionicons name="water" size={32} color={COLORS.primary} />
                <Title style={{ fontSize: 32, marginBottom: 0, marginTop: 8 }}>
                  {user.totalDonations}
                </Title>
                <SmallText
                  style={{ textTransform: "uppercase", letterSpacing: 1 }}
                >
                  Doações
                </SmallText>
              </Center>
            </Card>
          </View>
          <View style={{ flex: 1 }}>
            <Card>
              <Center>
                <Ionicons name="heart" size={32} color={COLORS.success} />
                <Title style={{ fontSize: 32, marginBottom: 0, marginTop: 8 }}>
                  {user.totalDonations * 4}
                </Title>
                <SmallText
                  style={{ textTransform: "uppercase", letterSpacing: 1 }}
                >
                  Vidas
                </SmallText>
              </Center>
            </Card>
          </View>
        </View>

        {/* Card Informativo */}
        <TouchableOpacity
          onPress={() => setShowIntervalModal(true)}
          activeOpacity={0.8}
        >
          <Card style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                backgroundColor: COLORS.light,
                padding: 10,
                borderRadius: 12,
                marginRight: 16,
              }}
            >
              <Ionicons name="calendar" size={28} color={COLORS.secondary} />
            </View>
            <View style={{ flex: 1 }}>
              <Subtitle style={{ fontSize: 18, marginBottom: 2 }}>
                Próxima Doação
              </Subtitle>
              <Text style={{ color: COLORS.mediumGray }}>
                {user.lastDonationDate ? "Calculando..." : "Disponível agora!"}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={COLORS.border} />
          </Card>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Impact")}
          activeOpacity={0.8}
        >
          <Card style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                backgroundColor: COLORS.light,
                padding: 10,
                borderRadius: 12,
                marginRight: 16,
              }}
            >
              <Ionicons name="stats-chart" size={28} color={COLORS.warning} />
            </View>
            <View style={{ flex: 1 }}>
              <Subtitle style={{ fontSize: 18, marginBottom: 2 }}>
                Ver Impacto
              </Subtitle>
              <Text style={{ color: COLORS.mediumGray }}>
                Onde seu sangue chegou
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={COLORS.border} />
          </Card>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Raids")}
          activeOpacity={0.8}
        >
          <Card style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                backgroundColor: COLORS.light,
                padding: 10,
                borderRadius: 12,
                marginRight: 16,
              }}
            >
              <Ionicons name="people" size={28} color={COLORS.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Subtitle style={{ fontSize: 18, marginBottom: 2 }}>
                Raids & Squads
              </Subtitle>
              <Text style={{ color: COLORS.mediumGray }}>
                Doe em grupo e suba de nível
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={COLORS.border} />
          </Card>
        </TouchableOpacity>
      </ScrollContainer>

      <DonationIntervalModal
        visible={showIntervalModal}
        onClose={() => setShowIntervalModal(false)}
        gender={user.gender}
      />
    </Container>
  );
}
