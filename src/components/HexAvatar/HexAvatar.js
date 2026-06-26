import React from "react";
import { View } from "react-native";
import Svg, { Polygon } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";

import COLORS from "../../constants/colors";
import styles from "./HexAvatarStyle";

const HexAvatar = ({ size = 110, showEditBadge = false, onEditPress }) => {
  
  const w = size;
  const h = size;
  const points = [
    [w * 0.5, 0],
    [w, h * 0.25],
    [w, h * 0.75],
    [w * 0.5, h],
    [0, h * 0.75],
    [0, h * 0.25],
  ]
    .map(([x, y]) => `${x},${y}`)
    .join(" ");

  return (
    <View style={[styles.wrap, { width: size, height: size }]}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Polygon points={points} fill={COLORS.lightHoney} />
      </Svg>

      <View style={styles.iconLayer}>
        <Ionicons
          name="person-outline"
          size={size * 0.32}
          color={COLORS.honeyBrown}
        />
      </View>

      {showEditBadge && (
        <View style={styles.editBadge}>
          <Ionicons name="pencil" size={14} color={COLORS.white} />
        </View>
      )}
    </View>
  );
};

export default HexAvatar;
