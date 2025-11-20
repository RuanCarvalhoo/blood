import React, { useState } from "react";
import { View, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import {
  Container,
  Title,
  Subtitle,
  Text,
  GameButton,
  ButtonText,
  Row,
  Card,
} from "@/components/StyledComponents";
import { COLORS } from "@/constants";
import { useAuth } from "@/contexts";
import AvatarWithFrame from "@/components/AvatarWithFrame";
import DigitalCard from "@/components/DigitalCard";
import { ProfileCustomization } from "@/types";

export default function EditProfileScreen() {
  const navigation = useNavigation();
  const { user, updateUser } = useAuth(); // Assuming updateUser exists in context, otherwise we'll mock it locally for now or add it later
  
  // Local state for previewing changes
  const [customization, setCustomization] = useState<ProfileCustomization>(
    user?.profileCustomization || {
      cardTheme: "default",
      avatarFrame: "none",
      profileTheme: "light",
    }
  );

  const handleSave = () => {
    // In a real app, this would call an API
    // For now, we'll assume updateUser updates the local context/mock
    if (user) {
        // @ts-ignore - updateUser might not be fully typed in the context yet
        updateUser({ ...user, profileCustomization: customization });
    }
    Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
    navigation.goBack();
  };

  const renderOption = (
    label: string,
    isSelected: boolean,
    onSelect: () => void,
    isLocked: boolean = false
  ) => (
    <TouchableOpacity
      onPress={isLocked ? () => Alert.alert("Bloqueado", "Nível insuficiente para desbloquear este item.") : onSelect}
      style={{
        padding: 12,
        backgroundColor: isSelected ? COLORS.primary : COLORS.light,
        borderRadius: 8,
        marginRight: 8,
        opacity: isLocked ? 0.5 : 1,
        borderWidth: 1,
        borderColor: isSelected ? COLORS.primary : COLORS.border,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {isLocked && <Ionicons name="lock-closed" size={16} color={COLORS.gray} style={{ marginRight: 4 }} />}
      <Text style={{ color: isSelected ? COLORS.white : COLORS.dark }}>{label}</Text>
    </TouchableOpacity>
  );

  // Mock logic for unlocking items based on level
  const userLevel = user?.level || 1;

  return (
    <Container>
      <View style={{ flexDirection: "row", alignItems: "center", padding: 16, marginTop: 40 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.dark} />
        </TouchableOpacity>
        <Title style={{ marginLeft: 16, marginTop: 0 }}>Editar Perfil</Title>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
        
        {/* Avatar Frame Selection */}
        <Card>
          <Subtitle>Moldura do Avatar</Subtitle>
          <View style={{ alignItems: "center", marginVertical: 16 }}>
            <AvatarWithFrame 
                frame={customization.avatarFrame} 
                size={100} 
            />
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {renderOption("Padrão", customization.avatarFrame === "none", () => setCustomization({ ...customization, avatarFrame: "none" }))}
            {renderOption("Bronze", customization.avatarFrame === "bronze", () => setCustomization({ ...customization, avatarFrame: "bronze" }), userLevel < 2)}
            {renderOption("Prata", customization.avatarFrame === "silver", () => setCustomization({ ...customization, avatarFrame: "silver" }), userLevel < 5)}
            {renderOption("Ouro", customization.avatarFrame === "gold", () => setCustomization({ ...customization, avatarFrame: "gold" }), userLevel < 10)}
            {renderOption("Diamante", customization.avatarFrame === "diamond", () => setCustomization({ ...customization, avatarFrame: "diamond" }), userLevel < 20)}
          </ScrollView>
        </Card>

        {/* Profile Theme Selection */}
        <Card>
          <Subtitle>Tema do Perfil</Subtitle>
          <View style={{ 
              height: 60, 
              backgroundColor: customization.profileTheme === 'dark' ? '#1a1a1a' : customization.profileTheme === 'red' ? '#ffebee' : '#f5f5f5',
              borderRadius: 8,
              marginBottom: 16,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: COLORS.border
          }}>
              <Text style={{ color: customization.profileTheme === 'dark' ? '#fff' : '#000' }}>Pré-visualização do Fundo</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {renderOption("Claro", customization.profileTheme === "light", () => setCustomization({ ...customization, profileTheme: "light" }))}
            {renderOption("Escuro", customization.profileTheme === "dark", () => setCustomization({ ...customization, profileTheme: "dark" }), userLevel < 5)}
            {renderOption("Sangue", customization.profileTheme === "red", () => setCustomization({ ...customization, profileTheme: "red" }), userLevel < 10)}
          </ScrollView>
        </Card>

        {/* Digital Card Style Selection */}
        <Card>
          <Subtitle>Estilo do Cartão</Subtitle>
          <View style={{ marginVertical: 16, transform: [{ scale: 0.9 }] }}>
             {/* @ts-ignore - passing a temporary user object with the new theme for preview */}
            <DigitalCard user={{ ...user, profileCustomization: customization } as any} />
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {renderOption("Padrão", customization.cardTheme === "default", () => setCustomization({ ...customization, cardTheme: "default" }))}
            {renderOption("Ouro", customization.cardTheme === "gold", () => setCustomization({ ...customization, cardTheme: "gold" }), userLevel < 10)}
            {renderOption("Platina", customization.cardTheme === "platinum", () => setCustomization({ ...customization, cardTheme: "platinum" }), userLevel < 20)}
            {renderOption("Black", customization.cardTheme === "black", () => setCustomization({ ...customization, cardTheme: "black" }), userLevel < 30)}
          </ScrollView>
        </Card>

        <GameButton onPress={handleSave} style={{ marginTop: 24 }}>
          <ButtonText>Salvar Alterações</ButtonText>
        </GameButton>

      </ScrollView>
    </Container>
  );
}
