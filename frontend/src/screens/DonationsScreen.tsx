import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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
} from '@/components/StyledComponents';
import { COLORS } from '@/constants';
import { formatDate } from '@/utils';
import { Donation } from '@/types';

export default function DonationsScreen() {
  // Mock donations data
  const donations: Donation[] = [
    {
      id: '1',
      userId: '1',
      date: new Date('2024-08-15'),
      location: 'Hospital São Lucas',
      pointsEarned: 100,
    },
    {
      id: '2',
      userId: '1',
      date: new Date('2024-06-10'),
      location: 'Hemocentro Central',
      pointsEarned: 100,
    },
  ];

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
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            Você ainda não fez nenhuma doação.
          </Text>
          <Text style={{ textAlign: 'center', marginTop: 8 }}>
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
