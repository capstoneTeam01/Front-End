import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import styles from "./RecentScanCardStyle";
import COLORS from "../../constants/colors";
import {
  capitalizeFirstLetter,
  formatTitle,
} from "../../utils/textFormatters";

const RecentScanCard = ({ item, onPress }) => {
  const hasImage = Boolean(item.imageUrl);

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={onPress}
    >
      <View style={styles.imageContainer}>
        {hasImage ? (
          <Image
            source={{ uri: item.imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Ionicons
              name="camera-outline"
              size={32}
             color={COLORS.primary}
            />
          </View>
        )}
      </View>

      <View style={styles.content}>
        <Text
          style={styles.title}
          numberOfLines={2}
        >
          {formatTitle(item.title)}
        </Text>

        <Text style={styles.date}>
          {item.date}
        </Text>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {capitalizeFirstLetter(item.status)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RecentScanCard;
