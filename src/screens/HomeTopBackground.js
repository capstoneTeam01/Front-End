import React from "react";
import { View, useWindowDimensions } from "react-native";

import COLORS from "../constants/colors";
import PolygonAsset from "../components/PolygonAsset";

const BACKGROUND_LAYOUTS = {
  home: {
    scale: 1,
    top: -195.91,
  },
  profile: {
    scale: 1,
    top: -195.91,
  },
};

const HomeTopBackground = ({ style, variant = "home" }) => {
  const { width: screenWidth } = useWindowDimensions();
  const layout = BACKGROUND_LAYOUTS[variant] || BACKGROUND_LAYOUTS.home;
  const scale = (screenWidth / 402) * layout.scale;
  const frameScale = screenWidth / 402;
  const polygonWidth = 346.41 * scale;
  const polygonHeight = 393.81 * scale;
  const leftOffset = -157.21 * frameScale;
  const rightOffset = 215.79 * frameScale;
  const topOffset = layout.top * frameScale;

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
          left: leftOffset,
          top: topOffset,
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
          left: rightOffset,
          top: topOffset,
        }}
        preserveAspectRatio="none"
      />
    </View>
  );
};

export default HomeTopBackground;
