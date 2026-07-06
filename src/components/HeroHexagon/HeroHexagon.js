import React from "react";
import { View, Dimensions } from "react-native";
import Svg, { Path } from "react-native-svg";
import COLORS from "../../constants/colors";
import styles from "./HeroHexagonStyle";

const SCREEN_W = Dimensions.get("window").width;

// Build a rounded polygon path from an array of [x, y] vertices.
// r = corner radius in px. Each vertex becomes a short quadratic curve.
const roundedPolyPath = (pts, r) => {
  const n = pts.length;
  let d = "";
  for (let i = 0; i < n; i++) {
    const prev = pts[(i - 1 + n) % n];
    const curr = pts[i];
    const next = pts[(i + 1) % n];

    // point r before the vertex (along prev->curr)
    const v1 = [curr[0] - prev[0], curr[1] - prev[1]];
    const len1 = Math.hypot(v1[0], v1[1]) || 1;
    const before = [curr[0] - (v1[0] / len1) * r, curr[1] - (v1[1] / len1) * r];

    // point r after the vertex (along curr->next)
    const v2 = [next[0] - curr[0], next[1] - curr[1]];
    const len2 = Math.hypot(v2[0], v2[1]) || 1;
    const after = [curr[0] + (v2[0] / len2) * r, curr[1] + (v2[1] / len2) * r];

    d +=
      i === 0 ? `M ${before[0]},${before[1]} ` : `L ${before[0]},${before[1]} `;
    d += `Q ${curr[0]},${curr[1]} ${after[0]},${after[1]} `;
  }
  return d + "Z";
};

const HeroHexagon = ({
  width = SCREEN_W - 80,
  flatTop = false,
  cornerRadius,
  contentOffsetY = 0,
  fill = COLORS.warmCream,
  stroke = COLORS.goldenHoney,
  strokeWidth = 1.5,
  children,
}) => {
  const w = width;
  const h = width;
  const r = cornerRadius ?? w * 0.08; // gentle default, ~8% of width

  const pointyTop = [
    [w * 0.5, 0],
    [w, h * 0.25],
    [w, h * 0.75],
    [w * 0.5, h],
    [0, h * 0.75],
    [0, h * 0.25],
  ];

  const flatTopPts = [
    [w * 0.25, 0],
    [w * 0.75, 0],
    [w, h * 0.5],
    [w * 0.75, h],
    [w * 0.25, h],
    [0, h * 0.5],
  ];

  const points = flatTop ? flatTopPts : pointyTop;
  const d = roundedPolyPath(points, r);

  return (
    <View style={[styles.wrap, { width: w, height: h }]}>
      <Svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
        <Path d={d} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
      </Svg>
      <View
        style={[
          styles.content,
          { transform: [{ translateY: contentOffsetY }] },
        ]}
      >
        {children}
      </View>
    </View>
  );
};

export default HeroHexagon;
