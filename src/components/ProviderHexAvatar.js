import React from "react";
import { StyleSheet, Text, View } from "react-native";

import COLORS from "../constants/colors";
import FONT from "../constants/typography";
import PolygonAsset from "./PolygonAsset";

const ProviderHexAvatar = ({ label = "?", size = 60, selected = false }) => {
  const cleanLabel = String(label || "?").trim().charAt(0).toUpperCase();
  const polygonWidth = size * 0.9;

  return (
    <View style={[styles.wrap, { width: size, height: size }]}>
      <PolygonAsset
        variant="polygon9"
        width={polygonWidth}
        height={size}
        fill={selected ? COLORS.honey : COLORS.honeyLight}
        stroke={selected ? COLORS.providerBrown : COLORS.honeyLight}
        strokeWidth={selected ? 1.5 : 0}
        style={styles.polygon}
      />
      <Text style={[styles.label, selected ? styles.selectedLabel : null]}>
        {cleanLabel}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  polygon: {
    position: "absolute",
  },
  label: {
    fontFamily: FONT.bold,
    color: COLORS.providerBrown,
    fontSize: 13,
    fontWeight: "700",
  },
  selectedLabel: {
    color: COLORS.providerBrown,
  },
});

export default ProviderHexAvatar;
