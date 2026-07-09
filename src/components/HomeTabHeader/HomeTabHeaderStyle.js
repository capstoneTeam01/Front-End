import { StyleSheet } from "react-native";

import COLORS from "../../constants/colors";
import { SIDE_PADDING } from "../../constants/layout";
import { HEADER_FOOTER } from "../../constants/typography";

export const FIGMA_FRAME_WIDTH = 402;
export const TAB_HEADER_AREA_HEIGHT = 116;
export const TAB_HEADER_CONTENT_TOP = 48;
export const TAB_HEADER_CONTENT_HEIGHT = 68;

const styles = StyleSheet.create({
  topArea: {
    position: "relative",
    marginHorizontal: -SIDE_PADDING,
  },

  topBg: {
    ...StyleSheet.absoluteFillObject,
  },

  topRow: {
    position: "absolute",
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SIDE_PADDING,
  },

  locationPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  locationText: {
    color: COLORS.textPrimary,
    ...HEADER_FOOTER.tabHeaderText,
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexShrink: 1,
  },

  headerTitle: {
    color: COLORS.honeyBrown,
    flexShrink: 1,
    ...HEADER_FOOTER.tabHeaderText,
  },
});

export default styles;
