import React from "react";
import { View, Text, Switch } from "react-native";

import COLORS from "../../constants/colors";
import styles from "./ToggleRowStyle";

const ToggleRow = ({ label, value, onValueChange, disabled = false }) => {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        trackColor={{ false: COLORS.gray500, true: COLORS.secondary }}
        thumbColor={COLORS.white}
        ios_backgroundColor={COLORS.gray500}
      />
    </View>
  );
};

export default ToggleRow;
