import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants";

interface DonationInfoButtonProps {
  onPress: () => void;
}

export default function DonationInfoButton({
  onPress,
}: DonationInfoButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        marginLeft: 8,
        padding: 4,
        borderRadius: 12,
        backgroundColor: "rgba(0,0,0,0.05)",
      }}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      activeOpacity={0.7}
    >
      <Ionicons name="help-circle-outline" size={20} color={COLORS.primary} />
    </TouchableOpacity>
  );
}
