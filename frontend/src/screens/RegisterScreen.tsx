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
import { Picker } from "@react-native-picker/picker";
import { useAuth } from "@/contexts";
import { BloodType } from "@/types";
import { StackNavigationProp } from "@react-navigation/stack";
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

type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Register"
>;

interface Props {
  navigation: RegisterScreenNavigationProp;
}

export default function RegisterScreen({ navigation }: Props) {
  const { register, isLoading } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [weight, setWeight] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [bloodType, setBloodType] = useState<BloodType>("O+");
  const [gender, setGender] = useState<"MALE" | "FEMALE">("MALE");

  const bloodTypes: BloodType[] = [
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-",
  ];

  const handleRegister = async () => {
    if (!name || !email || !telephone || !password || !confirmPassword || !weight) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    if (parseFloat(weight) < 50) {
      Alert.alert("Atenção", "Para doar sangue é necessário pesar no mínimo 50kg.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Erro", "E-mail inválido");
      return;
    }

    try {
      await register({
        name,
        email,
        telephone,
        password,
        bloodType,
        gender,
        weight: parseFloat(weight),
      });
      Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
    } catch (error: any) {
      Alert.alert("Erro ao cadastrar", error.message || "Tente novamente");
    }
  };

  return (
    <Container>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Center style={{ marginBottom: 32, marginTop: 40 }}>
            <Mascot size={120} expression="happy" />
            <Title style={{ marginTop: 16, color: COLORS.primary }}>
              Criar Conta
            </Title>
            <Text style={{ fontWeight: "bold", color: COLORS.mediumGray }}>
              Junte-se à comunidade de doadores!
            </Text>
          </Center>

          <View style={styles.form}>
            <Input
              placeholder="Nome completo"
              placeholderTextColor={COLORS.mediumGray}
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              editable={!isLoading}
            />

            <Input
              placeholder="E-mail"
              placeholderTextColor={COLORS.mediumGray}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
              editable={!isLoading}
            />

            <Input
              placeholder="Telefone (11) 99999-9999"
              placeholderTextColor={COLORS.mediumGray}
              value={telephone}
              onChangeText={setTelephone}
              keyboardType="phone-pad"
              editable={!isLoading}
            />

            <Input
              placeholder="Peso (kg)"
              placeholderTextColor={COLORS.mediumGray}
              value={weight}
              onChangeText={setWeight}
              keyboardType="numeric"
              editable={!isLoading}
            />

            <View style={styles.pickerContainer}>
              <Text style={styles.label}>Tipo Sanguíneo</Text>
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={bloodType}
                  onValueChange={(itemValue) => setBloodType(itemValue)}
                  style={styles.picker}
                  enabled={!isLoading}
                >
                  {bloodTypes.map((type) => (
                    <Picker.Item key={type} label={type} value={type} />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={styles.pickerContainer}>
              <Text style={styles.label}>Gênero</Text>
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={gender}
                  onValueChange={(itemValue) => setGender(itemValue)}
                  style={styles.picker}
                  enabled={!isLoading}
                >
                  <Picker.Item label="Masculino" value="MALE" />
                  <Picker.Item label="Feminino" value="FEMALE" />
                </Picker>
              </View>
            </View>

            <Input
              placeholder="Senha"
              placeholderTextColor={COLORS.mediumGray}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="password"
              editable={!isLoading}
            />

            <Input
              placeholder="Confirmar Senha"
              placeholderTextColor={COLORS.mediumGray}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              autoComplete="password"
              editable={!isLoading}
            />

            <GameButton
              variant="primary"
              onPress={handleRegister}
              disabled={isLoading}
              style={{ marginTop: 16 }}
            >
              {isLoading ? (
                <ActivityIndicator color={COLORS.white} />
              ) : (
                <ButtonText>CADASTRAR</ButtonText>
              )}
            </GameButton>

            <GameButton
              variant="outline"
              onPress={() => navigation.navigate("Login")}
              disabled={isLoading}
            >
              <ButtonText variant="outline">JÁ TENHO CONTA</ButtonText>
            </GameButton>
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
    paddingBottom: 40,
  },
  form: {
    width: "100%",
  },
  pickerContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.dark,
    marginBottom: 8,
    marginLeft: 4,
  },
  pickerWrapper: {
    backgroundColor: COLORS.light,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: 16,
    overflow: "hidden",
  },
  picker: {
    height: 55,
    color: COLORS.dark,
  },
});
