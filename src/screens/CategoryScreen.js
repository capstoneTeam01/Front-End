import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import HomeTopBackground from "./HomeTopBackground";
import HeroHexagon from "../components/HeroHexagon/HeroHexagon";
import ScanHexButton from "../components/ScanHexButton/ScanHexButton";
import SectionHeader from "../components/SectionHeader/SectionHeader";
import RepairListItem from "../components/RepairListItem/RepairListItem";
import CaptureInstructionsPopup from "../components/CaptureInstructionsPopup/CaptureInstructionsPopup";
import CategoryIcon from "../components/CategoryIcon";

import { CATEGORY_DETAILS, POPULAR_REPAIRS } from "../data/repairData";
import COLORS from "../constants/colors";
import styles from "./CategoryScreenStyle";

const CategoryScreen = ({ navigation, route }) => {
  const { width: screenWidth } = useWindowDimensions();
  const layoutScale = screenWidth / 402;
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
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[styles.topArea, { height: 116 * layoutScale }]}
        >
          <HomeTopBackground style={styles.topBg} />
          <View
            style={[
              styles.topRow,
              {
                top: 48 * layoutScale,
                height: 68 * layoutScale,
              },
            ]}
          >
            <TouchableOpacity
              style={styles.headerLeft}
              onPress={() => navigation?.goBack()}
              activeOpacity={0.7}
              accessibilityLabel="Go back"
            >
              <Ionicons
                name="chevron-back"
                size={24}
                color={COLORS.secondary}
              />
              <Text style={styles.headerTitle}>{headerTitle}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => navigation?.navigate("Notifications")}
              activeOpacity={0.7}
              accessibilityLabel="Open notifications"
            >
              <Ionicons
                name="notifications-outline"
                size={20}
                color={COLORS.secondary}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.heroWrap}>
          <HeroHexagon width={354 * layoutScale}>
            <Text style={styles.bannerTitle}>{detail.title}</Text>
            <Text style={styles.bannerSubtitle}>{detail.description}</Text>
          </HeroHexagon>
        </View>

        <View
          style={[styles.scanWrap, { marginTop: -50 * layoutScale }]}
        >
          <ScanHexButton
            size={87 * layoutScale}
            onPress={() => openCapturePopup()}
          />
        </View>

        <View style={styles.popularHeader}>
          <SectionHeader
            title="Popular Repairs"
            actionLabel="See All"
            onActionPress={() => {}}
            titleStyle={styles.popularTitle}
            actionStyle={styles.popularAction}
          />
        </View>

        <View style={styles.repairsCard}>
          {POPULAR_REPAIRS.map((item, i) => (
            <RepairListItem
              key={item.id}
              title={item.title}
              subtitle={item.subtitle}
              showDivider={i > 0}
              icon={
                <CategoryIcon
                  categoryId={item.subtitle}
                  size={18}
                  color={COLORS.secondary}
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
