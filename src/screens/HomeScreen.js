import React, { useState, useEffect } from "react";
import {
  Alert,
  View,
  Text,
  ScrollView,
  useWindowDimensions,
} from "react-native";

import HomeTabHeader, {
  FIGMA_FRAME_WIDTH,
} from "../components/HomeTabHeader/HomeTabHeader";
import HeroHexagon from "../components/HeroHexagon/HeroHexagon";
import ScanHexButton from "../components/ScanHexButton/ScanHexButton";
import CategoryCard from "../components/CategoryCard/CategoryCard";
import CategoryPopup from "../components/CategoryPopup/CategoryPopup";
import CaptureInstructionsPopup from "../components/CaptureInstructionsPopup/CaptureInstructionsPopup";
import BottomNav from "../components/BottomNav/BottomNav";
import CityPickerSheet from "../components/CityPickerSheet/CityPickerSheet";
import CategoryIcon from "../components/CategoryIcon";

import { CATEGORIES } from "../data/repairData";
import { getMe } from "../api/getMe";
import { updateMyCity } from "../api/updateMyCity";
import { getCurrentCityFromGps } from "../utils/locationHelper";
import COLORS from "../constants/colors";
import styles from "./HomeScreenStyle";
import { useLocation } from "../context/LocationContext";

const HomeScreen = ({ navigation }) => {
  const { width: screenWidth } = useWindowDimensions();
  const layoutScale = screenWidth / FIGMA_FRAME_WIDTH;

  const [categoryPopupVisible, setCategoryPopupVisible] = useState(false);
  const [capturePopupVisible, setCapturePopupVisible] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const {
    city: location,
    setCity: setLocation,
  } = useLocation();
  const [locationPickerVisible, setLocationPickerVisible] =
    useState(false);

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const { location: savedCity } =
          await getMe();
        if (active && savedCity) {
          setLocation(savedCity);
          return;
        }
      } catch {}
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
    })();

    return () => {
      active = false;
    };
  }, [setLocation]);

  const handleSelectCategory = (cat) => {
    setSelectedCategoryId(cat.id);
    setCategoryPopupVisible(false);
    setCapturePopupVisible(true);
  };

  const handleCitySelect = async (city) => {
    const previousLocation = location;
    setLocation(city);
    setLocationPickerVisible(false);

    try {
      await updateMyCity(city);
    } catch (error) {
      setLocation(previousLocation);
      Alert.alert(
        "Couldn't update city",
        error?.message || "Please try again."
      );
    }
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
          onLocationPress={() =>
            setLocationPickerVisible(true)
          }
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
            onPress={() => setCategoryPopupVisible(true)}
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
              onPress={() => handleSelectCategory(cat)}
            />
          ))}
        </View>
      </ScrollView>

      <BottomNav active="Home" />

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

      <CityPickerSheet
        visible={locationPickerVisible}
        selectedCity={location}
        onSelect={handleCitySelect}
        onClose={() =>
          setLocationPickerVisible(false)
        }
      />
    </View>
  );
};

export default HomeScreen;
