import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  Container,
  ScrollContainer,
  Card,
  Title,
  Subtitle,
  Text,
  SmallText,
  Button,
  ButtonText,
  ProgressBar,
  ProgressFill,
  Row,
  Center,
} from "../components/StyledComponents";
import DonationIntervalModal from "../components/DonationIntervalModal";
import DonationInfoButton from "../components/DonationInfoButton";
import ScheduleScreen from "./ScheduleScreen";
import ImpactScreen from "./ImpactScreen";
import { COLORS } from "../constants";
import { calculateLevel, getProgressToNextLevel, formatDate } from "../utils";

export default function HomeScreen() {
  const [showIntervalModal, setShowIntervalModal] = useState(false);
  const [showScheduleScreen, setShowScheduleScreen] = useState(false);
  const [showImpactScreen, setShowImpactScreen] = useState(false);

  const user = {
    name: "Marcelo Rodrigues",
    points: 250,
    totalDonations: 2,
    nextDonationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    lastDonationDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
    gender: "male" as "male" | "female",
  };

  const currentLevel = calculateLevel(user.points);
  const progress = getProgressToNextLevel(user.points);

  const showDonationIntervalInfo = () => {
    setShowIntervalModal(true);
  };

  const openScheduleScreen = () => {
    setShowScheduleScreen(true);
  };

  const openImpactScreen = () => {
    setShowImpactScreen(true);
  };

  if (showScheduleScreen) {
    return (
      <ScheduleScreen
        user={user}
        onClose={() => setShowScheduleScreen(false)}
      />
    );
  }

  if (showImpactScreen) {
    return (
      <ImpactScreen
        user={{
          name: user.name,
          totalDonations: user.totalDonations,
          donationHistory: [], // Será preenchido com dados reais
        }}
        onClose={() => setShowImpactScreen(false)}
      />
    );
  }
  return (
    <Container>
      <StatusBar style="dark" />
      <ScrollContainer>
        {/* Header */}
        <Card style={{ marginTop: 50 }}>
          <Title>Olá, {user.name}!</Title>
        </Card>

        {/* Level Card */}
        <Card>
          <Row>
            <Ionicons name="trophy" size={32} color={COLORS.primary} />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Subtitle>
                Nível {currentLevel.level}: {currentLevel.name}
              </Subtitle>
              <SmallText>{user.points} pontos</SmallText>
            </View>
          </Row>
          <ProgressBar>
            <ProgressFill progress={progress} />
          </ProgressBar>
          <SmallText>{progress.toFixed(0)}% para o próximo nível</SmallText>
        </Card>

        {/* Stats Card */}
        <Card>
          <Subtitle>Suas Estatísticas</Subtitle>
          <Row style={{ marginTop: 12 }}>
            <Center style={{ flex: 1 }}>
              <Ionicons name="water" size={32} color={COLORS.primary} />
              <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 8 }}>
                {user.totalDonations}
              </Text>
              <SmallText>Doações</SmallText>
            </Center>
            <Center style={{ flex: 1 }}>
              <Row style={{ alignItems: "center", justifyContent: "center" }}>
                <Ionicons name="calendar" size={32} color={COLORS.secondary} />
                <DonationInfoButton onPress={showDonationIntervalInfo} />
              </Row>
              <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 8 }}>
                {formatDate(user.lastDonationDate)}
              </Text>
              <SmallText>Última doação</SmallText>
            </Center>
          </Row>
        </Card>

        {/* Impact Card */}
        <TouchableOpacity onPress={openImpactScreen} activeOpacity={0.8}>
          <Card
            style={{
              backgroundColor: COLORS.primary + "10",
              borderWidth: 2,
              borderColor: COLORS.primary + "30",
              shadowColor: COLORS.primary,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 8,
            }}
          >
            <Row
              style={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <Subtitle style={{ color: COLORS.primary, fontSize: 18 }}>
                Seu Impacto ✨
              </Subtitle>
              <Ionicons
                name="chevron-forward"
                size={24}
                color={COLORS.primary}
              />
            </Row>
            <Row style={{ marginTop: 16, alignItems: "center" }}>
              <View
                style={{
                  backgroundColor: COLORS.primary,
                  borderRadius: 25,
                  padding: 12,
                  marginRight: 16,
                }}
              >
                <Ionicons name="heart" size={32} color={COLORS.white} />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 28,
                    fontWeight: "bold",
                    color: COLORS.primary,
                  }}
                >
                  {user.totalDonations * 4} vidas
                </Text>
                <Text style={{ fontSize: 16, marginTop: 4 }}>
                  que você ajudou a salvar!
                </Text>
              </View>
            </Row>
            <Row
              style={{
                marginTop: 16,
                padding: 12,
                backgroundColor: COLORS.white,
                borderRadius: 8,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <SmallText style={{ color: COLORS.gray }}>
                Toque para ver onde suas doações foram utilizadas
              </SmallText>
              <Ionicons name="eye" size={16} color={COLORS.gray} />
            </Row>
          </Card>
        </TouchableOpacity>

        {/* Action Button */}
        <Button onPress={openScheduleScreen}>
          <ButtonText>Agendar Nova Doação</ButtonText>
        </Button>

        {/* Info Card */}
        <Card>
          <Subtitle>Por que doar sangue?</Subtitle>
          <Text style={{ marginTop: 8 }}>
            A doação de sangue é um ato de solidariedade que salva vidas. Uma
            única doação pode beneficiar até 4 pessoas.
          </Text>
        </Card>
      </ScrollContainer>

      <DonationIntervalModal
        visible={showIntervalModal}
        onClose={() => setShowIntervalModal(false)}
        gender={user.gender}
      />
    </Container>
  );
}
