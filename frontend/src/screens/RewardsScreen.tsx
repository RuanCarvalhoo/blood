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
  Badge as BadgeComponent,
  BadgeText,
  Row,
} from "@/components/StyledComponents";
import { COLORS, LEVELS } from "@/constants";
import { Badge } from "@/types";
import { useAuth } from "@/contexts";

export default function RewardsScreen() {
  const { user, isLoading } = useAuth();

  const earnedBadges: Badge[] = user?.badges || [];

  const renderBadge = ({ item }: { item: Badge }) => (
    <Card>
      <Row>
        <Ionicons name={item.icon as any} size={48} color={COLORS.primary} />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Subtitle>{item.name}</Subtitle>
          <SmallText>{item.description}</SmallText>
          <SmallText style={{ marginTop: 4 }}>
            Conquistado em:{" "}
            {new Date(item.earnedDate).toLocaleDateString("pt-BR")}
          </SmallText>
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
      <Card style={{ marginTop: 50 }}>
        <Title>Recompensas</Title>
        <SmallText>Seus badges e conquistas</SmallText>
      </Card>

      <Card>
        <Subtitle>Badges Conquistados ({earnedBadges.length})</Subtitle>
      </Card>

      <FlatList
        data={earnedBadges}
        renderItem={renderBadge}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={null}
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
      />
    </Container>
  );
}
