import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  TouchableOpacity,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
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
  Button,
  ButtonText,
  Row,
  Input,
} from "@/components/StyledComponents";
import { COLORS } from "@/constants";
import { API_BASE_URL, API_ENDPOINTS } from "@/config/api";
import { RootStackParamList } from "@/types";
import { useAuth } from "@/contexts";

type RegisterDonationScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "RegisterDonation"
>;

export default function RegisterDonationScreen() {
  const navigation = useNavigation<RegisterDonationScreenNavigationProp>();
  const { user, token, refreshUser } = useAuth();

  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const formatDateInput = (text: string) => {
    // Remove tudo que não é número
    const numbers = text.replace(/\D/g, "");

    // Limita a 8 dígitos (DDMMYYYY)
    const limited = numbers.slice(0, 8);

    // Formata progressivamente: DD -> DD/MM -> DD/MM/YYYY
    if (limited.length <= 2) {
      return limited;
    } else if (limited.length <= 4) {
      return `${limited.slice(0, 2)}/${limited.slice(2)}`;
    } else {
      return `${limited.slice(0, 2)}/${limited.slice(2, 4)}/${limited.slice(
        4
      )}`;
    }
  };

  const handleDateChange = (text: string) => {
    const formatted = formatDateInput(text);
    setDate(formatted);
    if (errors.date) {
      setErrors({ ...errors, date: "" });
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!location.trim()) {
      newErrors.location = "Local é obrigatório";
    }

    if (!date.trim()) {
      newErrors.date = "Data é obrigatória";
    } else {
      // Validate date format (DD/MM/YYYY)
      const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
      const match = date.match(dateRegex);

      if (!match) {
        newErrors.date = "Formato inválido. Use DD/MM/AAAA";
      } else {
        const day = parseInt(match[1], 10);
        const month = parseInt(match[2], 10);
        const year = parseInt(match[3], 10);

        if (month < 1 || month > 12) {
          newErrors.date = "Mês inválido";
        } else if (day < 1 || day > 31) {
          newErrors.date = "Dia inválido";
        } else if (year < 1900 || year > new Date().getFullYear()) {
          newErrors.date = "Ano inválido";
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Convert DD/MM/YYYY to ISO format
      const [day, month, year] = date.split("/");
      const isoDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
        2,
        "0"
      )}`;

      const url = `${API_BASE_URL}${API_ENDPOINTS.DONATIONS}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(user?.id && token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          userId: user?.id,
          location: location.trim(),
          date: isoDate,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao registrar doação");
      }

      const result = await response.json();

      // Show success message with badges/level info
      let successMessage = "Doação registrada com sucesso!";

      if (result.newBadges && result.newBadges.length > 0) {
        const badgeNames = result.newBadges.map((b: any) => b.name).join(", ");
        successMessage += `\n\n🏆 Novo(s) badge(s): ${badgeNames}`;
      }

      if (result.levelUp) {
        successMessage += `\n\n⬆️ Level up! ${result.levelUp.oldLevel} → ${result.levelUp.newLevel}`;
      }

      if (Platform.OS === "web") {
        alert(successMessage);
      } else {
        Alert.alert("Sucesso", successMessage);
      }

      // Refresh user data to update donations list
      await refreshUser();

      // Navigate back
      navigation.goBack();
    } catch (error: any) {
      console.error("Error registering donation:", error);

      let errorMessage = "Erro ao registrar doação. Tente novamente.";

      // Check if it's a network error
      if (
        error.message === "Failed to fetch" ||
        error.message.includes("Network")
      ) {
        errorMessage = `Não foi possível conectar ao servidor. Verifique se o backend está rodando em ${API_BASE_URL}`;
      } else if (error.message) {
        errorMessage = error.message;
      }

      if (Platform.OS === "web") {
        alert(errorMessage);
      } else {
        Alert.alert("Erro", errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Container>
      <StatusBar style="dark" />
      <ScrollContainer>
        <Row style={{ alignItems: "center", marginTop: 50, marginBottom: 20 }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginRight: 16 }}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.dark} />
          </TouchableOpacity>
          <Title>Registrar Doação</Title>
        </Row>

        <Card>
          <Subtitle>Informações da Doação</Subtitle>
          <Text style={{ marginTop: 8, marginBottom: 16 }}>
            Preencha os dados da sua doação de sangue.
          </Text>

          <SmallText style={{ marginBottom: 4, fontWeight: "600" }}>
            Local da Doação *
          </SmallText>
          <Input
            placeholder="Ex: Hemocentro Regional"
            value={location}
            onChangeText={(text: string) => {
              setLocation(text);
              if (errors.location) {
                setErrors({ ...errors, location: "" });
              }
            }}
            editable={!isLoading}
          />
          {errors.location && (
            <SmallText style={{ color: COLORS.danger, marginTop: 4 }}>
              {errors.location}
            </SmallText>
          )}

          <SmallText
            style={{ marginTop: 16, marginBottom: 4, fontWeight: "600" }}
          >
            Data da Doação *
          </SmallText>
          <Input
            placeholder="DD/MM/AAAA"
            value={date}
            onChangeText={handleDateChange}
            keyboardType="numeric"
            maxLength={10}
            editable={!isLoading}
          />
          {errors.date && (
            <SmallText style={{ color: COLORS.danger, marginTop: 4 }}>
              {errors.date}
            </SmallText>
          )}

          <SmallText style={{ marginTop: 16, color: COLORS.gray }}>
            * Campos obrigatórios
          </SmallText>
        </Card>

        <Card>
          <Row style={{ alignItems: "center" }}>
            <Ionicons
              name="information-circle"
              size={24}
              color={COLORS.primary}
            />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <SmallText>
                Ao registrar a doação, você ganhará pontos e poderá desbloquear
                novas conquistas!
              </SmallText>
            </View>
          </Row>
        </Card>

        <Button onPress={handleRegister} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color={COLORS.light} />
          ) : (
            <ButtonText>Registrar Doação</ButtonText>
          )}
        </Button>
      </ScrollContainer>
    </Container>
  );
}
