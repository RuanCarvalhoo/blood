import React from "react";
import { View, Image } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants";
import { User } from "@/types";
import { calculateLevel } from "@/utils";

const CardContainer = styled.View`
  background-color: ${COLORS.primary};
  border-radius: 20px;
  padding: 24px;
  margin: 16px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 4.65px;
  elevation: 8;
  position: relative;
  overflow: hidden;
`;

const CardHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const LogoText = styled.Text`
  color: ${COLORS.white};
  font-size: 20px;
  font-weight: bold;
`;

const UserInfo = styled.View`
  margin-bottom: 24px;
`;

const UserName = styled.Text`
  color: ${COLORS.white};
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 4px;
`;

const UserDetail = styled.Text`
  color: rgba(255, 255, 255, 0.9);
  font-size: 16px;
`;

const CardFooter = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

const LevelBadge = styled.View`
  background-color: rgba(255, 255, 255, 0.2);
  padding: 8px 16px;
  border-radius: 12px;
`;

const LevelText = styled.Text`
  color: ${COLORS.white};
  font-weight: bold;
`;

const QRCodePlaceholder = styled.View`
  width: 60px;
  height: 60px;
  background-color: ${COLORS.white};
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`;

interface Props {
  user: User;
}

export default function DigitalCard({ user }: Props) {
  const currentLevel = calculateLevel(user.points);
  const theme = user.profileCustomization?.cardTheme || "default";

  const getThemeColors = () => {
    switch (theme) {
      case "gold":
        return { bg: "#DAA520", text: "#FFF", accent: "#FFD700" };
      case "platinum":
        return { bg: "#E5E4E2", text: "#333", accent: "#C0C0C0" };
      case "black":
        return { bg: "#1A1A1A", text: "#FFF", accent: "#333" };
      default:
        return { bg: COLORS.primary, text: "#FFF", accent: "rgba(255,255,255,0.2)" };
    }
  };

  const colors = getThemeColors();

  return (
    <CardContainer style={{ backgroundColor: colors.bg }}>
      {/* Decorative background circles */}
      <View
        style={{
          position: "absolute",
          top: -50,
          right: -50,
          width: 150,
          height: 150,
          borderRadius: 75,
          backgroundColor: colors.accent,
          opacity: 0.2,
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: -30,
          left: -30,
          width: 100,
          height: 100,
          borderRadius: 50,
          backgroundColor: colors.accent,
          opacity: 0.2,
        }}
      />

      <CardHeader>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="water" size={24} color={colors.text} />
          <LogoText style={{ marginLeft: 8, color: colors.text }}>SangueBom</LogoText>
        </View>
        <Ionicons name="wifi" size={24} color={colors.text} style={{ opacity: 0.8 }} />
      </CardHeader>

      <UserInfo>
        <UserName style={{ color: colors.text }}>{user.name}</UserName>
        <UserDetail style={{ color: colors.text, opacity: 0.9 }}>Tipo Sanguíneo: {user.bloodType}</UserDetail>
        <UserDetail style={{ color: colors.text, opacity: 0.9 }}>Doador desde {new Date().getFullYear()}</UserDetail>
      </UserInfo>

      <CardFooter>
        <LevelBadge style={{ backgroundColor: colors.accent }}>
          <LevelText style={{ color: theme === "platinum" ? "#333" : "#FFF" }}>Nível {currentLevel.level}</LevelText>
          <LevelText style={{ fontSize: 12, opacity: 0.9, color: theme === "platinum" ? "#333" : "#FFF" }}>{currentLevel.name}</LevelText>
        </LevelBadge>
        
        <QRCodePlaceholder>
          <Ionicons name="qr-code" size={40} color={COLORS.dark} />
        </QRCodePlaceholder>
      </CardFooter>
    </CardContainer>
  );
}
