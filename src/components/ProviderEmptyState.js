import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ProviderPlainButton from "./ProviderPlainButton";
import COLORS from "../constants/colors";
import { SPACING, TYPE } from "../constants/layout";

const ProviderEmptyState = ({ onSyncPress }) => (
  <View style={styles.container}>
    <Text style={styles.title}>No Providers Found.</Text>
    <ProviderPlainButton title="Try Again" onPress={onSyncPress} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: SPACING.card,
    gap: SPACING.card,
  },
  title: {
    color: COLORS.textPrimary,
    ...TYPE.body,
  },
});

export default ProviderEmptyState;
