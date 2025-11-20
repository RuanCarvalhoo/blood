import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants";

interface AvatarWithFrameProps {
  size?: number;
  frame?: "none" | "bronze" | "silver" | "gold" | "diamond";
  imageUri?: string;
}

export default function AvatarWithFrame({
  size = 100,
  frame = "none",
  imageUri,
}: AvatarWithFrameProps) {
  const getFrameColor = () => {
    switch (frame) {
      case "bronze":
        return "#CD7F32";
      case "silver":
        return "#C0C0C0";
      case "gold":
        return "#FFD700";
      case "diamond":
        return "#B9F2FF";
      default:
        return "transparent";
    }
  };

  const frameColor = getFrameColor();
  const borderWidth = frame === "none" ? 0 : 4;

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: borderWidth,
          borderColor: frameColor,
          padding: frame === "none" ? 0 : 4, // Space between frame and image
        },
      ]}
    >
      <View
        style={{
          width: "100%",
          height: "100%",
          borderRadius: size / 2,
          overflow: "hidden",
          backgroundColor: COLORS.light,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={{ width: "100%", height: "100%" }}
          />
        ) : (
          <Ionicons
            name="person"
            size={size * 0.6}
            color={COLORS.gray}
          />
        )}
      </View>
      
      {/* Optional: Add a small badge or icon for the frame type if needed */}
      {frame !== "none" && (
        <View style={[styles.badge, { backgroundColor: frameColor }]}>
          <Ionicons name="star" size={12} color={COLORS.white} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  badge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: COLORS.white,
  },
});
