import React from "react";
import { TextInput, View } from "react-native";
import styles from "./AppTextFieldStyle";
import COLORS from "../../constants/colors";

const AppTextField = ({
  value,
  onChangeText,
  placeholder = "Street Address",
  keyboardType = "default",
  secureTextEntry = false,
  autoCapitalize = "sentences",
  autoCorrect = true,
  returnKeyType,
  onSubmitEditing,
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
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
      />
    </View>
  );
};

export default AppTextField;
