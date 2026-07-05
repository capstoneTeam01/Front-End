import React from "react";
import Svg, {
  Defs,
  LinearGradient,
  Path,
  Rect,
  Stop,
} from "react-native-svg";

import COLORS from "../../constants/colors";

/*
 * Creates the yellow header with the curved lower corners
 * shown in the Issue Detected mockup.
 */
const RecommendationHeaderShape = ({ style }) => {
  return (
    <Svg
      style={style}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      pointerEvents="none"
    >
      <Path
        d="
          M0 0
          H100
          V70
          C100 80 97 88 91 95
          C88 98 85 100 80 100
          H20
          C15 100 12 98 9 95
          C3 88 0 80 0 70
          Z
        "
        fill={COLORS.lightHoney}
      />
    </Svg>
  );
};

/*
 * Creates the dark gradient over the uploaded image.
 * This keeps the issue title and description readable.
 */
const RecommendationImageOverlay = ({ style }) => {
  return (
    <Svg
      style={style}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      pointerEvents="none"
    >
      <Defs>
        <LinearGradient
          id="recommendationImageGradient"
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <Stop
            offset="0%"
            stopColor={COLORS.charcoal}
            stopOpacity="0.04"
          />

          <Stop
            offset="45%"
            stopColor={COLORS.secondary}
            stopOpacity="0.1"
          />

          <Stop
            offset="72%"
            stopColor={COLORS.secondary}
            stopOpacity="0.58"
          />

          <Stop
            offset="100%"
            stopColor={COLORS.secondary}
            stopOpacity="0.95"
          />
        </LinearGradient>
      </Defs>

      <Rect
        width="100"
        height="100"
        fill="url(#recommendationImageGradient)"
      />
    </Svg>
  );
};

/*
 * Creates the cream container behind the bottom buttons.
 */
const RecommendationBottomShape = ({ style }) => {
  return (
    <Svg
      style={style}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      pointerEvents="none"
    >
      <Path
        d="
          M10 0
          H90
          C94 0 97 4 99 11
          L100 30
          V100
          H0
          V30
          L1 11
          C3 4 6 0 10 0
          Z
        "
        fill={COLORS.warmCream}
      />
    </Svg>
  );
};

export {
  RecommendationHeaderShape,
  RecommendationImageOverlay,
  RecommendationBottomShape,
};