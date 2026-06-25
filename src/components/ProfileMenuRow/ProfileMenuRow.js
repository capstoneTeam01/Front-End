import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import COLORS from "../../constants/colors";
import styles from "./ProfileMenuRowStyle";


const ProfileMenuRow = ({ icon, label, onPress, danger = false, showDivider = true }) => {
  const tint = danger ? COLORS.honeyBrown : COLORS.textPrimary;

  return (
    <TouchableOpacity
      style={[styles.row, showDivider && styles.rowDivider]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.left}>
        <Ionicons name={icon} size={20} color={tint} />
        <Text style={[styles.label, { color: tint }]}>{label}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />
    </TouchableOpacity>
  );
};

export default ProfileMenuRow;
