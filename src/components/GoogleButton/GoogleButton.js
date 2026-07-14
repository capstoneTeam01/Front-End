import React from "react";
import { Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import GoogleIcon from "../../../assets/icons/Google.svg";
import styles from "./GoogleButtonStyle";

const GoogleButton = ({
  label = "Log In using Google",
  onPress,
  loading = false,
  disabled = false,
  style,
  labelStyle,
}) => {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[styles.button, isDisabled && styles.buttonDisabled, style]}
      onPress={onPress}
      activeOpacity={0.85}
      disabled={isDisabled}
    >
      {loading ? (
        <ActivityIndicator color="#0A0A0A" />
      ) : (
        <View style={styles.content}>
          <GoogleIcon width={20} height={20} style={styles.googleIcon} />
          <Text style={[styles.label, labelStyle]}>{label}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default GoogleButton;
