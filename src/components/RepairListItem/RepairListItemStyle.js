import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";
import { TYPE } from "../../constants/layout";

const styles = StyleSheet.create({
  row: {
    minHeight: 76,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },

  completedCard: {
    width: "100%",
    height: 98,
    padding: 16,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.providerLightGray,
    backgroundColor: COLORS.white,
  },

  completedImage: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: COLORS.gray700,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  imageGradient: {
    ...StyleSheet.absoluteFillObject,
  },

  divider: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.divider,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    flex: 1,
  },

  iconChip: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    flex: 1,
  },

  title: {
    color: COLORS.secondary,
    marginBottom: 2,
    ...TYPE.small,
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  category: {
    color: COLORS.primary,
    ...TYPE.small,
  },

  subtitle: {
    color: COLORS.mediumGrey,
    ...TYPE.small,
  },
});

export default styles;
