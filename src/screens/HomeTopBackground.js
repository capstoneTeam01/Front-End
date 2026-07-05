import React from "react";
import Svg, { Path } from "react-native-svg";
import COLORS from "../constants/colors";

const HomeTopBackground = ({ style }) => {
  return (
    <Svg
      style={style}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      pointerEvents="none"
    >
      <Path d="M0 0 H100 V100 H0 Z" fill={COLORS.warmCream} />

      <Path
        d="
          M38 0
          H62
          V38
          C62 52 68 62 78 70
          L100 88
          V100
          H0
          V88
          L22 70
          C32 62 38 52 38 38
          Z
        "
        fill={COLORS.white}
      />
    </Svg>
  );
};

export default HomeTopBackground;
