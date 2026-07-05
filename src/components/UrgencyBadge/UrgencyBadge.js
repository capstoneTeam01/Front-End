import React from "react";
import { Text, View } from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import HexTile from "../HexTile/HexTile";
import COLORS from "../../constants/colors";
import styles from "./UrgencyBadgeStyle";

const getUrgencyConfig = (urgency) => {
  const normalizedUrgency = String(
    urgency || ""
  )
    .trim()
    .toLowerCase();

  if (normalizedUrgency.includes("critical")) {
    return {
      label: "Critical Risk",
      backgroundColor: COLORS.riskCritical,
      iconColor: COLORS.white,
      textStyle: styles.lightText,
      iconType: "emergency",
    };
  }

  if (
    normalizedUrgency.includes("high") ||
    normalizedUrgency.includes("emergency")
  ) {
    return {
      label: "High Risk",
      backgroundColor: COLORS.riskHigh,
      iconColor: COLORS.white,
      textStyle: styles.lightText,
      iconType: "emergency",
    };
  }

  if (
    normalizedUrgency.includes("medium") ||
    normalizedUrgency.includes("moderate")
  ) {
    return {
      label: "Medium Risk",
      backgroundColor: COLORS.riskMedium,
      iconColor: COLORS.secondary,
      textStyle: styles.darkText,
      iconType: "warning",
    };
  }

  if (normalizedUrgency.includes("low")) {
    return {
      label: "Low Risk",
      backgroundColor: COLORS.riskLow,
      iconColor: COLORS.white,
      textStyle: styles.lightText,
      iconType: "warning",
    };
  }

  return {
    label: "N/A",
    backgroundColor: COLORS.riskUnknown,
    iconColor: COLORS.white,
    textStyle: styles.lightText,
    iconType: "unknown",
  };
};

const UrgencyIcon = ({
  iconType,
  iconColor,
}) => {
  if (iconType === "emergency") {
    return (
      <MaterialCommunityIcons
        name="alarm-light-outline"
        size={29}
        color={iconColor}
      />
    );
  }

  if (iconType === "warning") {
    return (
      <Ionicons
        name="warning-outline"
        size={29}
        color={iconColor}
      />
    );
  }

  return (
    <Ionicons
      name="help-circle-outline"
      size={29}
      color={iconColor}
    />
  );
};

const UrgencyBadge = ({ urgency }) => {
  const urgencyConfig =
    getUrgencyConfig(urgency);

  return (
    <View style={styles.badgeContainer}>
      <HexTile
        size={96}
        flatTop={false}
        fill={urgencyConfig.backgroundColor}
      >
        <View style={styles.badgeContent}>
          <View style={styles.iconContainer}>
            <UrgencyIcon
              iconType={urgencyConfig.iconType}
              iconColor={urgencyConfig.iconColor}
            />
          </View>

          <Text
            numberOfLines={1}
            style={[
              styles.badgeText,
              urgencyConfig.textStyle,
            ]}
          >
            {urgencyConfig.label}
          </Text>
        </View>
      </HexTile>
    </View>
  );
};

export default UrgencyBadge;