import React from "react";
import { Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import HexTile from "../HexTile/HexTile";
import COLORS from "../../constants/colors";
import styles from "./RepairEstimateSectionStyle";

const ESTIMATE_TILE_SIZE = 96;

const formatCostValue = (value) => {
  if (!value || value === "N/A") {
    return "N/A";
  }

  return String(value)
    .replace(/\$/g, "")
    .replace(/CAD/gi, "")
    .replace(/\s*[–—-]\s*/g, " - ")
    .replace(/\s+/g, " ")
    .trim();
};

const formatTimeValue = (value) => {
  if (!value || value === "N/A") {
    return "N/A";
  }

  const cleanedValue = String(value)
    .replace(/\bapproximately\b/gi, "")
    .replace(/\bapproximate\b/gi, "")
    .replace(/\babout\b/gi, "")
    .replace(/\bhours?\b/gi, "")
    .replace(/\s*[–—-]\s*/g, "-")
    .replace(/\s+/g, " ")
    .trim();

  if (!cleanedValue) {
    return "N/A";
  }

  return `${cleanedValue} ${
    cleanedValue === "1" ? "Hour" : "Hours"
  }`;
};

const EstimateIcon = ({ type }) => {
  if (type === "severity") {
    return (
      <MaterialCommunityIcons
        name="gauge"
        size={24}
        color={COLORS.secondary}
      />
    );
  }

  if (type === "cost") {
    return (
      <Text style={styles.dollarIcon}>
        $
      </Text>
    );
  }

  return (
    <MaterialCommunityIcons
      name="clock-outline"
      size={24}
      color={COLORS.secondary}
    />
  );
};

const EstimateItem = ({
  iconType,
  label,
  value,
}) => {
  return (
    <View style={styles.estimateTile}>
      <HexTile
        size={ESTIMATE_TILE_SIZE}
        flatTop={false}
        fill={COLORS.lightHoney}
      >
        <View style={styles.estimateContent}>
          <View style={styles.iconContainer}>
            <EstimateIcon type={iconType} />
          </View>

          <Text
            style={styles.estimateLabel}
            numberOfLines={1}
          >
            {label}
          </Text>

          <Text
            style={styles.estimateValue}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.7}
          >
            {value || "N/A"}
          </Text>
        </View>
      </HexTile>
    </View>
  );
};

const RepairEstimateSection = ({
  urgency,
  estimatedCostRange,
  estimatedRepairTime,
  showSeverity = true,
  showTitle = true,
}) => {
  const displayedCost =
    formatCostValue(estimatedCostRange);

  const displayedTime =
    formatTimeValue(estimatedRepairTime);

  return (
    <View style={styles.sectionContainer}>
      {showTitle ? (
        <Text style={styles.sectionTitle}>
          Repair Estimate
        </Text>
      ) : null}

      <View style={styles.estimateRow}>
        {showSeverity ? (
          <EstimateItem
            iconType="severity"
            label="Severity Level"
            value={urgency || "N/A"}
          />
        ) : null}

        <EstimateItem
          iconType="cost"
          label="Estimate Cost"
          value={displayedCost}
        />

        <EstimateItem
          iconType="time"
          label="Estimate Time"
          value={displayedTime}
        />
      </View>
    </View>
  );
};

export default RepairEstimateSection;