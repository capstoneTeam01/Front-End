import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Svg, { Path } from "react-native-svg";

import CategoryPopup from "../CategoryPopup/CategoryPopup";
import BottomNavTabIcon from "./BottomNavTabIcon";
import COLORS from "../../constants/colors";
import { BOTTOM_NAV_HEIGHT } from "../../constants/layout";
import styles from "./BottomNavStyle";

const NAV_MENU_PATH =
  "M0 38 L17 9 C21.5 3.5 29 0 38 0 H364 C373 0 380.5 3.5 385 9 L402 38 V102 H0 Z";

const TABS = [
  { key: "Home", label: "Home", route: "Home" },
  { key: "Scan", label: "Scan", route: "Scan" },
  { key: "Repairs", label: "Repairs", route: "MyRepairs" },
  { key: "Profile", label: "Profile", route: "Profile" },
];

// Shared bottom tab bar. Owns the category popup so the Scan tab
// always opens category selection first (never jumps to the camera),
// on every screen that renders BottomNav.
const BottomNav = ({ active }) => {
  const navigation = useNavigation();
  const [popupVisible, setPopupVisible] = useState(false);

  const handlePress = (tab) => {
    if (tab.key === "Scan") {
      setPopupVisible(true);
      return;
    }

    if (tab.key === active) return;

    navigation.navigate(tab.route);
  };

  const goToCategory = (cat) => {
    setPopupVisible(false);
    navigation.navigate("Category", { categoryId: cat.id, title: cat.label });
  };

  return (
    <>
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
                  <Text style={isActive ? styles.navLabelActive : styles.navLabel}>
                    {tab.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>

      <CategoryPopup
        visible={popupVisible}
        onClose={() => setPopupVisible(false)}
        onSelectCategory={goToCategory}
      />
    </>
  );
};

export default BottomNav;
