import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Svg, { Path } from "react-native-svg";

import Polygon4 from "../../assets/icons/Polygon 4.svg";
import Polygon5 from "../../assets/icons/Polygon 5.svg";
import Polygon8 from "../../assets/icons/Polygon 8.svg";
import Polygon9 from "../../assets/icons/Polygon 9.svg";
import Polygon10 from "../../assets/icons/Polygon 10.svg";
import Polygon11 from "../../assets/icons/Polygon 11.svg";

export const POLYGON_ASSETS = {
  polygon4: {
    Component: Polygon4,
    width: 87,
    height: 97,
    viewBox: "0 0 87 97",
    path:
      "M38.3013 1.33975C41.3953 -0.446582 45.2073 -0.446582 48.3013 1.33975L81.6025 20.5662C84.6965 22.3526 86.6025 25.6538 86.6025 29.2265V67.6795C86.6025 71.2522 84.6965 74.5534 81.6025 76.3397L48.3013 95.5662C45.2073 97.3526 41.3953 97.3526 38.3013 95.5662L5 76.3397C1.90599 74.5534 0 71.2522 0 67.6795V29.2265C0 25.6538 1.90599 22.3526 5 20.5662L38.3013 1.33975Z",
    fill: "#FBB800",
  },
  polygon5: {
    Component: Polygon5,
    width: 354,
    height: 403,
    viewBox: "0 0 354 403",
    path:
      "M167.268 2.60948C173.29 -0.869829 180.71 -0.869826 186.732 2.60948L344.267 93.6208C350.29 97.1001 354 103.53 354 110.489V292.511C354 299.47 350.29 305.9 344.267 309.379L186.732 400.391C180.71 403.87 173.29 403.87 167.268 400.391L9.73247 309.379C3.70999 305.9 0 299.47 0 292.511V110.489C0 103.53 3.71 97.1001 9.73247 93.6208L167.268 2.60948Z",
    fill: "#FDE68A",
  },
  polygon8: {
    Component: Polygon8,
    width: 347,
    height: 394,
    viewBox: "0 0 347 394",
    path:
      "M163.455 3.1123C169.488 -0.370975 176.922 -0.37097 182.955 3.1123L336.16 91.5654C342.193 95.0488 345.91 101.486 345.91 108.453V285.359C345.91 292.326 342.193 298.763 336.16 302.246L182.955 390.699C176.922 394.183 169.488 394.183 163.455 390.699L10.25 302.246C4.21688 298.763 0.50013 292.326 0.5 285.359V108.453L0.510742 107.802C0.727148 101.304 4.17196 95.3369 9.69141 91.9004L10.25 91.5654L163.455 3.1123Z",
    fill: "#FFF9E6",
    stroke: "#FBB800",
    strokeWidth: 1,
  },
  polygon9: {
    Component: Polygon9,
    width: 80,
    height: 89,
    viewBox: "0 0 80 89",
    path:
      "M34.868 1.37203C38.0437 -0.457342 41.9563 -0.457343 45.132 1.37203L74.868 18.5016C78.0437 20.3309 80 23.7117 80 27.3705V61.6295C80 65.2883 78.0437 68.6691 74.868 70.4984L45.132 87.628C41.9563 89.4573 38.0437 89.4573 34.868 87.628L5.132 70.4984C1.95631 68.6691 0 65.2883 0 61.6295V27.3705C0 23.7117 1.95631 20.3309 5.132 18.5016L34.868 1.37203Z",
    fill: "#FBB800",
  },
  polygon10: {
    Component: Polygon10,
    width: 190,
    height: 157,
    viewBox: "0 0 190 157",
    path:
      "M163.205 -234.227C169.393 -237.799 177.017 -237.799 183.205 -234.226L336.41 -145.773C342.598 -142.201 346.41 -135.598 346.41 -128.453V48.453C346.41 55.5983 342.598 62.2008 336.41 65.7735L183.205 154.227C177.017 157.799 169.393 157.799 163.205 154.226L9.99999 65.7735C3.81197 62.2008 0 55.5983 0 48.453V-128.453C0 -135.598 3.81198 -142.201 10 -145.774L163.205 -234.227Z",
    fill: "#FDE68A",
  },
  polygon11: {
    Component: Polygon11,
    width: 293,
    height: 118,
    viewBox: "0 0 293 118",
    path:
      "M-32.0913 -212.698C-29.5236 -219.366 -23.5936 -224.157 -16.535 -225.267L158.222 -252.756C165.281 -253.867 172.395 -251.127 176.886 -245.569L288.071 -107.97C292.562 -102.412 293.746 -94.8805 291.179 -88.2125L227.606 76.8762C225.038 83.5442 219.108 88.3358 212.05 89.4461L37.2927 116.935C30.2342 118.045 23.1195 115.306 18.6287 109.748L-92.556 -27.8518C-97.0468 -33.4095 -98.2315 -40.9409 -95.6638 -47.6089L-32.0913 -212.698Z",
    fill: "#FFDF88",
  },
};

const isFiniteNumber = (value) =>
  typeof value === "number" && Number.isFinite(value);

const normalizeColor = (color) =>
  color === undefined || color === null
    ? color
    : String(color).trim().toLowerCase();

