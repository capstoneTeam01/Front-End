import React from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import Svg, { Path } from "react-native-svg";

import COLORS from "../constants/colors";
import PolygonAsset from "./PolygonAsset";

const FIGMA_FRAME_WIDTH = 402;
const WELCOME_SHARD_WIDTH = 190;
const LOGIN_LEFT_WIDTH = 293;
const LOGIN_HEADER_HEIGHT = 246;

const HoneycombBackground = ({
  variant = "welcome",
  opacity = 1,
  style,
}) => {
  const { width: screenWidth } = useWindowDimensions();
  const scale = screenWidth / FIGMA_FRAME_WIDTH;
  const welcomeShardWidth = Math.round(WELCOME_SHARD_WIDTH * scale);
  const loginLeftWidth = Math.round(LOGIN_LEFT_WIDTH * scale);
  const loginHeaderHeight = Math.round(LOGIN_HEADER_HEIGHT * scale);

  return (
    <View pointerEvents="none" style={[styles.wrap, style]}>
      {variant === "login" ? (
        <>
          <PolygonAsset
            variant="polygon11"
            width={loginLeftWidth}
            opacity={opacity}
            style={styles.loginLeft}
          />
          <Svg
            width={screenWidth}
            height={loginHeaderHeight}
            viewBox={`0 0 ${FIGMA_FRAME_WIDTH} ${LOGIN_HEADER_HEIGHT}`}
            preserveAspectRatio="none"
            style={styles.loginRight}
          >
            <Path
              d="M277 0 H402 V246 H365 L249 96 Q242 87 247 77 L277 0 Z"
              fill={COLORS.lightHoney}
              opacity={opacity}
            />
          </Svg>
        </>
      ) : (
        <>
          <PolygonAsset
            variant="polygon10"
            width={welcomeShardWidth}
            opacity={opacity}
            style={[styles.welcomeShard, styles.welcomeLeft]}
          />
          <PolygonAsset
            variant="polygon10"
            width={welcomeShardWidth}
            opacity={opacity}
            style={[styles.welcomeShard, styles.welcomeRight]}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
  },
  welcomeShard: {
    position: "absolute",
    top: 0,
  },
  welcomeLeft: {
    left: 0,
    transform: [{ scaleX: -1 }],
  },
  welcomeRight: {
    right: 0,
  },
  loginLeft: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  loginRight: {
    position: "absolute",
    top: 0,
    left: 0,
  },
});

export default HoneycombBackground;
