import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Svg, { Path } from "react-native-svg";

import BottomNavTabIcon from "./BottomNavTabIcon";
import COLORS from "../../constants/colors";
import { BOTTOM_NAV_HEIGHT } from "../../constants/layout";
import styles from "./BottomNavStyle";

const NAV_MENU_PATH =
  "M0 44 L20 10 C26 3.5 36 0 48 0 H354 C366 0 376 3.5 382 10 L402 44 V102 H0 Z";

const TABS = [
  { key: "Home", label: "Home", route: "Home" },
  { key: "Scan", label: "Scan", route: "Scan" },
  { key: "Repairs", label: "Repairs", route: "MyRepairs" },
  { key: "Profile", label: "Profile", route: "Profile" },
];

const BottomNav = ({ active }) => {
  const navigation = useNavigation();

  const handlePress = (tab) => {
    if (tab.key === active) return;
    navigation.navigate(tab.route);
  };

  return (
    <View style={styles.floatWrap} pointerEvents="box-none">
      <View style={styles.menu}>
        <Svg
          pointerEvents="none"
          style={styles.shape}
          viewBox={`0 0 402 ${BOTTOM_NAV_HEIGHT}`}
          preserveAspectRatio="none"
        >
          <Path d={NAV_MENU_PATH} fill={COLORS.lightHoney} />
        </Svg>

        <View style={styles.barContent}>
          {TABS.map((tab) => {
            const isActive = tab.key === active;
            return (
              <TouchableOpacity
                key={tab.key}
                style={styles.navItem}
                onPress={() => handlePress(tab)}
                activeOpacity={0.7}
              >
                <BottomNavTabIcon tabKey={tab.key} isActive={isActive} />
                <Text
                  style={isActive ? styles.navLabelActive : styles.navLabel}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default BottomNav;
