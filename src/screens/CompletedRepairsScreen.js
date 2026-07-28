import React, { useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Svg, {
  Defs,
  LinearGradient,
  Rect,
  Stop,
} from "react-native-svg";

import AppHeader from "../components/AppHeader/AppHeader";
import styles from "./RecentScansScreenStyle";
import COLORS from "../constants/colors";
import {
  formatDisplayLabel,
  formatTitle,
} from "../utils/textFormatters";

const FILTERS = ["All", "DIY", "Emergency", "Service Requested"];

const CompletedRepairsScreen = ({ navigation, route }) => {
  const repairs = route?.params?.repairs || [];
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredRepairs = repairs.filter((item) => {
    const urgency = String(item.analysis?.urgency || "").toLowerCase();
    const diyStatus = String(item.diyGenerationStatus || "").toLowerCase();

    switch (activeFilter) {
      case "DIY":
        return diyStatus === "completed";
      case "Emergency":
        return urgency === "critical" || urgency === "high";
      case "Service Requested":
        return item.providerRequested === true;
      case "All":
      default:
        return true;
    }
  });

  return (
    <View style={styles.safe}>
      <AppHeader
        title="Completed Repairs"
        onBack={() => navigation.goBack()}
      />

      <View style={styles.filterRow}>
        {FILTERS.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterPill,
              activeFilter === filter && styles.filterPillActive,
            ]}
            onPress={() => setActiveFilter(filter)}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === filter && styles.filterTextActive,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredRepairs}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No completed repairs found.</Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, styles.completedCard]}
            onPress={() =>
              navigation.navigate("RepairStatus", {
                photoId: item.id,
              })
            }
          >
            <View style={[styles.iconBox, styles.completedImageBox]}>
              {item.imageUrl ? (
                <>
                  <Image
                    source={{ uri: item.imageUrl }}
                    style={styles.cardImage}
                    resizeMode="cover"
                  />
                  <Svg
                    pointerEvents="none"
                    style={styles.imageGradient}
                    width="100%"
                    height="100%"
                  >
                    <Defs>
                      <LinearGradient id="completed-list-gradient" x1="0" y1="0" x2="0" y2="1">
                        <Stop offset="0" stopColor="#666666" stopOpacity="0" />
                        <Stop offset="1" stopColor="#FBB800" stopOpacity="0.2" />
                      </LinearGradient>
                    </Defs>
                    <Rect
                      width="100%"
                      height="100%"
                      fill="url(#completed-list-gradient)"
                    />
                  </Svg>
                </>
              ) : (
                <Ionicons
                  name="camera-outline"
                  size={24}
                  color={COLORS.textMuted}
                />
              )}
            </View>

            <View style={styles.cardContent}>
              <Text style={styles.title}>
                {formatTitle(item.title)}
              </Text>
              <Text style={styles.meta}>
                <Text style={styles.categoryText}>
                  {formatDisplayLabel(
                    item.category ||
                      item.analysis?.category ||
                      item.analysis?.repairCategory ||
                      "Plumbing"
                  )}
                </Text>{" "}
                • {item.date}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CompletedRepairsScreen;
