import React from "react";
import { ActivityIndicator, Text, View } from "react-native";

const ProviderLoadingState = ({ message = "Loading providers..." }) => (
  <View style={{ padding: 16 }}>
    <ActivityIndicator />
    <Text>{message}</Text>
  </View>
);

export default ProviderLoadingState;
