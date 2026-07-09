import React from "react";
import { Text, View } from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import PolygonAsset from "../PolygonAsset";
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
  size,
}) => {
  if (iconType === "emergency") {
    return (
      <MaterialCommunityIcons
        name="alarm-light-outline"
        size={size}
        color={iconColor}
      />
    );
  }

  if (iconType === "warning") {
    return (
      <Ionicons
        name="warning-outline"
        size={size}
        color={iconColor}
      />
    );
  }

  return (
    <Ionicons
      name="help-circle-outline"
      size={size}
      color={iconColor}
    />
  );
};

const UrgencyBadge = ({ urgency, size = 80 }) => {
  const urgencyConfig =
    getUrgencyConfig(urgency);
  const height = (size * 89) / 80;

  return (
    <View
      style={[
        styles.badgeContainer,
        { width: size, height },
      ]}
    >
      <PolygonAsset
        variant="polygon9"
        width={size}
        height={height}
        fill={urgencyConfig.backgroundColor}
      >
        <View style={styles.badgeContent}>
          <View style={styles.iconContainer}>
            <UrgencyIcon
              iconType={urgencyConfig.iconType}
              iconColor={urgencyConfig.iconColor}
              size={24}
            />
          </View>

          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.75}
            style={[
              styles.badgeText,
              urgencyConfig.textStyle,
            ]}
          >
            {urgencyConfig.label}
          </Text>
        </View>
      </PolygonAsset>
    </View>
  );
};

export default UrgencyBadge;
