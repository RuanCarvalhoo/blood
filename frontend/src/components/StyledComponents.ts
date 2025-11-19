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

export const Card = styled.View`
  background-color: ${COLORS.white};
  border-radius: 12px;
  padding: 16px;
  margin: 8px 16px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${COLORS.dark};
  margin-bottom: 8px;
`;

export const Subtitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${COLORS.dark};
  margin-bottom: 8px;
`;

export const Text = styled.Text`
  font-size: 16px;
  color: ${COLORS.dark};
  line-height: 24px;
`;

export const SmallText = styled.Text`
  font-size: 14px;
  color: ${COLORS.gray};
`;

export const Button = styled.TouchableOpacity<{
  variant?: "primary" | "secondary";
}>`
  background-color: ${(props: { variant?: "primary" | "secondary" }) =>
    props.variant === "secondary" ? COLORS.secondary : COLORS.primary};
  padding: 16px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  margin: 8px 16px;
`;

export const ButtonText = styled.Text`
  color: ${COLORS.white};
  font-size: 16px;
  font-weight: bold;
`;

export const ProgressBar = styled.View`
  height: 8px;
  background-color: ${COLORS.light};
  border-radius: 4px;
  overflow: hidden;
  margin: 8px 0;
`;

export const ProgressFill = styled.View<{ progress: number }>`
  height: 100%;
  width: ${(props: { progress: number }) => Math.min(props.progress, 100)}%;
  background-color: ${COLORS.success};
  border-radius: 4px;
`;

export const Badge = styled.View`
  background-color: ${COLORS.primary};
  padding: 8px 16px;
  border-radius: 16px;
  margin: 4px;
`;

export const BadgeText = styled.Text`
  color: ${COLORS.white};
  font-size: 12px;
  font-weight: 600;
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

export const Input = styled.TextInput`
  background-color: ${COLORS.light};
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 16px;
  color: ${COLORS.dark};
  border-width: 1px;
  border-color: ${COLORS.gray}20;
`;
