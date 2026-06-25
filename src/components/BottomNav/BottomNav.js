import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
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

const BottomNav = ({ active, onScanPress }) => {
  const navigation = useNavigation();

  const handlePress = (tab) => {
    if (tab.key === active) return; // already here

    if (tab.key === "Scan" && typeof onScanPress === "function") {
      onScanPress();
      return;
    }

    navigation.navigate(tab.route);
  };

  return (
    <View style={styles.bottomNav}>
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
              color={isActive ? COLORS.navActive : COLORS.navInactive}
            />
            <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomNav;
