import React from "react";
import { View } from "react-native";

import ProviderCard from "./ProviderCard";
import ProviderEmptyState from "./ProviderEmptyState";
import ProviderLoadingState from "./ProviderLoadingState";

const ProviderList = ({
  providers,
  loading,
  selectedIds,
  onToggleProvider,
  onOpenProvider,
  onSyncPress,
}) => {
  if (loading) return <ProviderLoadingState />;
  if (!providers.length) return <ProviderEmptyState onSyncPress={onSyncPress} />;

  return (
    <View>
      {providers.map((provider) => (
        <ProviderCard
          key={provider.id}
          provider={provider}
          selected={selectedIds.includes(provider.id)}
          onToggle={() => onToggleProvider(provider.id)}
          onPress={() => onOpenProvider(provider)}
        />
      ))}
    </View>
  );
};

export default ProviderList;