const isTransparentColor = (color) =>
  color === undefined ||
  color === null ||
  normalizeColor(color) === "transparent";

const getDefaultStrokeWidth = (asset) =>
  Number(asset.strokeWidth ?? (asset.stroke ? 1 : 0)) || 0;

const getStrokeWidthNumber = (strokeWidth, fallback = 0) => {
  const parsed = Number(strokeWidth);

  return Number.isFinite(parsed) ? parsed : fallback;
};

const shouldRenderColorablePath = ({
  asset,
  fill,
  stroke,
  strokeWidth,
}) => {
  if (!asset.path || !asset.viewBox) {
    return false;
  }

  const defaultStrokeWidth = getDefaultStrokeWidth(asset);
  const hasFillOverride =
    fill !== undefined && normalizeColor(fill) !== normalizeColor(asset.fill);
  const hasVisibleStrokeOverride =
    stroke !== undefined &&
    !isTransparentColor(stroke) &&
    normalizeColor(stroke) !== normalizeColor(asset.stroke);
  const removesDefaultStroke =
    stroke !== undefined &&
    isTransparentColor(stroke) &&
    defaultStrokeWidth > 0;
  const hasStrokeWidthOverride =
    strokeWidth !== undefined &&
    getStrokeWidthNumber(strokeWidth, defaultStrokeWidth) !==
      defaultStrokeWidth;

  return (
    defaultStrokeWidth > 0 ||
    hasFillOverride ||
    hasVisibleStrokeOverride ||
    removesDefaultStroke ||
    hasStrokeWidthOverride
  );
};

const getResolvedStrokeWidth = ({ asset, stroke, strokeWidth }) => {
  if (strokeWidth !== undefined) {
    return getStrokeWidthNumber(strokeWidth, 0);
  }

  const defaultStrokeWidth = getDefaultStrokeWidth(asset);
  const hasStrokeOverride =
    stroke !== undefined && !isTransparentColor(stroke);

  return hasStrokeOverride && defaultStrokeWidth === 0
    ? 1
    : defaultStrokeWidth;
};

export const getPolygonAssetSize = (variant, width, height) => {
  const asset = POLYGON_ASSETS[variant] || POLYGON_ASSETS.polygon4;
  const hasWidth = width !== undefined && width !== null;
  const hasHeight = height !== undefined && height !== null;

  if (hasWidth && hasHeight) {
    return {
      width,
      height,
    };
  }

  if (hasWidth) {
    return {
      width,
      height: isFiniteNumber(width)
        ? (width * asset.height) / asset.width
        : undefined,
    };
  }

  if (hasHeight) {
    return {
      width: isFiniteNumber(height)
        ? (height * asset.width) / asset.height
        : undefined,
      height,
    };
  }

  return {
    width: asset.width,
    height: asset.height,
  };
};

const PolygonAsset = ({
  variant = "polygon4",
  width,
  height,
  children,
  style,
  contentStyle,
  onPress,
  activeOpacity = 0.7,
  opacity,
  fill,
  stroke,
  strokeWidth,
  pointerEvents,
  preserveAspectRatio = "xMidYMid meet",
}) => {
  const asset = POLYGON_ASSETS[variant] || POLYGON_ASSETS.polygon4;
  const SvgPolygon = asset.Component;
  const dimensions = getPolygonAssetSize(variant, width, height);
  const aspectRatio = asset.width / asset.height;
  const Wrapper = onPress ? TouchableOpacity : View;
  const wrapperProps = onPress ? { onPress, activeOpacity } : {};
  const renderColorablePath = shouldRenderColorablePath({
    asset,
    fill,
    stroke,
    strokeWidth,
  });
  const resolvedStrokeWidth = getResolvedStrokeWidth({
    asset,
    stroke,
    strokeWidth,
  });
  const resolvedStroke = stroke ?? asset.stroke;
  const hasVisibleStroke =
    resolvedStrokeWidth > 0 &&
    !isTransparentColor(resolvedStroke);

  return (
    <Wrapper
      {...wrapperProps}
      pointerEvents={pointerEvents}
      style={[
        styles.wrap,
        { aspectRatio },
        dimensions,
        style,
        opacity !== undefined ? { opacity } : null,
      ]}
    >
      {renderColorablePath ? (
        <Svg
          width="100%"
          height="100%"
          viewBox={asset.viewBox}
          preserveAspectRatio={preserveAspectRatio}
          overflow="visible"
          style={StyleSheet.absoluteFill}
        >
          <Path
            d={asset.path}
            fill={fill ?? asset.fill ?? "none"}
            stroke={hasVisibleStroke ? resolvedStroke : "none"}
            strokeWidth={hasVisibleStroke ? resolvedStrokeWidth : 0}
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </Svg>
      ) : (
        <SvgPolygon
          width="100%"
          height="100%"
          preserveAspectRatio={preserveAspectRatio}
          overflow="visible"
          style={StyleSheet.absoluteFill}
        />
      )}

      {children ? (
        <View style={[StyleSheet.absoluteFill, styles.content, contentStyle]}>
          {children}
        </View>
      ) : null}
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  wrap: {
    position: "relative",
    flexShrink: 0,
    overflow: "visible",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PolygonAsset;
