import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Svg, {
  Defs,
  LinearGradient,
  Rect,
  Stop,
} from "react-native-svg";
import HexIconChip from "../HexIconChip/HexIconChip.js";
import styles from "./RepairListItemStyle";
import COLORS from "../../constants/colors";
import {
  capitalizeFirstLetter,
  formatDisplayLabel,
  formatTitle,
} from "../../utils/textFormatters";

const RepairListItem = ({
  icon,
  title,
  subtitle,
  category,
  onPress,
  showDivider,
  completedCard = false,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.row,
        completedCard && styles.completedCard,
        showDivider && styles.divider,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.left}>
        {completedCard ? (
          <View style={styles.completedImage}>
            {icon}
            <Svg
              pointerEvents="none"
              style={styles.imageGradient}
              width="100%"
              height="100%"
            >
              <Defs>
                <LinearGradient id="completed-image-gradient" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0" stopColor="#666666" stopOpacity="0" />
                  <Stop offset="1" stopColor="#FBB800" stopOpacity="0.2" />
                </LinearGradient>
              </Defs>
              <Rect
                width="100%"
                height="100%"
                fill="url(#completed-image-gradient)"
              />
            </Svg>
          </View>
        ) : (
          <HexIconChip size={40}>{icon}</HexIconChip>
        )}

        <View style={styles.text}>
          <Text style={styles.title} numberOfLines={1}>
            {formatTitle(title)}
          </Text>
          {category ? (
            <View style={styles.metaRow}>
              <Text style={styles.category} numberOfLines={1}>
                {formatDisplayLabel(category)}
              </Text>
              <Text style={styles.subtitle} numberOfLines={1}>
                {capitalizeFirstLetter(subtitle)}
              </Text>
            </View>
          ) : (
            <Text style={styles.subtitle} numberOfLines={1}>
              {capitalizeFirstLetter(subtitle)}
            </Text>
          )}
        </View>
      </View>

      <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />
    </TouchableOpacity>
  );
};

export default RepairListItem;
