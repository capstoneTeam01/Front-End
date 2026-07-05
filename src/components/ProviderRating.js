import React from "react";
import { StyleSheet, Text, View } from "react-native";
import COLORS from "../constants/colors";
import FONT from "../constants/typography";
import ProviderGoogleIcon from "./ProviderGoogleIcon";

const ProviderRating = ({ rating, reviewCount, showGoogle = false }) => (
  <View style={styles.row}>
    <Text style={styles.star}>★</Text>
    <Text style={styles.text}>{rating || "N/A"}</Text>
    <Text style={styles.muted}> {reviewCount || 0} reviews</Text>
    {showGoogle ? (
      <>
        <Text style={styles.onText}> on </Text>
        <ProviderGoogleIcon size={18} />
      </>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  star: {
    fontFamily: FONT.bold,
    color: COLORS.honeyDark,
    fontSize: 12,
    marginRight: 3,
  },
  text: {
    fontFamily: FONT.bold,
    color: COLORS.providerBrown,
    fontSize: 12,
    fontWeight: "700",
  },
  muted: {
    fontFamily: FONT.regular,
    color: COLORS.providerMidGray,
    fontSize: 11,
  },
  onText: {
    fontFamily: FONT.regular,
    color: COLORS.providerMidGray,
    fontSize: 11,
    marginLeft: 4,
  },
});

export default ProviderRating;
