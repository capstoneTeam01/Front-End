import React from "react";
import { Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import COLORS from "../../constants/colors";
import PolygonAsset from "../PolygonAsset";
import styles from "./HexAvatarStyle";

const HexAvatar = ({ size = 110, showEditBadge = false, onEditPress }) => {
  const height = (size * 89) / 80;

  return (
    <View style={[styles.wrap, { width: size, height }]}>
      <PolygonAsset
        variant="polygon9"
        width={size}
        height={height}
        fill={COLORS.lightHoney}
        style={styles.polygon}
      />

      <View style={styles.iconLayer}>
        <Ionicons
          name="person-outline"
          size={size * 0.34}
          color={COLORS.secondary}
        />
      </View>

      {showEditBadge && (
        <Pressable
          onPress={onEditPress}
          style={styles.editBadge}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Edit profile photo"
        >
          <Ionicons name="pencil" size={14} color={COLORS.white} />
        </Pressable>
      )}
    </View>
  );
};

export default HexAvatar;
