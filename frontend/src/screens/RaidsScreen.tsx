import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, FlatList, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
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
  Badge,
  BadgeText,
} from "@/components/StyledComponents";
import { COLORS } from "@/constants";

const MOCK_RAIDS = [
  {
    id: "1",
    name: "Esquadrão Vida",
    description: "Junte-se a nós para salvar 50 vidas este mês!",
    participants: 12,
    goal: 50,
    progress: 24,
    image: "https://img.freepik.com/free-vector/blood-donation-concept-illustration_114360-1045.jpg",
  },
  {
    id: "2",
    name: "Heróis da Empresa X",
    description: "Campanha corporativa de doação de sangue.",
    participants: 45,
    goal: 100,
    progress: 80,
    image: "https://img.freepik.com/free-vector/blood-donor-concept-illustration_114360-5637.jpg",
  },
  {
    id: "3",
    name: "Universitários Unidos",
    description: "Alunos da universidade unidos pela causa.",
    participants: 8,
    goal: 20,
    progress: 5,
    image: "https://img.freepik.com/free-vector/blood-donation-concept-illustration_114360-1045.jpg",
  },
];

export default function RaidsScreen() {
  const navigation = useNavigation();

  const renderRaid = ({ item }: { item: any }) => (
    <Card style={{ marginBottom: 16, padding: 0, overflow: "hidden" }}>
      <View style={{ height: 120, backgroundColor: COLORS.light, alignItems: "center", justifyContent: "center" }}>
        <Ionicons name="people" size={60} color={COLORS.mediumGray} />
      </View>
      <View style={{ padding: 16 }}>
        <Row style={{ justifyContent: "space-between", alignItems: "center" }}>
          <Subtitle style={{ marginBottom: 4 }}>{item.name}</Subtitle>
          <Badge>
            <BadgeText>{item.participants} membros</BadgeText>
          </Badge>
        </Row>
        <Text style={{ color: COLORS.gray, marginBottom: 12 }}>{item.description}</Text>
        
        <View style={{ marginBottom: 8 }}>
          <Row style={{ justifyContent: "space-between", marginBottom: 4 }}>
            <SmallText>Progresso</SmallText>
            <SmallText>{item.progress}/{item.goal}</SmallText>
          </Row>
          <View style={{ height: 8, backgroundColor: COLORS.light, borderRadius: 4, overflow: "hidden" }}>
            <View style={{ width: `${(item.progress / item.goal) * 100}%`, height: "100%", backgroundColor: COLORS.primary }} />
          </View>
        </View>

        <GameButton variant="outline" style={{ marginTop: 8 }}>
          <ButtonText variant="outline">Participar do Squad</ButtonText>
        </GameButton>
      </View>
    </Card>
  );

  return (
    <Container>
      <StatusBar style="dark" />
      <ScrollContainer contentContainerStyle={{ paddingBottom: 40 }}>
        <Row style={{ alignItems: "center", marginTop: 50, marginBottom: 20, paddingHorizontal: 16 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 16 }}>
            <Ionicons name="arrow-back" size={24} color={COLORS.dark} />
          </TouchableOpacity>
          <Title>Raids & Squads</Title>
        </Row>

        <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
          <Text>Participe de grupos, cumpra missões coletivas e ganhe recompensas exclusivas!</Text>
        </View>

        <FlatList
          data={MOCK_RAIDS}
          renderItem={renderRaid}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          scrollEnabled={false} // Using ScrollContainer for main scroll
        />

        <View style={{ padding: 16 }}>
          <GameButton variant="primary">
            <ButtonText>CRIAR NOVO SQUAD</ButtonText>
          </GameButton>
        </View>

      </ScrollContainer>
    </Container>
  );
}
