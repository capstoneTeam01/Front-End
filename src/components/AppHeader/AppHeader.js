import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Svg, { Polygon } from "react-native-svg";

import COLORS from "../../constants/colors";
import { formatTitle } from "../../utils/textFormatters";
import styles from "./AppHeaderStyle";

const CUT_X = 28; // how far the diagonal cut goes sideways
const CUT_Y = 42; // how far the diagonal cut goes up/down
const ROUNDING = 35; // how soft the corners are

const getPoints = (w, h) => {
  const m = ROUNDING / 2;
  const corners = [
    [m, m], // top left
    [w - m, m], // top right
    [w - m, h - CUT_Y], // where the right side starts to cut in
    [w - CUT_X, h - m], // bottom right
    [CUT_X, h - m], // bottom left
    [m, h - CUT_Y], // where the left side starts to cut in
  ];
  return corners.map((point) => point.join(",")).join(" ");
};

export const ShapedBackground = ({ size, fill, flipped = false }) => {
  if (!size.width || !size.height) {
    return null;
  }
  return (
    <Svg
      width={size.width}
      height={size.height}
      style={[StyleSheet.absoluteFill, flipped && { transform: [{ scaleY: -1 }] }]}
      pointerEvents="none"
    >
      <Polygon
        points={getPoints(size.width, size.height)}
        fill={fill}
        stroke={fill}
        strokeWidth={ROUNDING}
        strokeLinejoin="round"
      />
    </Svg>
  );
};

const AppHeader = ({
  title,
  onBack,
  backDisabled = false,
  right = null,
  fill = COLORS.lightHoney,
  titleAlign = "center",
  style,
}) => {
  const insets = useSafeAreaInsets();
  const [size, setSize] = useState({ width: 0, height: 0 });
  const titleStyle =
    titleAlign === "left"
      ? styles.titleLeft
      : styles.title;

  return (
    <View
      style={[styles.container, { paddingTop: insets.top + 8 }, style]}
      onLayout={(e) => setSize(e.nativeEvent.layout)}
    >
      <ShapedBackground size={size} fill={fill} />
      {titleAlign === "left" ? (
        <View style={styles.row}>
          <View style={styles.leading}>
            {onBack ? (
              <Pressable
                onPress={onBack}
                disabled={backDisabled}
                style={styles.backButton}
                accessibilityLabel="Go back"
              >
                <Ionicons name="chevron-back" size={24} color={COLORS.secondary} />
              </Pressable>
            ) : null}
            <Text style={titleStyle} numberOfLines={1}>
              {formatTitle(title)}
            </Text>
          </View>
          <View style={styles.sideRight}>{right}</View>
        </View>
      ) : (
        <View style={styles.row}>
          <View style={styles.side}>
            {onBack ? (
              <Pressable
                onPress={onBack}
                disabled={backDisabled}
                style={styles.backButton}
                accessibilityLabel="Go back"
              >
                <Ionicons name="chevron-back" size={24} color={COLORS.secondary} />
              </Pressable>
            ) : null}
          </View>
          <Text style={titleStyle} numberOfLines={1}>
            {formatTitle(title)}
          </Text>
          <View style={[styles.side, styles.sideRight]}>{right}</View>
        </View>
      )}
    </View>
  );
};

export default AppHeader;
