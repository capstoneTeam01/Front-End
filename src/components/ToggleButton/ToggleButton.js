import React from "react";
import { TouchableOpacity, Text } from "react-native";
import styles from "./ToggleButtonStyle";

const ToggleButton = ({ text, isActive, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        isActive && styles.activeButton,
      ]}
    >
      <Text
        style={[
          styles.text,
          isActive && styles.activeText,
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default ToggleButton;