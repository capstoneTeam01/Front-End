import { StyleSheet, useWindowDimensions, View } from "react-native";

const FRAME_SIZE_RATIO = 0.72;
const BRACKET_LENGTH = 32;
const BRACKET_WIDTH = 2.5;

const CameraGuidelines = () => {
  const { width, height } = useWindowDimensions();
  const frameSize = width * FRAME_SIZE_RATIO;
  const frameLeft = (width - frameSize) / 2;
  const frameTop = height * 0.2 + (height * 0.42 - frameSize) / 2;

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
});

export default CameraGuidelines;
