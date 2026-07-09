import React from "react";
import { View, useWindowDimensions } from "react-native";
import Svg, { Path, Polygon } from "react-native-svg";

import PolygonAsset from "../components/PolygonAsset";
import COLORS from "../constants/colors";

const TopBackgroundPattern = ({ style }) => {
  const { width: screenWidth } = useWindowDimensions();
  const scale = screenWidth / 402;

  return (
    <View style={style} pointerEvents="none">
      <PolygonAsset
        variant="polygon8"
        width={400 * scale}
        height={400 * scale}
        fill={COLORS.warmCream}
        stroke="transparent"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          left: -185 * scale,
          top: -220 * scale,
        }}
      />
      <PolygonAsset
        variant="polygon8"
        width={400 * scale}
        height={400 * scale}
        fill={COLORS.warmCream}
        stroke="transparent"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          left: 185 * scale,
          top: -220 * scale,
        }}
      />
    </View>
  );
};

const AnalysisHeroHexagon = ({ style }) => {
  return (
    <Svg
      style={style}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <Path
        d="
          M50 2
          C53 2 55 3 58 5
          L91 25
          C95 27 97 31 97 35
          V65
          C97 69 95 73 91 75
          L58 95
          C55 97 53 98 50 98
          C47 98 45 97 42 95
          L9 75
          C5 73 3 69 3 65
          V35
          C3 31 5 27 9 25
          L42 5
          C45 3 47 2 50 2
          Z
        "
        fill={COLORS.warmCream}
        stroke={COLORS.primary}
        strokeWidth="0.5"
      />
    </Svg>
  );
};

const HexagonBackground = ({
  width,
  height,
  fill,
  style,
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 42 46"
      style={style}
    >
      <Polygon
        points="21,1 40,12 40,34 21,45 2,34 2,12"
        fill={fill}
      />
    </Svg>
  );
};

const BottomActionBackground = ({ style }) => {
  return (
    <Svg
      style={style}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <Path
        d="
          M12 0
          H88
          C92 0 95 3 97 7
          L100 27
          V100
          H0
          V27
          L3 7
          C5 3 8 0 12 0
          Z
        "
        fill={COLORS.warmCream}
      />
    </Svg>
  );
};

export {
  TopBackgroundPattern,
  AnalysisHeroHexagon,
  HexagonBackground,
  BottomActionBackground,
};
