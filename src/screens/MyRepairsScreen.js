import React, { useCallback, useEffect, useState } from "react";
import {
  ScrollView,
  View,
  FlatList,
  Image,
  Text,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import AppHeader from "../components/AppHeader/AppHeader";
import SectionHeader from "../components/SectionHeader/SectionHeader";
import RecentScanCard from "../components/RecentScanCard/RecentScanCard";
import RepairListItem from "../components/RepairListItem/RepairListItem";
import BottomNav from "../components/BottomNav/BottomNav";

import { getPhotoHistory } from "../api/getPhotoHistory";

import COLORS from "../constants/colors";
import styles from "./MyRepairsScreenStyle";


const formatScanDate = (createdAt) => {
  if (!createdAt) {
    return "Date unavailable";
  }

  const scanDate = new Date(createdAt);
  const currentDate = new Date();

  if (Number.isNaN(scanDate.getTime())) {
    return "Date unavailable";
  }

  const timeDifference =
    currentDate.getTime() - scanDate.getTime();

  const millisecondsInOneDay =
    1000 * 60 * 60 * 24;

  const daysDifference = Math.floor(
    timeDifference / millisecondsInOneDay
  );

  if (daysDifference <= 0) {
    return "Today";
  }

  if (daysDifference === 1) {
    return "1 day ago";
  }

  return `${daysDifference} days ago`;
};


const MyRepairsScreen = ({ navigation }) => {
  const [recentScans, setRecentScans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [completedRepairs, setCompletedRepairs] = useState([]);


  const loadPhotoHistory = useCallback(async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const response = await getPhotoHistory();
      const historyData = response?.history || response || [];

      if (!Array.isArray(historyData)) {
        throw new Error("History data is unavailable.");
      }

      const formattedScans = [];

      for (const historyItem of historyData) {
        let title = "Repair Issue";
        let status = "Analyzed";

        if (historyItem.detectedObject) {
          title = historyItem.detectedObject;
        }

        if (
          historyItem.analysis &&
          historyItem.analysis.detectedIssue
        ) {
          title = historyItem.analysis.detectedIssue;
        }

        if (
          historyItem.analysis &&
          historyItem.analysis.urgency
        ) {
          status = historyItem.analysis.urgency;
        }

    const formattedScan = {
      id: historyItem.photoId,
      title,
      date: formatScanDate(historyItem.createdAt),
      status,
      category:
        historyItem.analysis?.category ||
        historyItem.analysis?.repairCategory ||
        historyItem.category ||
        "Plumbing",
      imageUrl: historyItem.imageUrl,
      analysis: historyItem.analysis,

      diyGenerationStatus: historyItem.diyGenerationStatus || "not_started",
      repairStatus: historyItem.repairStatus || "open",
      repairCompletedAt: historyItem.repairCompletedAt || null,
      providerRequested: historyItem.providerRequested || false,
      providerAssigned: historyItem.providerAssigned || false,
      repairFlow: historyItem.repairFlow || "none",
      selectedProviders: historyItem.selectedProviders || [],
      chosenProvider: historyItem.chosenProvider || null,
      providerReplyStatus:
        historyItem.providerReplyStatus || "not_requested",
      feedbackSubmitted: historyItem.feedbackSubmitted || false,
      feedbackRequestedAt: historyItem.feedbackRequestedAt || null,
      repairFeedback: historyItem.repairFeedback || null,
    };

        formattedScans.push(formattedScan);
      }

    const openScans = formattedScans.filter(
  (item) => item.repairStatus !== "completed"
);

const completedScans = formattedScans.filter(
  (item) => item.repairStatus === "completed"
);

setRecentScans(openScans);
setCompletedRepairs(completedScans);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);


  useEffect(() => {
    loadPhotoHistory();
    const unsubscribe = navigation.addListener("focus", loadPhotoHistory);
    return unsubscribe;
  }, [navigation, loadPhotoHistory]);

  const openRepair = (item) => {
    if (
      item.repairStatus === "completed" ||
      item.repairFlow === "expert" ||
      item.providerRequested
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


  const renderRecentScans = () => {
    if (isLoading) {
      return (
        <Text style={styles.emptyText}>
          Loading recent scans...
        </Text>
      );
    }

    if (errorMessage) {
      return (
        <Text style={styles.emptyText}>
          {errorMessage}
        </Text>
      );
    }

    if (recentScans.length === 0) {
      return (
        <Text style={styles.emptyText}>
          No recent scans found.
        </Text>
      );
    }

    return (
      <FlatList
        horizontal
        data={recentScans}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scanList}
        renderItem={({ item }) => (
          <RecentScanCard
            item={item}
            onPress={() => openRepair(item)}
          />
        )}
      />
    );
  };



  return (
  <View style={styles.safe}>
    <AppHeader title="My Repairs" />

    <ScrollView
      contentContainerStyle={styles.scroll}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.section}>
        <SectionHeader
          title="Recent Scans"
          actionLabel="See All"
          onActionPress={() =>
            navigation.navigate("RecentScans", {
              scans: recentScans,
            })
          }
        />

        {renderRecentScans()}
      </View>

      <View style={styles.section}>
        <SectionHeader
          title="Completed Repairs"
          actionLabel="See All"
          onActionPress={() =>
            navigation.navigate("CompletedRepairs", {
              repairs: completedRepairs,
            })
          }
        />

        <View style={styles.completedList}>
          {completedRepairs.length === 0 ? (
            <Text style={styles.emptyText}>No completed repairs found.</Text>
          ) : (
            completedRepairs.map((item) => (
              <RepairListItem
                key={item.id}
                title={item.title}
                subtitle={item.date}
                category={item.category}
                completedCard
                icon={
                  item.imageUrl ? (
                    <Image
                      source={{ uri: item.imageUrl }}
                      style={styles.completedThumbnail}
                      resizeMode="cover"
                    />
                  ) : (
                    <Ionicons
                      name="checkmark-circle"
                      size={24}
                      color={COLORS.riskLow}
                    />
                  )
                }
                onPress={() => openRepair(item)}
              />
            ))
          )}
        </View>
      </View>
    </ScrollView>
    <BottomNav
  active="Repairs"
  onHomePress={() => navigation?.navigate("Home")}
  onScanPress={() => navigation?.navigate("Scan")}
  onRepairsPress={() => navigation?.navigate("MyRepairs")}
  onProfilePress={() => navigation?.navigate("Profile")}
/>
  </View>
);
};

export default MyRepairsScreen;
