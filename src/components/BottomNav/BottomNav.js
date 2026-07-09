import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ShapedBackground } from "../AppHeader/AppHeader";
import CategoryPopup from "../CategoryPopup/CategoryPopup";
import BottomNavTabIcon from "./BottomNavTabIcon";
import COLORS from "../../constants/colors";
import styles from "./BottomNavStyle";

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
  const insets = useSafeAreaInsets();
  const [barSize, setBarSize] = useState({ width: 0, height: 0 });
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
        <View
          style={[styles.bar, { paddingBottom: Math.max(insets.bottom, 12) }]}
          onLayout={(e) => setBarSize(e.nativeEvent.layout)}
        >
          <ShapedBackground size={barSize} fill={COLORS.lightHoney} flipped />

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

      <CategoryPopup
        visible={popupVisible}
        onClose={() => setPopupVisible(false)}
        onSelectCategory={goToCategory}
      />
    </>
  );
};

export default BottomNav;
