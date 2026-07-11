import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, useWindowDimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import HomeTabHeader, {
  FIGMA_FRAME_WIDTH,
} from "../components/HomeTabHeader/HomeTabHeader";
import HeroHexagon from "../components/HeroHexagon/HeroHexagon";
import ScanHexButton from "../components/ScanHexButton/ScanHexButton";
import SectionHeader from "../components/SectionHeader/SectionHeader";
import RepairListItem from "../components/RepairListItem/RepairListItem";
import CaptureInstructionsPopup from "../components/CaptureInstructionsPopup/CaptureInstructionsPopup";

import { CATEGORY_DETAILS } from "../data/repairData";
import { getPhotoHistory } from "../api/getPhotoHistory";
import COLORS from "../constants/colors";
import styles from "./CategoryScreenStyle";

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

const CategoryScreen = ({ navigation, route }) => {
  const { width: screenWidth } = useWindowDimensions();
  const layoutScale = screenWidth / FIGMA_FRAME_WIDTH;
  const categoryId = route?.params?.categoryId || "plumbing";
  const headerTitle = route?.params?.title || "Plumbing";
  const [capturePopupVisible, setCapturePopupVisible] = useState(false);
  const [repairId, setRepairId] = useState(null);

  const [completedRepairs, setCompletedRepairs] = useState([]);

  const detail = CATEGORY_DETAILS[categoryId] || CATEGORY_DETAILS.plumbing;

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const response = await getPhotoHistory();
        const historyData = response?.history || response || [];

        if (!Array.isArray(historyData)) {
          return;
        }

        const completedScans = [];

        for (const historyItem of historyData) {
          if (historyItem.repairStatus !== "completed") {
            continue;
          }

          let title = "Repair Issue";

          if (historyItem.detectedObject) {
            title = historyItem.detectedObject;
          }

          if (historyItem.analysis && historyItem.analysis.detectedIssue) {
            title = historyItem.analysis.detectedIssue;
          }

          completedScans.push({
            id: historyItem.photoId,
            title,
            date: formatScanDate(historyItem.createdAt),
          });
        }

        if (active) {
          setCompletedRepairs(completedScans);
        }
      } catch {
        // Leave the list empty on failure.
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  const openCapturePopup = (selectedRepairId = null) => {
    setRepairId(selectedRepairId);
    setCapturePopupVisible(true);
  };

  const handleScanNow = () => {
    const params = {
      categoryId,
      repairId,
      title: "Start New Scan",
      subtitle: "Capture a repair issue with AI guidance.",
      openCamera: true,
    };
    setCapturePopupVisible(false);
    requestAnimationFrame(() => {
      navigation?.navigate("ScanCamera", params);
    });
  };

  return (
    <View style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <HomeTabHeader
          variant="category"
          title={headerTitle}
          layoutScale={layoutScale}
          onBack={() => navigation?.goBack()}
          onNotificationsPress={() => navigation?.navigate("Notifications")}
        />

        <View style={styles.heroWrap}>
          <HeroHexagon width={354 * layoutScale}>
            <Text style={styles.bannerTitle}>{detail.title}</Text>
            <Text style={styles.bannerSubtitle}>{detail.description}</Text>
          </HeroHexagon>
        </View>

        <View style={[styles.scanWrap, { marginTop: -50 * layoutScale }]}>
          <ScanHexButton
            size={87 * layoutScale}
            onPress={() => openCapturePopup()}
          />
        </View>

        <View style={styles.popularHeader}>
          <SectionHeader
            title="Completed Repairs"
            actionLabel="See All"
            onActionPress={() =>
              navigation?.navigate("CompletedRepairs", {
                repairs: completedRepairs,
              })
            }
            titleStyle={styles.popularTitle}
            actionStyle={styles.popularAction}
          />
        </View>

        <View style={styles.repairsCard}>
          {completedRepairs.length === 0 ? (
            <Text style={styles.emptyText}>No Completed Repairs Found.</Text>
          ) : (
            completedRepairs.map((item, i) => (
              <RepairListItem
                key={item.id}
                title={item.title}
                subtitle={item.date}
                showDivider={i > 0}
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
      </ScrollView>

      <CaptureInstructionsPopup
        visible={capturePopupVisible}
        onClose={() => setCapturePopupVisible(false)}
        onScanNow={handleScanNow}
      />
    </View>
  );
};

export default CategoryScreen;
