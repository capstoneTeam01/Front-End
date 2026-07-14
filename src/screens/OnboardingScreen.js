import React, { useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import styles from "./OnboardingScreenStyle";
import AuthButton from "../components/AuthButton/AuthButton";
import AuthFooterTray from "../components/AuthFooterTray/AuthFooterTray";
import CityPickerSheet from "../components/CityPickerSheet/CityPickerSheet";
import { updateMyCity } from "../api/updateMyCity";
import HoneycombBackground from "../components/HoneycombBackground";
import PolygonAsset from "../components/PolygonAsset";
import OnboardingIdentifying from "../components/Mascot/OnboardingIdentifying.svg";
import Onboarding2 from "../components/Mascot/Onboarding2.svg";
import Onboarding3 from "../components/Mascot/Onboarding3.svg";
import OnboardingCity from "../components/Mascot/OnboardingCity.svg";
import COLORS from "../constants/colors";

const FIGMA_FRAME_WIDTH = 402;
const HERO_WIDTH = 354;

const SLIDES = [
  {
    key: "spot",
    title: "Spot The Problem",
    body: "Take a photo of an issue and let FixBee identify what's wrong.",
    Mascot: OnboardingIdentifying,
    mascotWidth: 140,
    mascotHeight: 225,
  },
  {
    key: "solution",
    title: "Get Smart Solution",
    body: "Receive issue details, DIY guidance, and estimated repair costs instantly.",
    Mascot: Onboarding2,
    mascotWidth: 160,
    mascotHeight: 171,
  },
  {
    key: "trusted",
    title: "Find Trusted Help",
    body: "Connect with trusted professionals when the repair needs expert attention.",
    Mascot: Onboarding3,
    mascotWidth: 162,
    mascotHeight: 186,
  },
  {
    key: "city",
    title: "Select Your City",
    body: "Choose your city so we can match you with nearby professionals.",
    isCity: true,
    Mascot: OnboardingCity,
    mascotWidth: 143,
    mascotHeight: 188,
  },
];

const OnboardingScreen = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const scrollRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [city, setCity] = useState(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const scale = width / FIGMA_FRAME_WIDTH;
  const heroWidth = Math.round(HERO_WIDTH * scale);
  const isLast = index === SLIDES.length - 1;

  const goToSlide = (i) => {
    scrollRef.current?.scrollTo({ x: i * width, animated: true });
    setIndex(i);
  };

  const handleScroll = (event) => {
    const next = Math.round(event.nativeEvent.contentOffset.x / width);
    if (next !== index) setIndex(next);
  };

  const finishOnboarding = async () => {
    if (!city) {
      Alert.alert("Pick your city", "Select a city to continue.");
      return;
    }

    setSaving(true);
    try {
      await updateMyCity(city);
      navigation.reset({ index: 0, routes: [{ name: "Home" }] });
    } catch (error) {
      Alert.alert(
        "Couldn't save your city",
        error?.message || "Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleNext = () => {
    if (isLast) {
      finishOnboarding();
    } else {
      goToSlide(index + 1);
    }
  };

  return (
    <View style={styles.container}>
      <HoneycombBackground variant="welcome" />

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
      >
        {SLIDES.map((slide) => (
          <View key={slide.key} style={[styles.slide, { width }]}>
            <View style={styles.hexHero}>
              <PolygonAsset
                variant="polygon5"
                width={heroWidth}
                contentStyle={styles.heroContent}
              >
                <slide.Mascot
                  width={Math.round(slide.mascotWidth * scale)}
                  height={Math.round(slide.mascotHeight * scale)}
                />
              </PolygonAsset>
            </View>

            <View style={styles.textBlock}>
              <Text style={styles.title}>{slide.title}</Text>
              <Text style={styles.body}>{slide.body}</Text>

              {slide.isCity && (
                <TouchableOpacity
                  style={styles.cityField}
                  onPress={() => setSheetOpen(true)}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[styles.cityText, !city && styles.cityPlaceholder]}
                  >
                    {city || "Select a city"}
                  </Text>
                  <Text style={styles.chevron}>▾</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.dotsRow}>
        {SLIDES.map((s, i) => (
          <View
            key={s.key}
            style={[styles.dot, i === index && styles.dotActive]}
          />
        ))}
      </View>

      <AuthFooterTray fill={COLORS.warmCream}>
        <View style={styles.footerButtons}>
          {!isLast ? (
            <AuthButton
              label="Skip"
              variant="secondary"
              onPress={() =>
                goToSlide(SLIDES.length - 1)
              }
              style={styles.skipButton}
              labelStyle={styles.skipButtonLabel}
            />
          ) : null}

          <AuthButton
            label="Next"
            onPress={handleNext}
            loading={saving}
            style={styles.nextButton}
            labelStyle={styles.nextButtonLabel}
          />
        </View>
      </AuthFooterTray>

      <CityPickerSheet
        visible={sheetOpen}
        selectedCity={city}
        onSelect={(c) => {
          setCity(c);
          setSheetOpen(false);
        }}
        onClose={() => setSheetOpen(false)}
      />
    </View>
  );
};

export default OnboardingScreen;
