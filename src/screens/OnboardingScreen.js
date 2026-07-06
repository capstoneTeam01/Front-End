import React, { useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import styles from "./OnboardingScreenStyle";
import AuthButton from "../components/AuthButton/AuthButton";
import CityPickerSheet from "../components/CityPickerSheet/CityPickerSheet";
import { updateMyCity } from "../api/updateMyCity";
import HeroHexagon from "../components/HeroHexagon/HeroHexagon";
import Onboarding1 from "../components/Mascot/Onboarding1.svg";
import Onboarding2 from "../components/Mascot/Onboarding2.svg";
import Onboarding3 from "../components/Mascot/Onboarding3.svg";
import Welcome from "../components/Mascot/Welcome.svg";

const { width } = Dimensions.get("window");

const SLIDES = [
  {
    key: "spot",
    title: "Spot The Problem",
    body: "Take a photo of an issue and let FixBee identify what's wrong.",
    Mascot: Onboarding1,
  },
  {
    key: "solution",
    title: "Get Smart Solution",
    body: "Receive issue details, DIY guidance, and estimated repair costs instantly.",
    Mascot: Onboarding2,
  },
  {
    key: "trusted",
    title: "Find Trusted Help",
    body: "Connect with trusted professionals when the repair needs expert attention.",
    Mascot: Onboarding3,
  },
  {
    key: "city",
    title: "Select Your City",
    body: "Choose your city so we can match you with nearby professionals.",
    isCity: true,
    Mascot: Welcome,
  },
];

const OnboardingScreen = ({ navigation }) => {
  const scrollRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [city, setCity] = useState(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [saving, setSaving] = useState(false);

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
              <HeroHexagon flatTop width={280}>
                {slide.Mascot ? (
                  <slide.Mascot width={150} height={150} />
                ) : null}
              </HeroHexagon>
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

      <View style={styles.footer}>
        <AuthButton label="Next" onPress={handleNext} loading={saving} />
      </View>

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
