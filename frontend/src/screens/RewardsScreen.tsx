import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, FlatList, ActivityIndicator, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  Container,
  Card,
  Title,
  Subtitle,
  Text,
  SmallText,
  Badge as BadgeComponent,
  BadgeText,
  Row,
  GameButton,
  ButtonText,
} from "@/components/StyledComponents";
import { COLORS, LEVELS } from "@/constants";
import { MOCK_REWARDS } from "@/constants/mocks";
import { useAuth } from "@/contexts";

export default function RewardsScreen() {
  const { user, isLoading } = useAuth();

  const renderReward = ({ item }: { item: typeof MOCK_REWARDS[0] }) => (
    <Card>
      <Row>
        <Image 
          source={{ uri: item.image }} 
          style={{ width: 80, height: 80, borderRadius: 12, marginRight: 12 }} 
        />
        <View style={{ flex: 1 }}>
          <Subtitle>{item.title}</Subtitle>
          <SmallText>{item.description}</SmallText>
          <Row style={{ marginTop: 8, justifyContent: "space-between", alignItems: "center" }}>
            <Row>
              <Ionicons name="trophy" size={16} color={COLORS.warning} />
              <Text style={{ marginLeft: 4, fontWeight: "bold", color: COLORS.warning }}>{item.cost} pts</Text>
            </Row>
            <GameButton 
              variant="outline" 
              style={{ paddingVertical: 8, paddingHorizontal: 12, margin: 0 }}
              disabled={user ? user.points < item.cost : true}
            >
              <ButtonText variant="outline" style={{ fontSize: 12 }}>Resgatar</ButtonText>
            </GameButton>
          </Row>
        </View>
      </Row>
    </Card>
  );

  const renderLevel = ({ item }: { item: (typeof LEVELS)[0] }) => (
    <Card>
      <Row>
        <Ionicons name="star" size={32} color={COLORS.warning} />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Subtitle>
            Nível {item.level}: {item.name}
          </Subtitle>
          <SmallText>
            {item.minPoints} -{" "}
            {item.maxPoints === Infinity ? "∞" : item.maxPoints} pontos
          </SmallText>
          <View
            style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 8 }}
          >
            {item.benefits.map((benefit, index) => (
              <BadgeComponent key={index}>
                <BadgeText>{benefit}</BadgeText>
              </BadgeComponent>
            ))}
          </View>
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
      <FlatList
        data={MOCK_REWARDS}
        renderItem={renderReward}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => (
          <View style={{ marginTop: 50 }}>
            <Card>
              <Title>Recompensas</Title>
              <SmallText>Troque seus pontos por benefícios</SmallText>
              <View style={{ marginTop: 16, backgroundColor: COLORS.light, padding: 12, borderRadius: 12, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                <Ionicons name="wallet" size={24} color={COLORS.primary} />
                <Text style={{ marginLeft: 8, fontWeight: "bold", fontSize: 18 }}>Seus Pontos: {user.points}</Text>
              </View>
            </Card>
            <Card>
              <Subtitle>Disponíveis para Resgate</Subtitle>
            </Card>
          </View>
        )}
        ListFooterComponent={() => (
          <>
            <Card style={{ marginTop: 20 }}>
              <Subtitle>Sistema de Níveis</Subtitle>
              <SmallText>
                Avance de nível e desbloqueie benefícios exclusivos
              </SmallText>
            </Card>
            <FlatList
              data={LEVELS}
              renderItem={renderLevel}
              keyExtractor={(item) => item.level.toString()}
              scrollEnabled={false}
            />
          </>
        )}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </Container>
  );
}
