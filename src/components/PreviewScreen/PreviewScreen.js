import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Svg, { Polygon } from "react-native-svg";
import { useFonts, Rubik_400Regular } from "@expo-google-fonts/rubik";

import COLORS from "../../constants/colors";
import styles from "./PreviewScreenStyle";

// The header is a rectangle with its two bottom corners cut off
// diagonally (like the edge of a hexagon). The footer is the same
// shape flipped upside down.
const CUT_X = 28; // how far the diagonal cut goes sideways
const CUT_Y = 42; // how far the diagonal cut goes up/down
const ROUNDING = 28; // how soft the corners are

// The 6 corner points of the shape. We draw it slightly smaller,
// then the thick rounded outline (same color) puffs it back to full
// size and rounds every corner for us.
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

const ShapedBackground = ({ size, fill, flipped = false }) => {
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

const PreviewScreen = ({ photo, onRetake, onConfirm, isConfirming = false }) => {
  const insets = useSafeAreaInsets();
  const [headerSize, setHeaderSize] = useState({ width: 0, height: 0 });
  const [footerSize, setFooterSize] = useState({ width: 0, height: 0 });
  const [fontsLoaded] = useFonts({ Rubik_400Regular });

  if (!photo?.uri || !fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: photo.uri }} style={styles.image} resizeMode="cover" />

      <View
        style={[styles.header, { paddingTop: insets.top + 8 }]}
        onLayout={(e) => setHeaderSize(e.nativeEvent.layout)}
      >
        <ShapedBackground size={headerSize} fill={COLORS.lightHoney} />
        <View style={styles.headerRow}>
          <Pressable
            style={styles.headerBack}
            onPress={onRetake}
            disabled={isConfirming}
            hitSlop={8}
            accessibilityLabel="Go back"
          >
            <Ionicons name="chevron-back" size={24} color={COLORS.secondary} />
          </Pressable>
          <Text style={styles.headerTitle}>Preview</Text>
          <View style={styles.headerBack} />
        </View>
      </View>

      <View
        style={[styles.actionBar, { paddingBottom: insets.bottom + 16 }]}
        onLayout={(e) => setFooterSize(e.nativeEvent.layout)}
      >
        <ShapedBackground size={footerSize} fill={COLORS.warmCream} flipped />
        <View style={styles.actionRow}>
          <Pressable
            style={styles.retakeButton}
            onPress={onRetake}
            disabled={isConfirming}
            accessibilityLabel="Retake photo"
          >
            <Text style={styles.retakeText}>Retake</Text>
          </Pressable>

          <Pressable
            style={[styles.confirmButton, isConfirming && styles.confirmButtonDisabled]}
            onPress={onConfirm}
            disabled={isConfirming}
            accessibilityLabel="Confirm photo"
          >
            {isConfirming ? (
              <ActivityIndicator color={COLORS.secondary} />
            ) : (
              <Text style={styles.confirmText}>Confirm</Text>
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default PreviewScreen;
