import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  FlatList,
  Text,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import ScreenHeader from "../components/ScreenHeader/ScreenHeader";
import SectionHeader from "../components/SectionHeader/SectionHeader";
import RecentScanCard from "../components/RecentScanCard/RecentScanCard";
import RepairListItem from "../components/RepairListItem/RepairListItem";

import { getPhotoHistory } from "../api/getPhotoHistory";

import COLORS from "../constants/colors";
import styles from "./MyRepairsScreenStyle";


const completedRepairs = [
  {
    id: "1",
    title: "Pipe Leak",
    subtitle: "2 days ago",
  },
  {
    id: "2",
    title: "Electrical Hazard",
    subtitle: "4 days ago",
  },
  {
    id: "3",
    title: "Water Damage",
    subtitle: "5 days ago",
  },
];


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


  const loadPhotoHistory = async () => {
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
          title: title,
          date: formatScanDate(historyItem.createdAt),
          status: status,
          imageUrl: historyItem.imageUrl,
          analysis: historyItem.analysis,
        };

        formattedScans.push(formattedScan);
      }

      setRecentScans(formattedScans);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    loadPhotoHistory();
  }, []);


  const renderRecentScans = () => {
    if (isLoading) {
      return (
        <Text>
          Loading recent scans...
        </Text>
      );
    }

    if (errorMessage) {
      return (
        <Text>
          {errorMessage}
        </Text>
      );
    }

    if (recentScans.length === 0) {
      return (
        <Text>
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
          onPress={() =>
              navigation?.navigate("DIYSolution", {
                analysisResult: {
                  ...item.analysis,
                  photoId: item.id,

              },
                urgency: item.analysis?.urgency || "Low",
            })
        }/>
        )}
      />
    );
  };


  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader
          title="My Repairs"
          onBellPress={() =>
            navigation?.navigate("Notifications")
          }
        />

        <View style={styles.section}>
          <SectionHeader
            title="Recent Scans"
            actionLabel="See All"
            onActionPress={() =>
              navigation?.navigate("RecentScans", {
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
              {}}
          />

          <View style={styles.completedList}>
            {completedRepairs.map((item) => (
              <RepairListItem
                key={item.id}
                title={item.title}
                subtitle={item.subtitle}
                icon={
                  <Ionicons
                    name="camera-outline"
                    size={24}
                    color={COLORS.textMuted}
                  />
                }
                onPress={() => {}}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyRepairsScreen;