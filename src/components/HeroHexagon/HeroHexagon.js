import React from "react";
import { View, Dimensions } from "react-native";
import Svg, { Polygon } from "react-native-svg";
import COLORS from "../../constants/colors";
import styles from "./HeroHexagonStyle";

const SCREEN_W = Dimensions.get("window").width;

const HeroHexagon = ({ width = SCREEN_W - 80, children }) => {
  const w = width;
  const h = width * 1;

  const points = [
    [w * 0.5, 0],
    [w, h * 0.25],
    [w, h * 0.75],
    [w * 0.5, h],
    [0, h * 0.75],
    [0, h * 0.25],
  ]
    .map(([x, y]) => `${x},${y}`)
    .join(" ");

  return (
    <View style={[styles.wrap, { width: w, height: h }]}>
      <Svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
        <Polygon
          points={points}
          fill={COLORS.warmCream}
          stroke={COLORS.goldenHoney}
          strokeWidth={1.5}
        />
      </Svg>
      <View style={styles.content}>{children}</View>
    </View>
  );
};

export default HeroHexagon;
