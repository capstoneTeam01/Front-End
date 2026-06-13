import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./SectionHeaderStyle";

const SectionHeader = ({ title, actionLabel, onActionPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      {actionLabel ? (
        <TouchableOpacity onPress={onActionPress} hitSlop={8}>
          <Text style={styles.action}>{actionLabel}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default SectionHeader;