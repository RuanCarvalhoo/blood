import React from "react";
import { Modal, View } from "react-native";
import { Title, Text, Button, ButtonText } from "./StyledComponents";
import { COLORS } from "../constants";

interface DonationIntervalModalProps {
  visible: boolean;
  onClose: () => void;
  gender: "male" | "female";
}

export default function DonationIntervalModal({
  visible,
  onClose,
  gender,
}: DonationIntervalModalProps) {
  const getIntervalInfo = () => {
    return gender === "male"
      ? "\n• Intervalo mínimo: 60 dias\n• Máximo: 4 doações por ano"
      : "\n• Intervalo mínimo: 90 dias\n• Máximo: 3 doações por ano";
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <View
          style={{
            backgroundColor: COLORS.white,
            padding: 24,
            borderRadius: 12,
            width: "90%",
            maxWidth: 400,
          }}
        >
          <Title style={{ marginBottom: 16, textAlign: "center" }}>
            Intervalos de Doação
          </Title>
          <Text style={{ marginBottom: 20, lineHeight: 24 }}>
            {getIntervalInfo()}
          </Text>
          <Button onPress={onClose}>
            <ButtonText>Entendi</ButtonText>
          </Button>
        </View>
      </View>
    </Modal>
  );
}
