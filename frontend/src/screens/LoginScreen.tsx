import React, { useState } from "react";
import {
  View,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAuth } from "@/contexts";
import { RootStackParamList } from "@/types";
import {
  Container,
  GameButton,
  ButtonText,
  Title,
  Text,
  Input,
  Center,
} from "@/components/StyledComponents";
import { COLORS } from "@/constants";
import Mascot from "@/components/Mascot";

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

export default function LoginScreen({ navigation }: Props) {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Ops!", "Preencha todos os campos para continuar.");
      return;
    }

    try {
      await login(email, password);
    } catch (error: any) {
      Alert.alert("Erro ao entrar", error.message || "Verifique seus dados.");
    }
  };

  return (
    <Container>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Área do Mascote e Boas-vindas */}
          <Center style={{ marginBottom: 40, marginTop: 60 }}>
            <Mascot size={180} expression="happy" />
            <Title style={{ marginTop: 24, color: COLORS.primary }}>
              Salva
            </Title>
            <Text style={{ fontWeight: "bold", color: COLORS.mediumGray }}>
              Doe sangue, salve vidas, ganhe níveis!
            </Text>
          </Center>

          <View style={styles.form}>
            <Input
              placeholder="E-mail"
              placeholderTextColor={COLORS.mediumGray}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              editable={!isLoading}
            />

            <Input
              placeholder="Senha"
              placeholderTextColor={COLORS.mediumGray}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              editable={!isLoading}
            />

            <GameButton
              variant="primary"
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={COLORS.white} />
              ) : (
                <ButtonText>ENTRAR</ButtonText>
              )}
            </GameButton>

            <View style={{ marginTop: 10 }}>
              <GameButton
                variant="outline"
                onPress={() => navigation.navigate("Register")}
                disabled={isLoading}
              >
                <ButtonText variant="outline">CRIAR CONTA GRÁTIS</ButtonText>
              </GameButton>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  form: {
    width: "100%",
  },
});
