import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AppHeader from "../components/AppHeader/AppHeader";
import styles from "./RecentScansScreenStyle";
import COLORS from "../constants/colors";

const FILTERS = ["All", "DIY", "Emergency", "Service Requested"];

const RecentScansScreen = ({ navigation, route }) => {
  const scans = route?.params?.scans || [];
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredScans = scans.filter((item) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "DIY") return item.diyGenerationStatus === "completed";
    if (activeFilter === "Emergency") return item.analysis?.urgency === "Critical";
    if (activeFilter === "Service Requested") return item.providerRequested;
    return true;
  });

  return (
    <View style={styles.safe}>
      <AppHeader
        title="Recent Scans"
        showBack
        onBack={() => navigation?.goBack()}
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
        data={filteredScans}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation?.navigate("DIYSolution", {
                analysisResult: {
                  ...item.analysis,
                  photoId: item.id,
                },
                urgency: item.analysis?.urgency || "Low",
              })
            }
          >
            <View style={styles.iconBox}>
              <Ionicons
                name="camera-outline"
                size={24}
                color={COLORS.textMuted}
              />
            </View>

            <View style={styles.cardContent}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.meta}>
                <Text style={styles.categoryText}>Plumbing</Text> {item.date}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation?.goBack()}
      >
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RecentScansScreen;