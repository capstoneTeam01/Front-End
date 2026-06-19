import React from "react";
import { Pressable, Text } from "react-native";

const ProviderPlainButton = ({ title, onPress, disabled = false }) => (
  <Pressable
    onPress={disabled ? undefined : onPress}
    style={{
      backgroundColor: disabled ? "#555" : "#000",
      padding: 12,
      alignItems: "center",
      marginVertical: 4,
    }}
  >
    <Text style={{ color: "#fff" }}>{String(title || "Button").toUpperCase()}</Text>
  </Pressable>
);

export default ProviderPlainButton;
