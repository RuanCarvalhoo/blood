import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, TouchableOpacity, Platform, FlatList, Modal } from "react-native";
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
  GameButton,
  ButtonText,
  Row,
  Center,
} from "@/components/StyledComponents";
import { COLORS, DONATION_INTERVAL_DAYS } from "@/constants";
import { MOCK_HEMOCENTERS } from "@/constants/mocks";
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

  const getInitialMinDate = () => {
    if (!user) return new Date();
    const intervalDays = DONATION_INTERVAL_DAYS[user.gender] || 90;
    let lastDonation = new Date();
    if (user.lastDonationDate) {
      const parsedDate = new Date(user.lastDonationDate);
      if (!isNaN(parsedDate.getTime())) {
        lastDonation = parsedDate;
      }
    }
    const minimumDate = new Date(lastDonation);
    minimumDate.setDate(minimumDate.getDate() + intervalDays);
    if (isNaN(minimumDate.getTime())) return new Date();
    return minimumDate;
  };

  const [minDate] = useState<Date>(getInitialMinDate());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedHemocenter, setSelectedHemocenter] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showHemocenterModal, setShowHemocenterModal] = useState(false);

  const handleDateChange = (event: any, date?: Date) => {
    if (Platform.OS !== "web") {
      setShowDatePicker(Platform.OS === "ios");
    }
    if (date) {
      setSelectedDate(date);
      setSelectedTime(null); // Reset time when date changes
    }
  };

  const handleWebDateChange = (e: any) => {
    const dateValue = e.target.value;
    if (dateValue) {
      setSelectedDate(new Date(dateValue));
      setSelectedTime(null);
    }
  };

  const handleSchedule = () => {
    if (!selectedDate || !selectedHemocenter || !selectedTime) {
      return;
    }
    // TODO: API call
    navigation.goBack();
  };

  const getIntervalInfo = () => {
    if (!user) return "";
    const intervalDays = DONATION_INTERVAL_DAYS[user.gender];
    const maxDonations = user.gender === "male" ? 4 : 3;
    return `Intervalo: ${intervalDays} dias | Máximo: ${maxDonations} doações/ano`;
  };

  const selectedHemocenterData = MOCK_HEMOCENTERS.find(h => h.id === selectedHemocenter);

  if (!user) return null;

  return (
    <Container>
      <StatusBar style="dark" />
      <ScrollContainer contentContainerStyle={{ paddingBottom: 40 }}>
        <Row style={{ alignItems: "center", marginTop: 50, marginBottom: 20, paddingHorizontal: 16 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 16 }}>
            <Ionicons name="arrow-back" size={24} color={COLORS.dark} />
          </TouchableOpacity>
          <Title>Agendar Doação</Title>
        </Row>

        <Card>
          <Subtitle>Local de Doação</Subtitle>
          <TouchableOpacity
            onPress={() => setShowHemocenterModal(true)}
            style={{
              backgroundColor: COLORS.light,
              padding: 16,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: selectedHemocenter ? COLORS.primary : COLORS.border,
              marginTop: 8,
            }}
          >
            <Row style={{ alignItems: "center", justifyContent: "space-between" }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "bold", color: selectedHemocenter ? COLORS.dark : COLORS.mediumGray }}>
                  {selectedHemocenterData ? selectedHemocenterData.name : "Selecione um hemocentro"}
                </Text>
                {selectedHemocenterData && (
                  <SmallText>{selectedHemocenterData.address}</SmallText>
                )}
              </View>
              <Ionicons name="chevron-down" size={20} color={COLORS.mediumGray} />
            </Row>
          </TouchableOpacity>
        </Card>

        <Card>
          <Subtitle>Data</Subtitle>
          <SmallText style={{ marginTop: 4, marginBottom: 12 }}>
            {getIntervalInfo()}
          </SmallText>

          {Platform.OS === "web" ? (
            <View style={{
              backgroundColor: COLORS.light,
              padding: 16,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: selectedDate ? COLORS.primary : COLORS.border,
            }}>
              <input
                type="date"
                value={selectedDate ? selectedDate.toISOString().split("T")[0] : ""}
                onChange={handleWebDateChange}
                min={minDate.toISOString().split("T")[0]}
                style={{
                  fontSize: 16,
                  color: COLORS.dark,
                  backgroundColor: "transparent",
                  border: "none",
                  outline: "none",
                  width: "100%",
                  fontFamily: "inherit",
                }}
              />
            </View>
          ) : (
            <>
              <TouchableOpacity
                style={{
                  backgroundColor: COLORS.light,
                  padding: 16,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: selectedDate ? COLORS.primary : COLORS.border,
                  alignItems: "center",
                }}
                onPress={() => setShowDatePicker(true)}
              >
                <Row style={{ alignItems: "center" }}>
                  <Ionicons name="calendar" size={24} color={selectedDate ? COLORS.primary : COLORS.mediumGray} />
                  <Text style={{ marginLeft: 12, color: selectedDate ? COLORS.dark : COLORS.mediumGray }}>
                    {selectedDate ? formatDate(selectedDate) : "Toque para selecionar a data"}
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
            </>
          )}
        </Card>

        {selectedHemocenterData && selectedDate && (
          <Card>
            <Subtitle>Horário Disponível</Subtitle>
            <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 12, gap: 10 }}>
              {selectedHemocenterData.availableSlots.map((time) => (
                <TouchableOpacity
                  key={time}
                  onPress={() => setSelectedTime(time)}
                  style={{
                    backgroundColor: selectedTime === time ? COLORS.primary : COLORS.light,
                    paddingVertical: 10,
                    paddingHorizontal: 16,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: selectedTime === time ? COLORS.primaryDark : COLORS.border,
                  }}
                >
                  <Text style={{
                    color: selectedTime === time ? COLORS.white : COLORS.dark,
                    fontWeight: "bold",
                    fontSize: 14
                  }}>
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Card>
        )}

        <View style={{ padding: 16 }}>
          <GameButton
            variant="primary"
            onPress={handleSchedule}
            disabled={!selectedDate || !selectedHemocenter || !selectedTime}
            style={{ opacity: (!selectedDate || !selectedHemocenter || !selectedTime) ? 0.5 : 1 }}
          >
            <ButtonText>CONFIRMAR AGENDAMENTO</ButtonText>
          </GameButton>
        </View>

        {/* Modal de Hemocentros */}
        <Modal
          visible={showHemocenterModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowHemocenterModal(false)}
        >
          <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "flex-end" }}>
            <View style={{ backgroundColor: COLORS.background, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, maxHeight: "80%" }}>
              <Row style={{ justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <Title style={{ fontSize: 22, marginBottom: 0 }}>Selecione o Local</Title>
                <TouchableOpacity onPress={() => setShowHemocenterModal(false)}>
                  <Ionicons name="close" size={24} color={COLORS.dark} />
                </TouchableOpacity>
              </Row>
              
              <FlatList
                data={MOCK_HEMOCENTERS}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedHemocenter(item.id);
                      setShowHemocenterModal(false);
                    }}
                    style={{
                      padding: 16,
                      borderBottomWidth: 1,
                      borderBottomColor: COLORS.border,
                      backgroundColor: selectedHemocenter === item.id ? COLORS.light : "transparent"
                    }}
                  >
                    <Text style={{ fontWeight: "bold", fontSize: 16 }}>{item.name}</Text>
                    <SmallText>{item.address}</SmallText>
                    <Row style={{ marginTop: 4 }}>
                      <Ionicons name="location-outline" size={14} color={COLORS.primary} />
                      <SmallText style={{ marginLeft: 4, color: COLORS.primary }}>{item.distance}</SmallText>
                    </Row>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>

      </ScrollContainer>
    </Container>
  );
}
