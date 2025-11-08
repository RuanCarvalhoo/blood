import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View, TouchableOpacity, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
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
} from "@/components/StyledComponents";
import { COLORS, DONATION_INTERVAL_DAYS } from "@/constants";
import { formatDate } from "@/utils";
import { useAuth } from "@/contexts";
import { RootStackParamList } from "@/types";

type ScheduleScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Schedule"
>;

export default function ScheduleScreen() {
  const navigation = useNavigation<ScheduleScreenNavigationProp>();
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [minDate, setMinDate] = useState<Date>(new Date());
  const [showValidationMessage, setShowValidationMessage] = useState(false);

  useEffect(() => {
    calculateMinDate();
  }, []);

  const calculateMinDate = () => {
    if (!user) return;

    const intervalDays = DONATION_INTERVAL_DAYS[user.gender];
    const lastDonation = user.lastDonationDate || new Date();

    const minimumDate = new Date(lastDonation);
    minimumDate.setDate(minimumDate.getDate() + intervalDays);

    setMinDate(minimumDate);
  };

  const handleDateChange = (event: any, date?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleSchedule = () => {
    if (!selectedDate) {
      setShowValidationMessage(true);
      setTimeout(() => setShowValidationMessage(false), 3000);
      return;
    }

    // TODO: Implementar chamada à API para agendar doação
    navigation.goBack();
  };

  const getIntervalInfo = () => {
    if (!user) return "";

    const intervalDays = DONATION_INTERVAL_DAYS[user.gender];
    const maxDonations = user.gender === "male" ? 4 : 3;
    return `Intervalo: ${intervalDays} dias | Máximo: ${maxDonations} doações/ano`;
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
          <Title>Agendar Doação</Title>
        </Row>

        <Card>
          <Subtitle>Informações do Agendamento</Subtitle>
          <Text style={{ marginTop: 8 }}>
            Olá, {user.name}! Selecione uma data disponível para sua próxima
            doação.
          </Text>
          <SmallText style={{ marginTop: 8, color: COLORS.gray }}>
            {getIntervalInfo()}
          </SmallText>
        </Card>

        <Card>
          <Subtitle>Selecionar Data</Subtitle>
          <SmallText style={{ marginTop: 4, marginBottom: 16 }}>
            Horário: 8h às 17h (Segunda a Sexta)
          </SmallText>

          <TouchableOpacity
            style={{
              backgroundColor: COLORS.light,
              padding: 16,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: COLORS.primary,
              alignItems: "center",
            }}
            onPress={() => setShowDatePicker(true)}
          >
            <Row style={{ alignItems: "center" }}>
              <Ionicons name="calendar" size={24} color={COLORS.primary} />
              <Text
                style={{ marginLeft: 12, fontSize: 16, color: COLORS.dark }}
              >
                {selectedDate
                  ? formatDate(selectedDate)
                  : "Toque para selecionar"}
              </Text>
            </Row>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={selectedDate || minDate}
              mode="date"
              display="default"
              minimumDate={minDate}
              onChange={handleDateChange}
            />
          )}
        </Card>

        {selectedDate && (
          <Card>
            <Row style={{ alignItems: "center" }}>
              <Ionicons
                name="checkmark-circle"
                size={24}
                color={COLORS.success}
              />
              <View style={{ marginLeft: 12 }}>
                <Subtitle>Data Selecionada</Subtitle>
                <Text style={{ color: COLORS.success, fontWeight: "bold" }}>
                  {formatDate(selectedDate)}
                </Text>
              </View>
            </Row>
          </Card>
        )}

        <Card>
          <Subtitle>Preparação para Doação</Subtitle>
          <View style={{ marginTop: 12 }}>
            <Row style={{ alignItems: "center", marginBottom: 12 }}>
              <Ionicons name="time" size={20} color={COLORS.warning} />
              <Text style={{ marginLeft: 12, flex: 1 }}>Jejum de 4 horas</Text>
            </Row>
            <Row style={{ alignItems: "center", marginBottom: 12 }}>
              <Ionicons name="bed" size={20} color={COLORS.primary} />
              <Text style={{ marginLeft: 12, flex: 1 }}>Boa noite de sono</Text>
            </Row>
            <Row style={{ alignItems: "center", marginBottom: 12 }}>
              <Ionicons name="card" size={20} color={COLORS.secondary} />
              <Text style={{ marginLeft: 12, flex: 1 }}>
                Documento com foto
              </Text>
            </Row>
            <Row style={{ alignItems: "center" }}>
              <Ionicons name="water" size={20} color={COLORS.secondary} />
              <Text style={{ marginLeft: 12, flex: 1 }}>
                Beba bastante água
              </Text>
            </Row>
          </View>
        </Card>

        {showValidationMessage && (
          <Card
            style={{
              backgroundColor: "#ffebee",
              borderColor: COLORS.danger,
              borderWidth: 1,
            }}
          >
            <Row style={{ alignItems: "center" }}>
              <Ionicons name="warning" size={20} color={COLORS.danger} />
              <Text style={{ marginLeft: 8, color: COLORS.danger }}>
                Por favor, selecione uma data para o agendamento.
              </Text>
            </Row>
          </Card>
        )}

        <Button
          onPress={handleSchedule}
          style={{
            backgroundColor: selectedDate ? COLORS.primary : COLORS.gray,
            marginBottom: 16,
          }}
        >
          <ButtonText>
            {selectedDate ? "Confirmar Agendamento" : "Selecione uma Data"}
          </ButtonText>
        </Button>
      </ScrollContainer>
    </Container>
  );
}
