import React from "react";
import {
  View,
  Text,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import styles from "./RecentScanCardStyle";

const RecentScanCard = ({ item }) => {
  return (
    <View style={styles.card}>
      <View style={styles.image}>
        <Ionicons
          name="camera-outline"
          size={32}
          color="#98A2B3"
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>
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