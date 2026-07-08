import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import HomeTopBackground from "./HomeTopBackground.js";
import HeroHexagon from "../components/HeroHexagon/HeroHexagon";
import ScanHexButton from "../components/ScanHexButton/ScanHexButton";
import CategoryCard from "../components/CategoryCard/CategoryCard";
import SectionHeader from "../components/SectionHeader/SectionHeader";
import RepairListItem from "../components/RepairListItem/RepairListItem";
import CategoryPopup from "../components/CategoryPopup/CategoryPopup";
import BottomNav from "../components/BottomNav/BottomNav";
import CategoryIcon from "../components/CategoryIcon";

import { CATEGORIES, POPULAR_REPAIRS } from "../data/repairData";
import { getMe } from "../api/getMe";
import COLORS from "../constants/colors";
import styles from "./HomeScreenStyle";

const HomeScreen = ({ navigation }) => {
  const { width: screenWidth } = useWindowDimensions();
  const layoutScale = screenWidth / 402;
  const [popupVisible, setPopupVisible] = useState(false);
  const [location, setLocation] = useState("Vancouver");

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
              <CategoryIcon
                categoryId={item.subtitle}
                size={18}
                color={COLORS.secondary}
              />
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
            <View style={styles.locationPill}>
              <Ionicons
                name="location-outline"
                size={18}
                color={COLORS.secondary}
              />
              <Text style={styles.locationText} numberOfLines={1}>
                {location}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => navigation?.navigate("Notifications")}
              hitSlop={8}
            >
              <Ionicons
                name="notifications-outline"
                size={22}
                color={COLORS.secondary}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.heroWrap}>
          <HeroHexagon width={354 * layoutScale}>
            <Text style={styles.heroTitle}>What Needs Fixing?</Text>
            <Text style={styles.heroSubtitle}>
              Capture the issue and let FixBee analyze it for you.
            </Text>
          </HeroHexagon>
        </View>

        <View
          style={[styles.scanWrap, { marginTop: -50 * layoutScale }]}
        >
          <ScanHexButton
            size={87 * layoutScale}
            onPress={() => setPopupVisible(true)}
          />
        </View>

        <Text style={styles.centerSection}>Repair Categories</Text>
        <View style={[styles.grid, { gap: 16 * layoutScale }]}>
          {CATEGORIES.map((cat) => (
            <CategoryCard
              key={cat.id}
              label={cat.label}
              size={107.33 * layoutScale}
              icon={
                <CategoryIcon
                  categoryId={cat.id}
                  size={24}
                  color={COLORS.primary}
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
            titleStyle={styles.popularTitle}
            actionStyle={styles.popularAction}
          />
        </View>
        {renderRepairs()}
      </ScrollView>

      <BottomNav active="Home" />

      <CategoryPopup
        visible={popupVisible}
        onClose={() => setPopupVisible(false)}
        onSelectCategory={goToCategory}
      />
    </View>
  );
};

export default HomeScreen;
