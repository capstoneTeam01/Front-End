import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import COLORS from "../../constants/colors";
import styles from "./ProfileMenuRowStyle";
import { formatTitle } from "../../utils/textFormatters";


const ProfileMenuRow = ({
  icon,
  label,
  onPress,
  showDivider = true,
  iconColor = COLORS.mediumGrey,
  labelColor,
  chevronColor = COLORS.mediumGrey,
}) => {
  const textColor = labelColor || COLORS.honeyBrown;

  return (
    <TouchableOpacity
      style={[styles.row, showDivider && styles.rowDivider]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.left}>
        <Ionicons name={icon} size={22} color={iconColor} />
        <Text style={[styles.label, { color: textColor }]}>
          {formatTitle(label)}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={22} color={chevronColor} />
    </TouchableOpacity>
  );
};

export default ProfileMenuRow;
