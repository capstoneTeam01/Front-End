import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import COLORS from "../constants/colors";
import { BUTTON_HEIGHT, RADIUS, SPACING, TYPE } from "../constants/layout";
import { formatTitle } from "../utils/textFormatters";

const ProviderPlainButton = ({ title, onPress, disabled = false, variant = "primary", style }) => {
  const isSecondary = variant === "secondary";

  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      style={({ pressed }) => [
        styles.button,
        isSecondary ? styles.secondaryButton : styles.primaryButton,
        disabled ? styles.disabledButton : null,
        pressed && !disabled ? styles.pressedButton : null,
        style,
      ]}
    >
      <Text
        style={[styles.buttonText, isSecondary ? styles.secondaryButtonText : null]}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.85}
      >
        {formatTitle(title || "Button")}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    minHeight: BUTTON_HEIGHT,
    borderRadius: RADIUS.field,
    paddingHorizontal: SPACING.section,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButton: {
    backgroundColor: COLORS.honey,
  },
  secondaryButton: {
    backgroundColor: COLORS.honeyCream,
    borderWidth: 1,
    borderColor: COLORS.honeyLight,
  },
  disabledButton: {
    opacity: 0.45,
  },
  pressedButton: {
    opacity: 0.82,
  },
  buttonText: {
    color: COLORS.providerBrown,
    ...TYPE.button,
  },
  secondaryButtonText: {
    color: COLORS.providerBrown,
  },
});

export default ProviderPlainButton;
