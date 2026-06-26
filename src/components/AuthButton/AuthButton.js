import React from "react";
import { Text, TouchableOpacity, ActivityIndicator } from "react-native";
import styles from "./AuthButtonStyle";

const AuthButton = ({ label, onPress, loading = false, disabled = false, variant = "primary" }) => {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === "secondary" && styles.buttonSecondary,
        isDisabled && styles.buttonDisabled,
      ]}
      onPress={onPress}
      activeOpacity={0.85}
      disabled={isDisabled}
    >
      {loading ? (
        <ActivityIndicator color="#0A0A0A" />
      ) : (
        <Text style={styles.label}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

export default AuthButton;
