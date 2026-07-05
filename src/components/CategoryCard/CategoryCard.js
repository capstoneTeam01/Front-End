import React from "react";
import { View, Text } from "react-native";
import HexTile from "../HexTile/HexTile";
import styles from "./CategoryCardStyle";
import COLORS from "../../constants/colors";

const CategoryCard = ({ label, icon, onPress, size = 104 }) => {
  return (
    <View style={styles.wrap}>
      <HexTile
        size={size}
        fill={COLORS.surface}
        onPress={onPress}
        flatTop={false}
      >
        <View style={styles.content}>
          <View style={styles.iconWrap}>{icon}</View>
          <Text style={styles.label} numberOfLines={1}>
            {label}
          </Text>
        </View>
      </HexTile>
    </View>
  );
};

export default CategoryCard;
