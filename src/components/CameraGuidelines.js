import { StyleSheet, Text, useWindowDimensions, View } from "react-native";

const FRAME_WIDTH_RATIO = 0.88;
const FRAME_HEIGHT_RATIO = 0.52;
const BRACKET_LENGTH = 28;
const BRACKET_WIDTH = 3;

const CameraGuidelines = () => {
  const { width, height } = useWindowDimensions();
  const frameWidth = width * FRAME_WIDTH_RATIO;
  const frameHeight = height * FRAME_HEIGHT_RATIO;
  const frameLeft = (width - frameWidth) / 2;
  const frameTop = height * 0.22;

  const renderDimRegion = (style) => <View style={[styles.dim, style]} pointerEvents="none" />;

  return (
    <View style={styles.overlay} pointerEvents="none">
      {renderDimRegion({ top: 0, left: 0, width, height: frameTop })}
      {renderDimRegion({
        top: frameTop + frameHeight,
        left: 0,
        width,
        height: height - frameTop - frameHeight,
      })}
      {renderDimRegion({
        top: frameTop,
        left: 0,
        width: frameLeft,
        height: frameHeight,
      })}
      {renderDimRegion({
        top: frameTop,
        left: frameLeft + frameWidth,
        width: width - frameLeft - frameWidth,
        height: frameHeight,
      })}

      <View
        style={[
          styles.frame,
          {
            top: frameTop,
            left: frameLeft,
            width: frameWidth,
            height: frameHeight,
          },
        ]}
      >
        <View style={[styles.corner, styles.topLeft]} />
        <View style={[styles.corner, styles.topRight]} />
        <View style={[styles.corner, styles.bottomLeft]} />
        <View style={[styles.corner, styles.bottomRight]} />

        <View style={[styles.thirdLine, { left: frameWidth / 3 }]} />
        <View style={[styles.thirdLine, { left: (frameWidth * 2) / 3 }]} />
        <View style={[styles.thirdLineHorizontal, { top: frameHeight / 3 }]} />
        <View style={[styles.thirdLineHorizontal, { top: (frameHeight * 2) / 3 }]} />
      </View>

      <Text style={styles.hint}>Align the issue in the frame</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  dim: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.45)",
  },
  frame: {
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.35)",
  },
  corner: {
    position: "absolute",
    width: BRACKET_LENGTH,
    height: BRACKET_LENGTH,
    borderColor: "#fff",
  },
  topLeft: {
    top: -1,
    left: -1,
    borderTopWidth: BRACKET_WIDTH,
    borderLeftWidth: BRACKET_WIDTH,
  },
  topRight: {
    top: -1,
    right: -1,
    borderTopWidth: BRACKET_WIDTH,
    borderRightWidth: BRACKET_WIDTH,
  },
  bottomLeft: {
    bottom: -1,
    left: -1,
    borderBottomWidth: BRACKET_WIDTH,
    borderLeftWidth: BRACKET_WIDTH,
  },
  bottomRight: {
    bottom: -1,
    right: -1,
    borderBottomWidth: BRACKET_WIDTH,
    borderRightWidth: BRACKET_WIDTH,
  },
  thirdLine: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
  },
  thirdLineHorizontal: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
  },
  hint: {
    position: "absolute",
    top: 56,
    left: 24,
    right: 24,
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
});

export default CameraGuidelines;
