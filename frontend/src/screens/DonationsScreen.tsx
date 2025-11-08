import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, FlatList, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  Container,
  Card,
  Title,
  Subtitle,
  Text,
  SmallText,
  Button,
  ButtonText,
  Row,
} from "@/components/StyledComponents";
import { COLORS } from "@/constants";
import { formatDate } from "@/utils";
import { Donation } from "@/types";
import { useAuth } from "@/contexts";

export default function DonationsScreen() {
  const { user, isLoading } = useAuth();

  const donations: Donation[] = user?.donations || [];

  const renderDonationItem = ({ item }: { item: Donation }) => (
    <Card>
      <Row>
        <Ionicons name="water" size={40} color={COLORS.primary} />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Subtitle>{item.location}</Subtitle>
          <SmallText>{formatDate(item.date)}</SmallText>
          <Row style={{ marginTop: 4 }}>
            <Ionicons name="star" size={16} color={COLORS.warning} />
            <SmallText style={{ marginLeft: 4 }}>
              +{item.pointsEarned} pontos
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

      <Button>
        <ButtonText>Registrar Nova Doação</ButtonText>
      </Button>
    </Container>
  );
}
