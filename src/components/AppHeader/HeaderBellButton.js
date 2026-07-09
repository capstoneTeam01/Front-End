import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import COLORS from "../../constants/colors";
import styles from "./HeaderBellButtonStyle";

const HeaderBellButton = ({ onPress, size = 20, color = COLORS.secondary }) => {
  if (!onPress) {
    return null;
  }

  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      style={styles.button}
      accessibilityLabel="Open notifications"
    >
      <Ionicons name="notifications-outline" size={size} color={color} />
    </Pressable>
  );
};

export default HeaderBellButton;
