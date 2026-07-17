import { Pressable, Text, View } from "react-native";

import NotificationIcon from "../../../assets/icons/Notification_Icon.svg";
import COLORS from "../../constants/colors";
import useUnreadCount from "../../hooks/useUnreadCount";
import styles from "./HeaderBellButtonStyle";

const HeaderBellButton = ({ onPress, size = 25, color = COLORS.secondary }) => {
  const unreadCount = useUnreadCount();

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
      <NotificationIcon width={size} height={size} />

      {unreadCount > 0 ? (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {unreadCount > 9 ? "9+" : unreadCount}
          </Text>
        </View>
      ) : null}
    </Pressable>
  );
};

export default HeaderBellButton;
