import React from "react";
import { View, Text } from "react-native";

import PolygonAsset from "../PolygonAsset";
import styles from "./CategoryCardStyle";
import COLORS from "../../constants/colors";

const CategoryCard = ({
  label,
  icon,
  onPress,
  size = 107.33,
  fill = COLORS.surface,
}) => {
  return (
    <View style={styles.wrap}>
      <PolygonAsset
        variant="polygon5"
        width={size}
        height={(size * 120.69) / 107.33}
        fill={fill}
        onPress={onPress}
        preserveAspectRatio="none"
      >
        <View style={styles.content}>
          <View style={styles.iconWrap}>{icon}</View>
          <Text style={styles.label} numberOfLines={1}>
            {label}
          </Text>
        </View>
      </PolygonAsset>
    </View>
  );
};

export default CategoryCard;
