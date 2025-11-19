import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, FlatList, ActivityIndicator } from "react-native";
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
  GameButton,
  ButtonText,
  Row,
} from "@/components/StyledComponents";
import { COLORS } from "@/constants";
import { MOCK_DONATION_HISTORY } from "@/constants/mocks";
import { formatDate } from "@/utils";
import { RootStackParamList } from "@/types";
import { useAuth } from "@/contexts";

type DonationsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "MainTabs"
>;

export default function DonationsScreen() {
  const navigation = useNavigation<DonationsScreenNavigationProp>();
  const { user, isLoading } = useAuth();

  // Use mock data instead of user.donations
  const donations = MOCK_DONATION_HISTORY;

  const renderDonationItem = ({ item }: { item: typeof MOCK_DONATION_HISTORY[0] }) => (
    <Card>
      <Row>
        <Ionicons name="water" size={40} color={COLORS.primary} />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Subtitle>{item.location}</Subtitle>
          <SmallText>{formatDate(new Date(item.date))}</SmallText>
          <Row style={{ marginTop: 4 }}>
            <Ionicons name="star" size={16} color={COLORS.warning} />
            <SmallText style={{ marginLeft: 4 }}>
              +50 pontos
            </SmallText>
          </Row>
        </View>
      </Row>
    </Card>
  );

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

  return (
    <Container>
      <StatusBar style="dark" />
      <Card style={{ marginTop: 50 }}>
        <Title>Minhas Doações</Title>
        <SmallText>Histórico de todas as suas doações</SmallText>
      </Card>

      {donations.length > 0 ? (
        <FlatList
          data={donations}
          renderItem={renderDonationItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      ) : (
        <Card>
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            Você ainda não fez nenhuma doação.
          </Text>
          <Text style={{ textAlign: "center", marginTop: 8 }}>
            Comece sua jornada agora!
          </Text>
        </Card>
      )}

      <View style={{ padding: 16 }}>
        <GameButton variant="primary" onPress={() => navigation.navigate("RegisterDonation")}>
          <ButtonText>Registrar Nova Doação</ButtonText>
        </GameButton>
      </View>
    </Container>
  );
}
