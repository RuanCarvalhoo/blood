import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, ActivityIndicator, TouchableOpacity } from "react-native";
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
  Center,
  Badge,
  BadgeText,
} from "@/components/StyledComponents";
import { COLORS } from "@/constants";
import { calculateLevel } from "@/utils";
import { useAuth, useNotifications } from "@/contexts";
import { RootStackParamList } from "@/types";

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList>;

export default function ProfileScreen() {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const { user, isLoading, logout } = useAuth();
  const { unreadCount } = useNotifications();

  // Show loading state
  if (isLoading) {
    return (
      <Container>
        <Center style={{ flex: 1 }}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={{ marginTop: 16 }}>Carregando...</Text>
        </Center>
      </Container>
    );
  }

  // Show login prompt if no user
  if (!user) {
    return (
      <Container>
        <Center style={{ flex: 1 }}>
          <Ionicons
            name="person-circle-outline"
            size={80}
            color={COLORS.gray}
          />
          <Title style={{ marginTop: 16 }}>Faça login</Title>
          <Text style={{ marginTop: 8, textAlign: "center" }}>
            Entre para acessar seu perfil
          </Text>
        </Center>
      </Container>
    );
  }

  const currentLevel = calculateLevel(user.points);

  return (
    <Container>
      <StatusBar style="dark" />
      <ScrollContainer>
        {/* Profile Header with Notifications */}
        <Row style={{ marginTop: 50, marginBottom: 20, paddingHorizontal: 16 }}>
          <View style={{ flex: 1 }} />
          <TouchableOpacity
            onPress={() => navigation.navigate("Notifications")}
            style={{ position: "relative" }}
          >
            <Ionicons
              name="notifications-outline"
              size={28}
              color={COLORS.dark}
            />
            {unreadCount > 0 && (
              <View
                style={{
                  position: "absolute",
                  top: -4,
                  right: -4,
                  backgroundColor: COLORS.danger,
                  borderRadius: 10,
                  minWidth: 20,
                  height: 20,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingHorizontal: 4,
                }}
              >
                <SmallText
                  style={{
                    color: COLORS.white,
                    fontSize: 10,
                    fontWeight: "bold",
                  }}
                >
                  {unreadCount > 99 ? "99+" : unreadCount}
                </SmallText>
              </View>
            )}
          </TouchableOpacity>
        </Row>

        <Card>
          <Center>
            <View
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                backgroundColor: COLORS.primary,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 16,
              }}
            >
              <Ionicons name="person" size={50} color={COLORS.white} />
            </View>
            <Title>{user.name}</Title>
            <SmallText>{user.email}</SmallText>
            <Badge style={{ marginTop: 8 }}>
              <BadgeText>
                Nível {currentLevel.level}: {currentLevel.name}
              </BadgeText>
            </Badge>
          </Center>
        </Card>

        {/* Blood Type Card */}
        <Card>
          <Subtitle>Informações Pessoais</Subtitle>
          <Row style={{ marginTop: 12 }}>
            <Ionicons name="water" size={24} color={COLORS.primary} />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text>Tipo Sanguíneo</Text>
              <SmallText>{user.bloodType}</SmallText>
            </View>
          </Row>
        </Card>

        {/* Stats Card */}
        <Card>
          <Subtitle>Estatísticas</Subtitle>
          <Row style={{ marginTop: 12, marginBottom: 12 }}>
            <Center style={{ flex: 1 }}>
              <Ionicons name="trophy" size={32} color={COLORS.warning} />
              <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 8 }}>
                {user.points}
              </Text>
              <SmallText>Pontos</SmallText>
            </Center>
            <Center style={{ flex: 1 }}>
              <Ionicons name="water" size={32} color={COLORS.primary} />
              <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 8 }}>
                {user.totalDonations}
              </Text>
              <SmallText>Doações</SmallText>
            </Center>
            <Center style={{ flex: 1 }}>
              <Ionicons name="people" size={32} color={COLORS.success} />
              <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 8 }}>
                {user.totalDonations * 4}
              </Text>
              <SmallText>Vidas Salvas</SmallText>
            </Center>
          </Row>
        </Card>

        {/* Benefits Card */}
        <Card>
          <Subtitle>Seus Benefícios</Subtitle>
          {currentLevel.benefits.map((benefit, index) => (
            <Row key={index} style={{ marginTop: 8 }}>
              <Ionicons
                name="checkmark-circle"
                size={20}
                color={COLORS.success}
              />
              <Text style={{ marginLeft: 8, flex: 1 }}>{benefit}</Text>
            </Row>
          ))}
        </Card>

        {/* Settings Buttons */}
        <Button>
          <ButtonText>Editar Perfil</ButtonText>
        </Button>
        <Button variant="secondary">
          <ButtonText>Configurações</ButtonText>
        </Button>
        <Button
          variant="secondary"
          onPress={logout}
          style={{ marginTop: 8, backgroundColor: "#dc2626" }}
        >
          <ButtonText style={{ color: "#fff" }}>Sair</ButtonText>
        </Button>
      </ScrollContainer>
    </Container>
  );
}
