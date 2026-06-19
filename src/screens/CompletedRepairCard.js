import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import styles from "./RepairListItemStyle";

const RepairListItem = ({
  title,
  subtitle,
  onPress,
  showDivider,
}) => {
  return (
    <TouchableOpacity
      style={[styles.row, showDivider && styles.divider]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.left}>
        <View style={styles.iconChip}>
          <Ionicons
            name="camera-outline"
            size={24}
            color="#98A2B3"
          />
        </View>

        <View style={styles.text}>
          <Text style={styles.title}>
            {title}
          </Text>

          <Text style={styles.subtitle}>
            {subtitle}
          </Text>
        </View>
      </View>

      <Ionicons
        name="chevron-forward"
        size={20}
        color="#D0D5DD"
      />
    </TouchableOpacity>
  );
};

export default RepairListItem;