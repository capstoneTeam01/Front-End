import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import ScreenHeader from "../components/ScreenHeader/ScreenHeader";
import ScanHexButton from "../components/ScanHexButton/ScanHexButton";
import CategoryCard from "../components/CategoryCard/CategoryCard";
import SectionHeader from "../components/SectionHeader/SectionHeader";
import RepairListItem from "../components/RepairListItem/RepairListItem";
import CategoryPopup from "../components/CategoryPopup/CategoryPopup";
import BottomNav from "../components/BottomNav/BottomNav";

import { CATEGORIES, POPULAR_REPAIRS } from "../data/repairData";
import { getMe } from "../api/getMe";
import COLORS from "../constants/colors";
import styles from "./HomeScreenStyle";

const HomeScreen = ({ navigation }) => {
  const [popupVisible, setPopupVisible] = useState(false);

  const [location, setLocation] = useState("Vancouver, BC");

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

  const [loadingRepairs] = useState(false);
  const repairs = POPULAR_REPAIRS;

  const goToCategory = (cat) => {
    setPopupVisible(false);
    navigation?.navigate("Category", { categoryId: cat.id, title: cat.label });
  };

  const renderRepairs = () => {
    if (loadingRepairs) {
      return (
        <View style={styles.stateBox}>
          <ActivityIndicator color={COLORS.textMuted} />
        </View>
      );
    }

    if (!repairs.length) {
      return (
        <View style={styles.stateBox}>
          <Ionicons
            name="construct-outline"
            size={28}
            color={COLORS.textMuted}
          />
          <Text style={styles.emptyTitle}>No repairs yet</Text>
          <Text style={styles.emptyText}>
            Scan an issue to see it show up here.
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.repairsCard}>
        {repairs.map((item, i) => (
          <RepairListItem
            key={item.id}
            title={item.title}
            subtitle={item.subtitle}
            showDivider={i > 0}
            icon={
              <Ionicons name={item.icon} size={18} color={COLORS.textPrimary} />
            }
            onPress={() =>
              navigation?.navigate("Category", {
                categoryId: item.subtitle.toLowerCase(),
                title: item.subtitle,
              })
            }
          />
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader
          onBellPress={() => navigation?.navigate("Notifications")}
          leading={
            <View style={styles.locationPill}>
              <Ionicons
                name="location-outline"
                size={16}
                color={COLORS.textPrimary}
              />
              <Text style={styles.locationText} numberOfLines={1}>
                {location}
              </Text>
            </View>
          }
        />

        <View style={styles.hero}>
          <Text style={styles.heroTitle}>What Needs Fixing?</Text>
          <Text style={styles.heroSubtitle}>
            Take a photo and let FixBee identify the issue.
          </Text>
        </View>

        <View style={styles.scanWrap}>
          <ScanHexButton onPress={() => setPopupVisible(true)} />
        </View>

        <Text style={styles.centerSection}>Repair Categories</Text>
        <View style={styles.grid}>
          {CATEGORIES.map((cat) => (
            <CategoryCard
              key={cat.id}
              label={cat.label}
              icon={
                <Ionicons
                  name={cat.icon}
                  size={24}
                  color={COLORS.textPrimary}
                />
              }
              onPress={() => goToCategory(cat)}
            />
          ))}
        </View>

        <View style={styles.popularHeader}>
          <SectionHeader
            title="Popular Repairs"
            actionLabel="See All"
            onActionPress={() => {}}
          />
        </View>
        {renderRepairs()}
      </ScrollView>

      <BottomNav active="Home" onScanPress={() => setPopupVisible(true)} />

      <CategoryPopup
        visible={popupVisible}
        onClose={() => setPopupVisible(false)}
        onSelectCategory={goToCategory}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
