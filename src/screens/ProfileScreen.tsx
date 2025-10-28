import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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
} from '../components/StyledComponents';
import { COLORS } from '../constants';
import { calculateLevel } from '../utils';

export default function ProfileScreen() {
  // Mock user data
  const user = {
    name: 'João Silva',
    email: 'joao.silva@email.com',
    bloodType: 'O+' as const,
    points: 250,
    totalDonations: 2,
    gender: 'male' as const,
  };

  const currentLevel = calculateLevel(user.points);

  return (
    <Container>
      <StatusBar style="dark" />
      <ScrollContainer>
        {/* Profile Header */}
        <Card style={{ marginTop: 50 }}>
          <Center>
            <View
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                backgroundColor: COLORS.primary,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 16,
              }}
            >
              <Ionicons name="person" size={50} color={COLORS.white} />
            </View>
            <Title>{user.name}</Title>
            <SmallText>{user.email}</SmallText>
            <Badge style={{ marginTop: 8 }}>
              <BadgeText>Nível {currentLevel.level}: {currentLevel.name}</BadgeText>
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
              <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 8 }}>
                {user.points}
              </Text>
              <SmallText>Pontos</SmallText>
            </Center>
            <Center style={{ flex: 1 }}>
              <Ionicons name="water" size={32} color={COLORS.primary} />
              <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 8 }}>
                {user.totalDonations}
              </Text>
              <SmallText>Doações</SmallText>
            </Center>
            <Center style={{ flex: 1 }}>
              <Ionicons name="people" size={32} color={COLORS.success} />
              <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 8 }}>
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
              <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
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
      </ScrollContainer>
    </Container>
  );
}
