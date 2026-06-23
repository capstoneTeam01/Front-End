import { StyleSheet, useWindowDimensions, View } from "react-native";
import Svg, { Polygon } from "react-native-svg";

const FRAME_SIZE_RATIO = 0.72;
const BRACKET_LENGTH = 32;
const BRACKET_WIDTH = 2.5;
const HEX_SIZE_RATIO = 0.58;

const buildHexPoints = (size) => {
  const w = size;
  const h = size * 0.92;

  return [
    [w * 0.25, 0],
    [w * 0.75, 0],
    [w, h * 0.5],
    [w * 0.75, h],
    [w * 0.25, h],
    [0, h * 0.5],
  ]
    .map((point) => point.join(","))
    .join(" ");
};

const CameraGuidelines = ({ isReady = false }) => {
  const { width, height } = useWindowDimensions();
  const frameSize = width * FRAME_SIZE_RATIO;
  const frameLeft = (width - frameSize) / 2;
  const frameTop = height * 0.2 + (height * 0.42 - frameSize) / 2;
  const hexSize = frameSize * HEX_SIZE_RATIO;
  const strokeColor = isReady ? "#22c55e" : "#94a3b8";
  const fillColor = isReady ? "rgba(34, 197, 94, 0.12)" : "rgba(148, 163, 184, 0.08)";

  const renderDimRegion = (style) => <View style={[styles.dim, style]} pointerEvents="none" />;

  return (
    <View style={styles.overlay} pointerEvents="none">
      {renderDimRegion({ top: 0, left: 0, width, height: frameTop })}
      {renderDimRegion({
        top: frameTop + frameSize,
        left: 0,
        width,
        height: height - frameTop - frameSize,
      })}
      {renderDimRegion({
        top: frameTop,
        left: 0,
        width: frameLeft,
        height: frameSize,
      })}
      {renderDimRegion({
        top: frameTop,
        left: frameLeft + frameSize,
        width: width - frameLeft - frameSize,
        height: frameSize,
      })}

      <View
        style={[
          styles.frame,
          {
            top: frameTop,
            left: frameLeft,
            width: frameSize,
            height: frameSize,
          },
        ]}
      >
        <View style={[styles.corner, styles.topLeft]} />
        <View style={[styles.corner, styles.topRight]} />
        <View style={[styles.corner, styles.bottomLeft]} />
        <View style={[styles.corner, styles.bottomRight]} />

        <View style={styles.crosshairVertical} />
        <View style={styles.crosshairHorizontal} />
        <View style={styles.crosshairDot} />

        <View
          style={[
            styles.guidelineHexagon,
            {
              top: (frameSize - hexSize * 0.92) / 2,
              left: (frameSize - hexSize) / 2,
              width: hexSize,
              height: hexSize * 0.92,
            },
          ]}
        >
          <Svg width={hexSize} height={hexSize * 0.92} style={StyleSheet.absoluteFill}>
            <Polygon
              points={buildHexPoints(hexSize)}
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth={2.5}
              strokeLinejoin="round"
            />
          </Svg>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  dim: {
    position: "absolute",
    backgroundColor: "rgba(8, 15, 35, 0.55)",
  },
  frame: {
    position: "absolute",
  },
  corner: {
    position: "absolute",
    width: BRACKET_LENGTH,
    height: BRACKET_LENGTH,
    borderColor: "rgba(255, 255, 255, 0.95)",
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: BRACKET_WIDTH,
    borderLeftWidth: BRACKET_WIDTH,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: BRACKET_WIDTH,
    borderRightWidth: BRACKET_WIDTH,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: BRACKET_WIDTH,
    borderLeftWidth: BRACKET_WIDTH,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: BRACKET_WIDTH,
    borderRightWidth: BRACKET_WIDTH,
  },
  crosshairVertical: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 1,
    height: 28,
    marginLeft: -0.5,
    marginTop: -14,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
  crosshairHorizontal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 28,
    height: 1,
    marginLeft: -14,
    marginTop: -0.5,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
  crosshairDot: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 6,
    height: 6,
    marginLeft: -3,
    marginTop: -3,
    borderRadius: 3,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  guidelineHexagon: {
    position: "absolute",
  },
});

export default CameraGuidelines;
