import React from "react";
import { Text } from "react-native";

const ProviderHexAvatar = ({ label = "?" }) => {
  const cleanLabel = String(label || "?").trim().charAt(0).toUpperCase();
  return <Text>{cleanLabel}</Text>;
};

export default ProviderHexAvatar;
