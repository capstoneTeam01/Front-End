import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import Svg, { Polygon } from "react-native-svg";

import { pointsToAttr } from "./outlineTracking";
import { useLiveOutline } from "./useLiveOutline";
import { TYPE } from "../constants/layout";

const DetectionHexagon = ({
  detection,
  trackingEnabled = false,
  detectedObject,
  isFocused = false,
}) => {
  const { width, height } = useWindowDimensions();
  const displayPoints = useLiveOutline(detection, trackingEnabled);

  if (!displayPoints?.length) {
    return null;
  }

  const pointsAttr = pointsToAttr(displayPoints);
  const strokeColor = isFocused ? "#22c55e" : "#f87171";
  const fillColor = isFocused ? "rgba(34, 197, 94, 0.15)" : "rgba(248, 113, 113, 0.12)";
  const glowColor = isFocused ? "rgba(34, 197, 94, 0.35)" : "rgba(248, 113, 113, 0.28)";
  const labelTop = Math.max(48, Math.min(...displayPoints.map((point) => point.y)) - 28);

  return (
    <View style={styles.overlay} pointerEvents="none">
      <Svg width={width} height={height} style={StyleSheet.absoluteFill}>
        <Polygon
          points={pointsAttr}
          fill="none"
          stroke={glowColor}
          strokeWidth={10}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <Polygon
          points={pointsAttr}
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth={2.5}
          strokeLinejoin="round"
          strokeLinecap="round"
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
    ...TYPE.body,
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
});

export default DetectionHexagon;
