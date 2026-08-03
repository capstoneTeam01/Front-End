import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
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
import { capitalizeFirstLetter } from "../utils/textFormatters";
import { getPhotoHistory } from "../api/getPhotoHistory";

const FILTERS = ["All", "DIY", "Emergency", "Service Requested"];

const formatScanDate = (createdAt) => {
  if (!createdAt) return "Date unavailable";

  const scanDate = new Date(createdAt);
  if (Number.isNaN(scanDate.getTime())) return "Date unavailable";

  const days = Math.floor(
    (Date.now() - scanDate.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (days <= 0) return "Today";
  if (days === 1) return "1 day ago";
  return `${days} days ago`;
};

const formatHistoryItem = (historyItem) => ({
  id: historyItem.photoId,
  title:
    historyItem.analysis?.heroTitle ||
    historyItem.analysis?.headline ||
    historyItem.analysis?.detectedIssue ||
    historyItem.detectedObject ||
    "Repair Issue",
  date: formatScanDate(historyItem.createdAt),
  status: historyItem.analysis?.urgency || "Analyzed",
  category:
    historyItem.analysis?.category ||
    historyItem.analysis?.repairCategory ||
    historyItem.category ||
    "Plumbing",
  imageUrl: historyItem.imageUrl,
  analysis: historyItem.analysis || {},
  diyGenerationStatus: historyItem.diyGenerationStatus || "not_started",
  repairStatus: historyItem.repairStatus || "open",
  repairFlow: historyItem.repairFlow || "none",
  providerRequested: historyItem.providerRequested || false,
  chosenProvider: historyItem.chosenProvider || null,
});

const RecentScansScreen = ({ navigation, route }) => {
  const [scans, setScans] = useState(route?.params?.scans || []);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const loadRecentScans = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMessage("");
      const response = await getPhotoHistory();
      const history = response?.history || response || [];

      if (!Array.isArray(history)) {
        throw new Error("Recent scans are unavailable.");
      }

      setScans(
        history
          .map(formatHistoryItem)
          .filter((item) => item.repairStatus !== "completed"),
      );
    } catch (error) {
      setErrorMessage(error?.message || "Unable to load recent scans.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRecentScans();
    const unsubscribe = navigation.addListener("focus", loadRecentScans);
    return unsubscribe;
  }, [navigation, loadRecentScans]);

  const filteredScans = scans.filter((item) => {
    const urgency = String(item.analysis?.urgency || "").toLowerCase();
    const diyStatus = String(item.diyGenerationStatus || "").toLowerCase();

    if (activeFilter === "All") {
      return true;
    }

    if (activeFilter === "DIY") {
      return diyStatus === "completed";
    }

    if (activeFilter === "Emergency") {
      return urgency === "critical" || urgency === "high";
    }

    if (activeFilter === "Service Requested") {
      return item.providerRequested === true;
    }

    return true;
  });

  const openScan = (item) => {
    if (
      item.repairFlow === "expert" ||
      item.providerRequested ||
      item.repairStatus === "in_progress"
    ) {
      navigation.navigate("RepairStatus", { photoId: item.id });
      return;
    }

    navigation.navigate("DIYSolution", {
      analysisResult: {
        ...item.analysis,
        photoId: item.id,
      },
      urgency: item.analysis?.urgency || "Low",
    });
  };

  return (
    <View style={styles.safe}>
      <AppHeader
        title="Recent Scans"
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
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : (
            <Text style={styles.emptyText}>
              {errorMessage || "No recent scans found."}
            </Text>
          )
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => openScan(item)}
          >
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
              <Text style={styles.title}>{capitalizeFirstLetter(item.title)}</Text>
              <Text style={styles.meta}>
                <Text style={styles.categoryText}>
                  {capitalizeFirstLetter(item.category || "Plumbing")}
                </Text>{" "}
                {item.date}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default RecentScansScreen;
