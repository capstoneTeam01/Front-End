import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import HomeTopBackground from "../../screens/HomeTopBackground";
import HeaderBellButton from "../AppHeader/HeaderBellButton";
import COLORS from "../../constants/colors";
import styles, {
  FIGMA_FRAME_WIDTH,
  TAB_HEADER_AREA_HEIGHT,
  TAB_HEADER_CONTENT_HEIGHT,
  TAB_HEADER_CONTENT_TOP,
} from "./HomeTabHeaderStyle";

const HomeTabHeader = ({
  variant = "home",
  title,
  location,
  layoutScale,
  onBack,
  onNotificationsPress,
}) => {
  const scale = layoutScale ?? 1;

  return (
    <View style={[styles.topArea, { height: TAB_HEADER_AREA_HEIGHT * scale }]}>
      <HomeTopBackground style={styles.topBg} />
      <View
        style={[
          styles.topRow,
          {
            top: TAB_HEADER_CONTENT_TOP * scale,
            height: TAB_HEADER_CONTENT_HEIGHT * scale,
          },
        ]}
      >
        {variant === "category" ? (
          <TouchableOpacity
            style={styles.headerLeft}
            onPress={onBack}
            activeOpacity={0.7}
            accessibilityLabel="Go back"
          >
            <Ionicons
              name="chevron-back"
              size={24}
              color={COLORS.secondary}
            />
            <Text style={styles.headerTitle} numberOfLines={1}>
              {title}
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.locationPill}>
            <Ionicons
              name="location-outline"
              size={20}
              color={COLORS.secondary}
            />
            <Text style={styles.locationText} numberOfLines={1}>
              {location}
            </Text>
          </View>
        )}

        <HeaderBellButton onPress={onNotificationsPress} />
      </View>
    </View>
  );
};

export { FIGMA_FRAME_WIDTH };
export default HomeTabHeader;
