import React from "react";
import {
  View,
  Text,
  Image,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import styles from "./RecentScanCardStyle";

const RecentScanCard = ({ item }) => {
  const hasImage = Boolean(item.imageUrl);

  return (
    <View style={styles.card}>
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
              color="#98A2B3"
            />
          </View>
        )}
      </View>

      <View style={styles.content}>
        <Text
          style={styles.title}
          numberOfLines={2}
        >
          {item.title}
        </Text>

        <Text style={styles.date}>
          {item.date}
        </Text>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {item.status}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default RecentScanCard;