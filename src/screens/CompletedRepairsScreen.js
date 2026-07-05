import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import styles from "./RecentScansScreenStyle";
import COLORS from "../constants/colors";

const FILTERS = ["All", "DIY", "Emergency", "Service Requested"];

const CompletedRepairsScreen = ({ navigation, route }) => {
  const repairs = route?.params?.repairs || [];
  const [activeFilter, setActiveFilter] = useState("Emergency");

  const filteredRepairs = repairs.filter((item) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "DIY") return item.diyGenerationStatus === "completed";
    if (activeFilter === "Emergency") return item.analysis?.urgency === "Critical";
    if (activeFilter === "Service Requested") return item.providerRequested;
    return true;
  });

  return (
    <SafeAreaView edges={["left", "right", "bottom"]} style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <Ionicons name="chevron-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Completed Repairs</Text>

        <View style={styles.headerSpace} />
      </View>

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
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
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
                <Text style={styles.categoryText}>Plumbing</Text>  {item.date}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation?.goBack()}
        >
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CompletedRepairsScreen;