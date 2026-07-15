import React, { useState } from "react";
import { Text, View } from "react-native";

import CostIcon from "../../../assets/icons/cost_Icon.svg";
import SeverityIcon from "../../../assets/icons/severity_Icon.svg";
import TimeIcon from "../../../assets/icons/Time_Icon.svg";
import HexTile from "../HexTile/HexTile";
import COLORS from "../../constants/colors";
import { formatDisplayLabel } from "../../utils/textFormatters";
import styles from "./RepairEstimateSectionStyle";

const DEFAULT_ESTIMATE_TILE_SIZE = 96;
const ESTIMATE_TILE_GAP = 16;
const ESTIMATE_ICON_SIZE = 20;

const ESTIMATE_ICONS = {
  cost: CostIcon,
  severity: SeverityIcon,
  time: TimeIcon,
};

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
  const Icon = ESTIMATE_ICONS[type] || TimeIcon;

  return (
    <Icon
      width={ESTIMATE_ICON_SIZE}
      height={ESTIMATE_ICON_SIZE}
    />
  );
};

const EstimateItem = ({
  iconType,
  label,
  value,
  size,
}) => {
  return (
    <View style={styles.estimateTile}>
      <HexTile
        size={size}
        flatTop={false}
        fill={COLORS.lightHoney}
      >
        <View style={styles.estimateContent}>
          <View style={styles.iconContainer}>
            <EstimateIcon type={iconType} />
          </View>

          <Text
            style={styles.estimateLabel}
            numberOfLines={2}
          >
            {label}
          </Text>

          <Text
            style={styles.estimateValue}
            numberOfLines={2}
            adjustsFontSizeToFit
            minimumFontScale={0.65}
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
  const [rowWidth, setRowWidth] =
    useState(0);

  const estimateCount =
    showSeverity ? 3 : 2;

  const tileSize = rowWidth > 0
    ? (
        rowWidth -
        ESTIMATE_TILE_GAP *
          (estimateCount - 1)
      ) / estimateCount
    : DEFAULT_ESTIMATE_TILE_SIZE;

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

      <View
        style={styles.estimateRow}
        onLayout={(event) => {
          setRowWidth(
            event.nativeEvent.layout.width
          );
        }}
      >
        {showSeverity ? (
          <EstimateItem
            iconType="severity"
            label="Severity Level"
            value={formatDisplayLabel(urgency) || "N/A"}
            size={tileSize}
          />
        ) : null}

        <EstimateItem
          iconType="cost"
          label="Estimate Cost"
          value={displayedCost}
          size={tileSize}
        />

        <EstimateItem
          iconType="time"
          label="Estimate Time"
          value={displayedTime}
          size={tileSize}
        />
      </View>
    </View>
  );
};

export default RepairEstimateSection;
