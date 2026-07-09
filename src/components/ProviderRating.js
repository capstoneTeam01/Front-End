import React from "react";
import { StyleSheet, Text, View } from "react-native";
import COLORS from "../constants/colors";
import { TYPE } from "../constants/layout";
import ProviderGoogleIcon from "./ProviderGoogleIcon";

const ProviderRating = ({ rating, reviewCount, showGoogle = false }) => (
  <View style={styles.row}>
    <Text style={styles.star}>★</Text>
    <Text style={styles.text}>{rating || "N/A"}</Text>
    <Text style={styles.muted}> {reviewCount || 0} reviews</Text>
    {showGoogle ? (
      <>
        <Text style={styles.onText}> On </Text>
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
    color: COLORS.honeyDark,
    marginRight: 3,
    ...TYPE.caption,
  },
  text: {
    color: COLORS.providerBrown,
    ...TYPE.caption,
  },
  muted: {
    color: COLORS.providerMidGray,
    ...TYPE.caption,
  },
  onText: {
    color: COLORS.providerMidGray,
    marginLeft: 4,
    ...TYPE.caption,
  },
});

export default ProviderRating;
