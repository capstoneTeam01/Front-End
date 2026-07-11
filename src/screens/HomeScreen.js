import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, useWindowDimensions } from "react-native";

import HomeTabHeader, {
  FIGMA_FRAME_WIDTH,
} from "../components/HomeTabHeader/HomeTabHeader";
import HeroHexagon from "../components/HeroHexagon/HeroHexagon";
import ScanHexButton from "../components/ScanHexButton/ScanHexButton";
import CategoryCard from "../components/CategoryCard/CategoryCard";
import CategoryPopup from "../components/CategoryPopup/CategoryPopup";
import BottomNav from "../components/BottomNav/BottomNav";
import CategoryIcon from "../components/CategoryIcon";

import { CATEGORIES } from "../data/repairData";
import { getMe } from "../api/getMe";
import { getCurrentCityFromGps } from "../utils/locationHelper";
import COLORS from "../constants/colors";
import styles from "./HomeScreenStyle";

const HomeScreen = ({ navigation }) => {
  const { width: screenWidth } = useWindowDimensions();
  const layoutScale = screenWidth / FIGMA_FRAME_WIDTH;
  const [popupVisible, setPopupVisible] = useState(false);
  const [location, setLocation] = useState("Vancouver");

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const current = await getCurrentCityFromGps({
          preferCached: true,
          allowCachedOnFailure: true,
          cacheReason: "home-header-location",
          highAccuracy: false,
        });

        if (active && current?.city) {
          setLocation(current.city);
          return;
        }
      } catch {}
      try {
        const { location: loc } = await getMe();
        if (active && loc) setLocation(loc);
      } catch {}
    })();

    return () => {
      active = false;
    };
  }, []);

  const goToCategory = (cat) => {
    setPopupVisible(false);
    navigation?.navigate("Category", { categoryId: cat.id, title: cat.label });
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
            <Text style={styles.heroTitle}>What Needs Fixing?</Text>
            <Text style={styles.heroSubtitle}>
              Capture the issue and let FixBee analyze it for you.
            </Text>
          </HeroHexagon>
        </View>

        <View style={[styles.scanWrap, { marginTop: -50 * layoutScale }]}>
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
