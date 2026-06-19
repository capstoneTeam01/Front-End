import React from "react";
import { Text, View } from "react-native";
import ProviderPlainButton from "./ProviderPlainButton";

const ProviderEmptyState = ({ onSyncPress }) => (
  <View style={{ padding: 16 }}>
    <Text>No providers found.</Text>
    <ProviderPlainButton title="Try Again" onPress={onSyncPress} />
  </View>
);

export default ProviderEmptyState;
