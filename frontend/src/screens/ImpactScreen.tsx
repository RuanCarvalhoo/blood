import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
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
  Center,
} from "@/components/StyledComponents";
import { COLORS } from "@/constants";
import { formatDate } from "@/utils";
import {
  DonationHistory,
  PatientType,
  UsageDetails,
  RootStackParamList,
} from "@/types";
import { useAuth } from "@/contexts";

type ImpactScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Impact"
>;

export default function ImpactScreen() {
  const navigation = useNavigation<ImpactScreenNavigationProp>();
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Container>
        <StatusBar style="dark" />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={{ marginTop: 16 }}>Carregando...</Text>
        </View>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container>
        <StatusBar style="dark" />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Você precisa estar autenticado.</Text>
        </View>
      </Container>
    );
  }

  const totalPeopleHelped = user.totalDonations * 4;
  const donationHistory: DonationHistory[] = user.donationHistory || [];

  const getImpactIcon = (
    patientType: PatientType
  ): "medical" | "heart" | "fitness" | "people" => {
    if (patientType.includes("Cirurgia") || patientType.includes("Acidente")) {
      return "medical";
    }
    if (patientType.includes("Criança") || patientType.includes("Parto")) {
      return "heart";
    }
    if (
      patientType.includes("oncológico") ||
      patientType.includes("hematológica")
    ) {
      return "fitness";
    }
    return "people";
  };

  const getImpactColor = (patientType: PatientType): string => {
    if (patientType.includes("Cirurgia") || patientType.includes("Acidente")) {
      return COLORS.danger;
    }
    if (patientType.includes("Criança") || patientType.includes("Parto")) {
      return COLORS.primary;
    }
    if (
      patientType.includes("oncológico") ||
      patientType.includes("hematológica")
    ) {
      return COLORS.warning;
    }
    return COLORS.secondary;
  };

  return (
    <Container>
      <StatusBar style="dark" />

      <Row
        style={{
          alignItems: "center",
          marginTop: 50,
          marginBottom: 20,
          paddingHorizontal: 16,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginRight: 16 }}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.dark} />
        </TouchableOpacity>
        <Title>Seu Impacto</Title>
      </Row>

      <ScrollView style={{ flex: 1 }}>
        {/* Resumo do Impacto */}
        <Card style={{ marginHorizontal: 16, marginBottom: 16 }}>
          <Center>
            <Ionicons name="heart" size={48} color={COLORS.primary} />
            <Text
              style={{
                fontSize: 36,
                fontWeight: "bold",
                marginTop: 8,
                color: COLORS.primary,
              }}
            >
              {totalPeopleHelped}
            </Text>
            <Subtitle style={{ textAlign: "center" }}>
              Vidas que você ajudou a salvar
            </Subtitle>
            <SmallText style={{ textAlign: "center", marginTop: 8 }}>
              Com {user.totalDonations} doações realizadas
            </SmallText>
          </Center>
        </Card>

        {/* Estatísticas */}
        <Card style={{ marginHorizontal: 16, marginBottom: 16 }}>
          <Subtitle style={{ marginBottom: 16 }}>Suas Contribuições</Subtitle>
          <Row style={{ justifyContent: "space-around" }}>
            <Center style={{ flex: 1 }}>
              <Ionicons name="medical" size={24} color={COLORS.danger} />
              <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 4 }}>
                {donationHistory.reduce(
                  (acc, donation) =>
                    acc +
                    donation.usageDetails.filter(
                      (usage) =>
                        usage.patientType.includes("Cirurgia") ||
                        usage.patientType.includes("Acidente")
                    ).length,
                  0
                )}
              </Text>
              <SmallText>Emergências</SmallText>
            </Center>
            <Center style={{ flex: 1 }}>
              <Ionicons name="heart" size={24} color={COLORS.primary} />
              <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 4 }}>
                {donationHistory.reduce(
                  (acc, donation) =>
                    acc +
                    donation.usageDetails.filter(
                      (usage) =>
                        usage.patientType.includes("Criança") ||
                        usage.patientType.includes("Parto")
                    ).length,
                  0
                )}
              </Text>
              <SmallText>Maternidade</SmallText>
            </Center>
            <Center style={{ flex: 1 }}>
              <Ionicons name="fitness" size={24} color={COLORS.warning} />
              <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 4 }}>
                {donationHistory.reduce(
                  (acc, donation) =>
                    acc +
                    donation.usageDetails.filter(
                      (usage) =>
                        usage.patientType.includes("oncológico") ||
                        usage.patientType.includes("hematológica")
                    ).length,
                  0
                )}
              </Text>
              <SmallText>Tratamentos</SmallText>
            </Center>
          </Row>
        </Card>

        {/* Histórico Detalhado */}
        <Card style={{ marginHorizontal: 16, marginBottom: 16 }}>
          <Subtitle style={{ marginBottom: 16 }}>
            Histórico de Utilização
          </Subtitle>

          {donationHistory.map((donation) => (
            <View key={donation.id} style={{ marginBottom: 24 }}>
              <Row style={{ alignItems: "center", marginBottom: 12 }}>
                <Ionicons name="calendar" size={16} color={COLORS.gray} />
                <Text style={{ marginLeft: 8, fontWeight: "bold" }}>
                  Doação em {formatDate(donation.date)}
                </Text>
              </Row>
              <SmallText style={{ marginBottom: 12, color: COLORS.gray }}>
                Local: {donation.location}
              </SmallText>

              {donation.usageDetails.map((usage, index) => (
                <View
                  key={index}
                  style={{
                    backgroundColor: COLORS.light,
                    padding: 12,
                    borderRadius: 8,
                    marginBottom: 8,
                    borderLeftWidth: 4,
                    borderLeftColor: getImpactColor(usage.patientType),
                  }}
                >
                  <Row style={{ alignItems: "center", marginBottom: 4 }}>
                    <Ionicons
                      name={getImpactIcon(usage.patientType)}
                      size={16}
                      color={getImpactColor(usage.patientType)}
                    />
                    <Text
                      style={{
                        marginLeft: 8,
                        fontWeight: "bold",
                        color: getImpactColor(usage.patientType),
                      }}
                    >
                      {usage.patientType}
                    </Text>
                  </Row>
                  <Text style={{ marginBottom: 4, fontSize: 14 }}>
                    {usage.usage}
                  </Text>
                  <Row style={{ justifyContent: "space-between" }}>
                    <SmallText style={{ color: COLORS.gray }}>
                      {formatDate(usage.date)}
                    </SmallText>
                    <SmallText style={{ color: COLORS.gray }}>
                      {usage.hospital}
                    </SmallText>
                  </Row>
                </View>
              ))}
            </View>
          ))}
        </Card>

        {/* Mensagem Inspiradora */}
        <Card style={{ marginHorizontal: 16, marginBottom: 32 }}>
          <Center>
            <Ionicons name="star" size={32} color={COLORS.warning} />
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                lineHeight: 24,
                marginTop: 12,
                fontStyle: "italic",
              }}
            >
              "Cada doação sua é uma nova oportunidade de vida para alguém. Você
              é um verdadeiro herói anônimo!"
            </Text>
          </Center>
        </Card>
      </ScrollView>
    </Container>
  );
}
