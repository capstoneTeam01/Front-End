import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./SectionHeaderStyle";

const SectionHeader = ({
  title,
  actionLabel,
  onActionPress,
  containerStyle,
  titleStyle,
  actionStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>

      {actionLabel ? (
        <TouchableOpacity onPress={onActionPress} hitSlop={8}>
          <Text style={[styles.action, actionStyle]}>{actionLabel}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default SectionHeader;
