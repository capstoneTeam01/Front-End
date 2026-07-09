import React from "react";
import { StyleSheet, Text, View } from "react-native";

import COLORS from "../constants/colors";
import { TYPE } from "../constants/layout";
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
        style={styles.polygon}
      />
      <Text style={styles.label}>{cleanLabel}</Text>
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
    color: COLORS.providerBrown,
    ...TYPE.caption,
  },
});

export default ProviderHexAvatar;
