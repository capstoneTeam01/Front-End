import React from "react";
import { TextInput, View } from "react-native";
import styles from "./AppTextFieldStyle";
import COLORS from "../../constants/colors";
const AppTextField = ({
  value,
  onChangeText,
  placeholder = "Street Address",
  keyboardType = "default",
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.placeholder}
        keyboardType={keyboardType}
      />
    </View>
  );
};

export default AppTextField;