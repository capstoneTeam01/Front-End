import React from "react";
import { Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import styles from "./GoogleButtonStyle";

const GoogleButton = ({
  label = "Log In using Google",
  onPress,
  loading = false,
  disabled = false,
}) => {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[styles.button, isDisabled && styles.buttonDisabled]}
      onPress={onPress}
      activeOpacity={0.85}
      disabled={isDisabled}
    >
      {loading ? (
        <ActivityIndicator color="#0A0A0A" />
      ) : (
        <View style={styles.content}>
          <Text style={styles.googleG}>G</Text>
          <Text style={styles.label}>{label}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default GoogleButton;
