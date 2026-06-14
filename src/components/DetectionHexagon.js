import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import Svg, { Polygon } from "react-native-svg";

import { regionToHexagonPoints } from "./regionToHexagon";

const DetectionHexagon = ({ issueRegion, detectedObject, isFocused = false }) => {
  const { width, height } = useWindowDimensions();

  if (!issueRegion) {
    return null;
  }

  const points = regionToHexagonPoints(issueRegion, width, height);

  if (!points) {
    return null;
  }

  const pointsAttr = points.map((point) => `${point.x},${point.y}`).join(" ");
  const strokeColor = isFocused ? "#22c55e" : "#ef4444";
  const fillColor = isFocused ? "rgba(34, 197, 94, 0.12)" : "rgba(239, 68, 68, 0.08)";
  const labelTop = Math.max(48, points[0].y - 28);

  return (
    <View style={styles.overlay} pointerEvents="none">
      <Svg width={width} height={height} style={StyleSheet.absoluteFill}>
        <Polygon
          points={pointsAttr}
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth={3}
        />
      </Svg>
      {detectedObject ? (
        <Text style={[styles.label, { top: labelTop, color: strokeColor }]}>
          {isFocused ? "Ready to capture" : detectedObject}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  label: {
    position: "absolute",
    left: 24,
    right: 24,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "700",
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
});

export default DetectionHexagon;
