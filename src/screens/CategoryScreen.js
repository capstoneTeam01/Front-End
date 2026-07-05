import React, { useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AppHeader from "../components/AppHeader/AppHeader";
import ScanHexButton from "../components/ScanHexButton/ScanHexButton";
import SectionHeader from "../components/SectionHeader/SectionHeader";
import RepairListItem from "../components/RepairListItem/RepairListItem";
import CaptureInstructionsPopup from "../components/CaptureInstructionsPopup/CaptureInstructionsPopup";

import { CATEGORY_DETAILS } from "../data/repairData";
import COLORS from "../constants/colors";
import styles from "./CategoryScreenStyle";

const CategoryScreen = ({ navigation, route }) => {
  const categoryId = route?.params?.categoryId || "plumbing";
  const headerTitle = route?.params?.title || "Plumbing";
  const [capturePopupVisible, setCapturePopupVisible] = useState(false);
  const [repairId, setRepairId] = useState(null);

  const detail = CATEGORY_DETAILS[categoryId] || CATEGORY_DETAILS.plumbing;

  const openCapturePopup = (selectedRepairId = null) => {
    setRepairId(selectedRepairId);
    setCapturePopupVisible(true);
  };

  const handleScanNow = () => {
    setCapturePopupVisible(false);
    navigation?.navigate("Scan", {
      categoryId,
      repairId,
      title: "Start New Scan",
      subtitle: "Capture a repair issue with AI guidance.",
      openCamera: true,
    });
  };

  return (
    <View style={styles.safe}>
      <AppHeader
        title={headerTitle}
        onBack={() => navigation?.goBack()}
        right={
          <Ionicons
            name="notifications-outline"
            size={22}
            color={COLORS.secondary}
            onPress={() => navigation?.navigate("Notifications")}
          />
        }
      />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>{detail.title}</Text>
          <Text style={styles.bannerSubtitle}>{detail.description}</Text>
        </View>

        <View style={styles.scanWrap}>
          <ScanHexButton onPress={() => openCapturePopup()} />
        </View>

        <View style={styles.popularHeader}>
          <SectionHeader
            title="Popular Repairs"
            actionLabel="See All"
            onActionPress={() => {}}
          />
        </View>

        <View style={styles.repairsCard}>
          {detail.repairs.map((item, i) => (
            <RepairListItem
              key={item.id}
              title={item.title}
              subtitle={item.subtitle}
              showDivider={i > 0}
              icon={
                <Ionicons
                  name={item.icon}
                  size={18}
                  color={COLORS.honeyBrown}
                />
              }
              onPress={() => openCapturePopup(item.id)}
            />
          ))}
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
