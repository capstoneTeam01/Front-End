import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Polygon } from "react-native-svg";
import COLORS from "../constants/colors";
import FONT from "../constants/typography";

const ProviderHexAvatar = ({ label = "?", size = 40, selected = false }) => {
  const cleanLabel = String(label || "?").trim().charAt(0).toUpperCase();
  const points = `${size * 0.5},0 ${size * 0.94},${size * 0.25} ${size * 0.94},${size * 0.75} ${size * 0.5},${size} ${size * 0.06},${size * 0.75} ${size * 0.06},${size * 0.25}`;

  return (
    <View style={[styles.wrap, { width: size, height: size }]}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={StyleSheet.absoluteFill}>
        <Polygon
          points={points}
          fill={selected ? COLORS.honey : COLORS.honeyLight}
          stroke={selected ? COLORS.providerBrown : COLORS.honeyLight}
          strokeWidth={selected ? 1.5 : 0}
        />
      </Svg>
      <Text style={[styles.label, selected ? styles.selectedLabel : null]}>{cleanLabel}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    justifyContent: "center",
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
