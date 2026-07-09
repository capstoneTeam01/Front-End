import { StyleSheet } from "react-native";

import COLORS from "../../constants/colors";
import { SIDE_PADDING } from "../../constants/layout";
import { HEADER_FOOTER } from "../../constants/typography";

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    paddingHorizontal: SIDE_PADDING,
    paddingBottom: 16,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 40,
  },
  leading: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    minWidth: 0,
  },
  side: {
    width: 40,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  sideRight: {
    width: 40,
    alignItems: "flex-end",
    justifyContent: "center",
  },

  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    flex: 1,
    textAlign: "center",
    color: COLORS.secondary,
    ...HEADER_FOOTER.appHeaderTitle,
  },
  titleLeft: {
    flexShrink: 1,
    color: COLORS.honeyBrown,
    ...HEADER_FOOTER.appHeaderTitleLeft,
  },
});

export default styles;
