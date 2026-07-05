import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";

import COLORS from "../../constants/colors";
import styles from "./BottomNavStyle";

const TABS = [
  {
    key: "Home",
    label: "Home",
    icon: "home-outline",
    iconActive: "home",
    route: "Home",
  },
  {
    key: "Scan",
    label: "Scan",
    icon: "scan-outline",
    iconActive: "scan",
    route: "Scan",
  },
  {
    key: "Repairs",
    label: "Repairs",
    icon: "build-outline",
    iconActive: "build",
    route: "MyRepairs",
  },
  {
    key: "Profile",
    label: "Profile",
    icon: "person-outline",
    iconActive: "person",
    route: "Profile",
  },
];

// Floating cream nav bar with a notched (angled) top-right corner.
const NavShape = () => (
  <Svg
    style={styles.shape}
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
    pointerEvents="none"
  >
    <Path
      d="
        M18 0
        H76
        C84 0 90 4 95 12
        L99 20
        C100 22 100 24 100 28
        V82
        C100 92 92 100 82 100
        H18
        C8 100 0 92 0 82
        V18
        C0 8 8 0 18 0
        Z
      "
      fill={COLORS.lightHoney}
    />
  </Svg>
);

const BottomNav = ({ active, onScanPress }) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const handlePress = (tab) => {
    if (tab.key === active) return;

    if (tab.key === "Scan" && typeof onScanPress === "function") {
      onScanPress();
      return;
    }

    navigation.navigate(tab.route);
  };

  return (
    <View
      style={[styles.floatWrap, { paddingBottom: Math.max(insets.bottom, 12) }]}
      pointerEvents="box-none"
    >
      <View style={styles.bar}>
        <NavShape />

        {TABS.map((tab) => {
          const isActive = tab.key === active;
          return (
            <TouchableOpacity
              key={tab.key}
              style={styles.navItem}
              onPress={() => handlePress(tab)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={isActive ? tab.iconActive : tab.icon}
                size={22}
                color={isActive ? COLORS.primary : COLORS.mediumGrey}
              />
              <Text
                style={[styles.navLabel, isActive && styles.navLabelActive]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default BottomNav;
