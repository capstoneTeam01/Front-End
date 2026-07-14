import React, { useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AppHeader from "../components/AppHeader/AppHeader";
import styles from "./RecentScansScreenStyle";
import COLORS from "../constants/colors";
import {
  capitalizeFirstLetter,
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
          <TouchableOpacity style={styles.card}>
            <View style={styles.iconBox}>
              {item.imageUrl ? (
                <Image
                  source={{ uri: item.imageUrl }}
                  style={styles.cardImage}
                  resizeMode="cover"
                />
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
                  {capitalizeFirstLetter(
                    item.analysis?.category ||
                      "Repair"
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
