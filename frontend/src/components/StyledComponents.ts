import styled from "styled-components/native";
import { COLORS } from "../constants";

export const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.background};
`;

export const ScrollContainer = styled.ScrollView`
  flex: 1;
  background-color: ${COLORS.background};
`;

// Card com borda suave estilo Duolingo
export const Card = styled.View`
  background-color: ${COLORS.white};
  border-radius: 20px;
  padding: 20px;
  margin: 10px 16px;
  border-width: 2px;
  border-color: ${COLORS.border};
  /* Sombra sólida em vez de difusa */
  border-bottom-width: 4px;
`;

export const Title = styled.Text`
  font-size: 28px;
  font-weight: 800; /* Extra Bold */
  color: ${COLORS.dark};
  margin-bottom: 8px;
  letter-spacing: -0.5px;
`;

export const Subtitle = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: ${COLORS.dark};
  margin-bottom: 8px;
`;

export const Text = styled.Text`
  font-size: 17px;
  color: ${COLORS.dark};
  line-height: 26px;
  font-weight: 500;
`;

export const SmallText = styled.Text`
  font-size: 15px;
  color: ${COLORS.mediumGray};
  font-weight: 600;
`;

// O Input estilo "Duolingo" é cinza claro com borda
export const Input = styled.TextInput`
  background-color: ${COLORS.light};
  border-width: 2px;
  border-color: ${COLORS.border};
  border-radius: 16px;
  padding: 16px;
  font-size: 18px;
  color: ${COLORS.dark};
  margin-bottom: 16px;
  font-weight: 600;
`;

// Botão com efeito 3D (borda inferior grossa)
export const Button = styled.TouchableOpacity<{
  variant?: "primary" | "secondary" | "outline";
}>`
  background-color: ${(props: {
    variant?: "primary" | "secondary" | "outline";
  }) =>
    props.variant === "secondary"
      ? COLORS.secondary
      : props.variant === "outline"
      ? "transparent"
      : COLORS.primary};

  padding: 16px;
  border-radius: 16px;
  align-items: center;
  justify-content: center;
  margin: 8px 0;

  /* Efeito 3D */
  border-width: ${(props: { variant?: "primary" | "secondary" | "outline" }) =>
    props.variant === "outline" ? "2px" : "0px"};
  border-bottom-width: 4px;
  border-color: ${(props: { variant?: "primary" | "secondary" | "outline" }) =>
    props.variant === "secondary"
      ? COLORS.secondaryDark
      : props.variant === "outline"
      ? COLORS.border
      : COLORS.primaryDark};
`;

export const GameButton = Button;

export const ButtonText = styled.Text<{ variant?: "outline" }>`
  color: ${(props: { variant?: "outline" }) =>
    props.variant === "outline" ? COLORS.mediumGray : COLORS.white};
  font-size: 18px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

// Barra de progresso arredondada e grossa
export const ProgressBar = styled.View`
  height: 20px;
  background-color: ${COLORS.border};
  border-radius: 12px;
  overflow: hidden;
  margin: 12px 0;
`;

export const ProgressFill = styled.View<{ progress: number }>`
  height: 100%;
  width: ${(props: { progress: number }) => Math.min(props.progress, 100)}%;
  background-color: ${COLORS.warning};
  border-radius: 12px;
  /* Brilho no topo da barra */
  border-top-width: 4px;
  border-top-color: rgba(255, 255, 255, 0.3);
`;

export const Badge = styled.View`
  background-color: ${COLORS.warning};
  padding: 8px 16px;
  border-radius: 20px;
  margin: 4px;
  border-bottom-width: 3px;
  border-color: ${COLORS.warningDark};
`;

export const BadgeText = styled.Text`
  color: ${COLORS.white};
  font-size: 14px;
  font-weight: 800;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Center = styled.View`
  align-items: center;
  justify-content: center;
`;
