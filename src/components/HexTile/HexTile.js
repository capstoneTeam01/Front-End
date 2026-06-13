import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Svg, { Polygon } from "react-native-svg";

const buildPoints = (w, h, flatTop) => {
  if (flatTop) {
    return [
      [w * 0.25, 0],
      [w * 0.75, 0],
      [w, h * 0.5],
      [w * 0.75, h],
      [w * 0.25, h],
      [0, h * 0.5],
    ];
  }
  return [
    [w * 0.5, 0],
    [w, h * 0.25],
    [w, h * 0.75],
    [w * 0.5, h],
    [0, h * 0.75],
    [0, h * 0.25],
  ];
};

const HexTile = ({
  size = 96,
  fill = "#F3F4F6",
  stroke,
  strokeWidth = 0,
  onPress,
  children,
  style,
  flatTop = true,
}) => {
  const w = size;
  const h = flatTop ? size * 0.92 : size * 1.08;

  const points = buildPoints(w, h, flatTop)
    .map((p) => p.join(","))
    .join(" ");

  const Wrapper = onPress ? TouchableOpacity : View;

  return (
    <Wrapper
      onPress={onPress}
      activeOpacity={0.7}
      style={[{ width: w, height: h }, style]}
    >
      <Svg width={w} height={h} style={StyleSheet.absoluteFill}>
        <Polygon
          points={points}
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
      </Svg>

      <View style={[StyleSheet.absoluteFill, styles.center]}>{children}</View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HexTile;
