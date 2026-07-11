import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  useWindowDimensions,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import HomeTabHeader, {
  FIGMA_FRAME_WIDTH,
} from "../components/HomeTabHeader/HomeTabHeader";
import HeroHexagon from "../components/HeroHexagon/HeroHexagon";
import ScanHexButton from "../components/ScanHexButton/ScanHexButton";
import SectionHeader from "../components/SectionHeader/SectionHeader";
import RecentScanCard from "../components/RecentScanCard/RecentScanCard";
import RepairListItem from "../components/RepairListItem/RepairListItem";
import CategoryPopup from "../components/CategoryPopup/CategoryPopup";
import CaptureInstructionsPopup from "../components/CaptureInstructionsPopup/CaptureInstructionsPopup";
import BottomNav from "../components/BottomNav/BottomNav";

import { getMe } from "../api/getMe";
import { getPhotoHistory } from "../api/getPhotoHistory";

import COLORS from "../constants/colors";
import styles from "./ScanDashboardScreenStyle";

const formatScanDate = (createdAt) => {
  if (!createdAt) {
    return "Date unavailable";
  }

  const scanDate = new Date(createdAt);
  const currentDate = new Date();

  if (Number.isNaN(scanDate.getTime())) {
    return "Date unavailable";
  }

  const timeDifference = currentDate.getTime() - scanDate.getTime();
  const millisecondsInOneDay = 1000 * 60 * 60 * 24;
  const daysDifference = Math.floor(timeDifference / millisecondsInOneDay);

  if (daysDifference <= 0) {
    return "Today";
  }

  if (daysDifference === 1) {
    return "1 day ago";
  }

  return `${daysDifference} days ago`;
};

const ScanDashboardScreen = ({ navigation }) => {
  const { width: screenWidth } = useWindowDimensions();
  const layoutScale = screenWidth / FIGMA_FRAME_WIDTH;

  const [location, setLocation] = useState("Vancouver");

  const [categoryPopupVisible, setCategoryPopupVisible] = useState(false);
  const [capturePopupVisible, setCapturePopupVisible] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const [recentScans, setRecentScans] = useState([]);
  const [completedRepairs, setCompletedRepairs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const { location: loc } = await getMe();
        if (active && loc) setLocation(loc);
      } catch {}
    })();
    return () => {
      active = false;
    };
  }, []);

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

        if (historyItem.analysis && historyItem.analysis.detectedIssue) {
          title = historyItem.analysis.detectedIssue;
        }

        if (historyItem.analysis && historyItem.analysis.urgency) {
          status = historyItem.analysis.urgency;
        }

        const formattedScan = {
          id: historyItem.photoId,
          title,
          date: formatScanDate(historyItem.createdAt),
          status,
          imageUrl: historyItem.imageUrl,
          analysis: historyItem.analysis,

          diyGenerationStatus: historyItem.diyGenerationStatus || "not_started",
          repairStatus: historyItem.repairStatus || "open",
          repairCompletedAt: historyItem.repairCompletedAt || null,
          providerRequested: historyItem.providerRequested || false,
          providerAssigned: historyItem.providerAssigned || false,
          repairFeedback: historyItem.repairFeedback || null,
        };

        formattedScans.push(formattedScan);
      }

      const openScans = formattedScans.filter(
        (item) => item.repairStatus !== "completed",
      );

      const completedScans = formattedScans.filter(
        (item) => item.repairStatus === "completed",
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

  const handleSelectCategory = (cat) => {
    setSelectedCategoryId(cat.id);
    setCategoryPopupVisible(false);
    setCapturePopupVisible(true);
  };

  const handleScanNow = () => {
    const params = {
      categoryId: selectedCategoryId,
      repairId: null,
      title: "Start New Scan",
      subtitle: "Capture a repair issue with AI guidance.",
      openCamera: true,
    };
    setCapturePopupVisible(false);
    requestAnimationFrame(() => {
      navigation?.navigate("ScanCamera", params);
    });
  };

  const renderRecentScans = () => {
    if (isLoading) {
      return <Text style={styles.stateText}>Loading recent scans...</Text>;
    }

    if (errorMessage) {
      return <Text style={styles.stateText}>{errorMessage}</Text>;
    }

    if (recentScans.length === 0) {
      return <Text style={styles.stateText}>No recent scans found.</Text>;
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
            }
          />
        )}
      />
    );
  };

  return (
    <View style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <HomeTabHeader
          variant="home"
          location={location}
          layoutScale={layoutScale}
          onNotificationsPress={() => navigation?.navigate("Notifications")}
        />

        <View style={styles.heroWrap}>
          <HeroHexagon width={354 * layoutScale}>
            <Text style={styles.heroTitle}>Start New Scan</Text>
            <Text style={styles.heroSubtitle}>
              Capture a repair issue with Ai Guidance
            </Text>
          </HeroHexagon>
        </View>

        <View style={[styles.scanWrap, { marginTop: -50 * layoutScale }]}>
          <ScanHexButton
            size={87 * layoutScale}
            onPress={() => setCategoryPopupVisible(true)}
          />
        </View>

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
              navigation?.navigate("CompletedRepairs", {
                repairs: completedRepairs,
              })
            }
          />

          <View style={styles.completedList}>
            {completedRepairs.length === 0 ? (
              <Text style={styles.emptyText}>No Completed Repairs Found.</Text>
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

      <BottomNav active="Scan" />

      <CategoryPopup
        visible={categoryPopupVisible}
        onClose={() => setCategoryPopupVisible(false)}
        onSelectCategory={handleSelectCategory}
      />

      <CaptureInstructionsPopup
        visible={capturePopupVisible}
        onClose={() => setCapturePopupVisible(false)}
        onScanNow={handleScanNow}
      />
    </View>
  );
};

export default ScanDashboardScreen;
