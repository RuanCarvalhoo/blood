import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View, FlatList, TouchableOpacity } from "react-native";
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
  Row,
  Center,
} from "../components/StyledComponents";
import { COLORS } from "../constants";
import { formatDate } from "../utils";

interface ScheduleScreenProps {
  onClose: () => void;
  user: {
    name: string;
    gender: "male" | "female";
    totalDonations: number;
    lastDonationDate?: Date;
  };
}

export default function ScheduleScreen({ onClose, user }: ScheduleScreenProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [showValidationMessage, setShowValidationMessage] = useState(false);

  useEffect(() => {
    calculateAvailableDates();
  }, []);

  const calculateAvailableDates = () => {
    const intervalDays = user.gender === "male" ? 60 : 90;
    const lastDonation = user.lastDonationDate || new Date();

    // Data mínima para próxima doação
    const minDate = new Date(lastDonation);
    minDate.setDate(minDate.getDate() + intervalDays);

    // Gerar próximos 30 dias disponíveis a partir da data mínima
    const dates: Date[] = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date(minDate);
      date.setDate(date.getDate() + i);

      // Apenas dias úteis (segunda a sexta)
      if (date.getDay() >= 1 && date.getDay() <= 5) {
        dates.push(date);
      }
    }

    setAvailableDates(dates);
  };

  const handleSchedule = () => {
    if (!selectedDate) {
      setShowValidationMessage(true);
      setTimeout(() => setShowValidationMessage(false), 3000);
      return;
    }

    // Simulando agendamento bem-sucedido
    onClose();
  };

  const renderDateItem = ({ item }: { item: Date }) => {
    const isSelected = selectedDate?.toDateString() === item.toDateString();

    return (
      <TouchableOpacity
        style={{
          backgroundColor: isSelected ? COLORS.primary : COLORS.white,
          padding: 16,
          marginHorizontal: 8,
          marginVertical: 4,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: isSelected ? COLORS.primary : COLORS.light,
          minWidth: 120,
          alignItems: "center",
        }}
        onPress={() => setSelectedDate(item)}
      >
        <Text
          style={{
            color: isSelected ? COLORS.white : COLORS.dark,
            fontWeight: isSelected ? "bold" : "normal",
            fontSize: 16,
          }}
        >
          {item.toLocaleDateString("pt-BR", {
            weekday: "short",
            day: "2-digit",
            month: "short",
          })}
        </Text>
      </TouchableOpacity>
    );
  };

  const getIntervalInfo = () => {
    const intervalDays = user.gender === "male" ? 60 : 90;
    const maxDonations = user.gender === "male" ? 4 : 3;
    return `Intervalo: ${intervalDays} dias | Máximo: ${maxDonations} doações/ano`;
  };

  return (
    <Container>
      <StatusBar style="dark" />
      <ScrollContainer>
        {/* Header */}
        <Row style={{ alignItems: "center", marginTop: 50, marginBottom: 20 }}>
          <TouchableOpacity onPress={onClose} style={{ marginRight: 16 }}>
            <Ionicons name="arrow-back" size={24} color={COLORS.dark} />
          </TouchableOpacity>
          <Title>Agendar Doação</Title>
        </Row>

        {/* Info Card */}
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

        {/* Datas Disponíveis */}
        <Card>
          <Subtitle>Datas Disponíveis</Subtitle>
          <SmallText style={{ marginTop: 4, marginBottom: 16 }}>
            Horário: 8h às 17h (Segunda a Sexta)
          </SmallText>

          <FlatList
            data={availableDates}
            renderItem={renderDateItem}
            keyExtractor={(item) => item.toISOString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 8 }}
          />
        </Card>

        {/* Data Selecionada */}
        {selectedDate && (
          <Card>
            <Row style={{ alignItems: "center" }}>
              <Ionicons name="calendar" size={24} color={COLORS.success} />
              <View style={{ marginLeft: 12 }}>
                <Subtitle>Data Selecionada</Subtitle>
                <Text style={{ color: COLORS.success, fontWeight: "bold" }}>
                  {formatDate(selectedDate)}
                </Text>
              </View>
            </Row>
          </Card>
        )}

        {/* Preparação */}
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

        {/* Mensagem de Validação */}
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

        {/* Botões */}
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
