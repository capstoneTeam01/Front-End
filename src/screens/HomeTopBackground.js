import React from "react";
import { View, useWindowDimensions } from "react-native";

import COLORS from "../constants/colors";
import PolygonAsset from "../components/PolygonAsset";

const HomeTopBackground = ({ style }) => {
  const { width: screenWidth } = useWindowDimensions();
  const scale = screenWidth / 402;
  const polygonWidth = 346.41 * scale;
  const polygonHeight = 393.81 * scale;

  return (
    <View style={style} pointerEvents="none">
      <PolygonAsset
        variant="polygon8"
        width={polygonWidth}
        height={polygonHeight}
        fill={COLORS.warmCream}
        stroke="transparent"
        style={{
          position: "absolute",
          left: -157.21 * scale,
          top: -195.91 * scale,
        }}
        preserveAspectRatio="none"
      />
      <PolygonAsset
        variant="polygon8"
        width={polygonWidth}
        height={polygonHeight}
        fill={COLORS.warmCream}
        stroke="transparent"
        style={{
          position: "absolute",
          left: 215.79 * scale,
          top: -195.91 * scale,
        }}
        preserveAspectRatio="none"
      />
    </View>
  );
};

export default HomeTopBackground;
