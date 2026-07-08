import React from "react";
import { View, useWindowDimensions } from "react-native";

import COLORS from "../../constants/colors";
import PolygonAsset from "../PolygonAsset";
import styles from "./HeroHexagonStyle";

const HeroHexagon = ({
  width,
  contentOffsetY = 0,
  fill = COLORS.warmCream,
  stroke = COLORS.primary,
  strokeWidth = 1,
  children,
}) => {
  const { width: screenWidth } = useWindowDimensions();
  const resolvedWidth = width ?? screenWidth - 48;
  const scale = resolvedWidth / 354;
  const resolvedHeight = 400 * scale;

  return (
    <View
      style={[
        styles.wrap,
        { width: resolvedWidth, height: resolvedHeight },
      ]}
    >
      <PolygonAsset
        variant="polygon8"
        width={346.41 * scale}
        height={393.81 * scale}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          left: 3.79 * scale,
          top: 3.09 * scale,
        }}
      />
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
