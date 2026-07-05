import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  FlatList,
  Text,
  TouchableOpacity,
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


const demoCompletedRepairs = [
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
  const [completedRepairs, setCompletedRepairs] = useState([]);


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

        repairStatus: historyItem.repairStatus || "open",
        repairCompletedAt: historyItem.repairCompletedAt || null,
        providerRequested: historyItem.providerRequested || false,
        providerAssigned: historyItem.providerAssigned || false,
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
            <Text>No completed repairs.</Text>
          ) : (
            completedRepairs.map((item) => (
              <RepairListItem
                key={item.id}
                title={item.title}
                subtitle={item.date}
                icon={
                  <Ionicons
                    name="checkmark-circle"
                    size={24}
                    color={COLORS.success || "green"}
                  />
                }
                onPress={() => {}}
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