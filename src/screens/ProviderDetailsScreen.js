import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import AppHeader from "../components/AppHeader/AppHeader";
import ProviderPlainButton from "../components/ProviderPlainButton";
import ProviderHexAvatar from "../components/ProviderHexAvatar";
import ProviderRating from "../components/ProviderRating";
import { loadProviderDetails } from "../localDb/businessDirectoryProviderLocalDb";
import { MAX_SELECTED_PROVIDERS } from "../utils/providerConstants";
import COLORS from "../constants/colors";

const bottomButtonSpace = Platform.OS === "android" ? 28 : 18;

const normalizeSelectedIds = (ids = []) => {
  if (!Array.isArray(ids)) return [];
  return [...new Set(ids.filter(Boolean).map((id) => String(id)))];
};

const ProviderDetailsScreen = ({ navigation, route }) => {
  const providerId = route?.params?.providerId;
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const row = await loadProviderDetails(providerId);
        if (active) setProvider(row);
        console.log("[FixBee][ProviderDetails] loaded provider", {
          providerId,
          found: Boolean(row),
        });
      } catch (error) {
        console.log("[FixBee][ProviderDetails] load failed", error?.message);
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [providerId]);

  const handleAddToList = () => {
    if (!provider) return;

    const selectedIds = normalizeSelectedIds(route?.params?.selectedProviderIds);
    let nextSelectedIds = selectedIds;

    if (!selectedIds.includes(provider.id)) {
      if (selectedIds.length >= MAX_SELECTED_PROVIDERS) {
        Alert.alert("Selection limit", `You can select up to ${MAX_SELECTED_PROVIDERS} providers.`);
        return;
      }

      nextSelectedIds = normalizeSelectedIds([...selectedIds, provider.id]);
    }

    console.log("[FixBee][ProviderDetails] add to list", {
      providerId: provider.id,
      selectedCount: nextSelectedIds.length,
    });

    navigation.navigate("ProviderList", {
      ...route.params,
      selectedProviderIds: nextSelectedIds,
    });
  };

  return (
    <View style={styles.safe}>
      <AppHeader title="Experts List" onBack={() => navigation.goBack()} />

      {loading ? (
        <View style={styles.centerState}>
          <ActivityIndicator />
          <Text style={styles.stateText}>Loading provider...</Text>
        </View>
      ) : null}

      {!loading && !provider ? (
        <View style={styles.centerState}>
          <Text style={styles.stateTitle}>Provider not found.</Text>
          <ProviderPlainButton title="Go Back" onPress={() => navigation.goBack()} />
        </View>
      ) : null}

      {provider ? (
        <>
          <ScrollView contentContainerStyle={styles.content}>
            <ProviderHexAvatar label={provider.businessName} size={70} />
            <Text style={styles.name}>{provider.businessName || "Provider"}</Text>
            <ProviderRating rating={provider.rating} reviewCount={provider.reviewCount} showGoogle />

            <View style={styles.metaRow}>
              <View style={styles.categoryPill}>
                <Text style={styles.categoryPillText}>
                  {provider.primaryCategory || provider.providerType || "Plumbing"}
                </Text>
              </View>
              <View style={styles.availabilityPill}>
                <Text style={styles.availabilityPillText}>24/7</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.description}>{provider.businessDescription || "Licensed repair professional available for residential maintenance and repair requests."}</Text>
            </View>
          </ScrollView>

          <View style={[styles.bottomCta, { paddingBottom: bottomButtonSpace }]}>
            <ProviderPlainButton title="Add To List" onPress={handleAddToList} />
          </View>
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    paddingHorizontal: 26,
    paddingTop: 28,
    paddingBottom: 120,
  },
  name: {
    marginTop: 16,
    color: COLORS.textPrimary,
    fontSize: 20,
    fontWeight: "800",
  },
  metaRow: {
    flexDirection: "row",
    marginTop: 20,
    gap: 10,
  },
  categoryPill: {
    backgroundColor: COLORS.providerLightGray,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 13,
  },
  categoryPillText: {
    color: COLORS.textPrimary,
    fontSize: 12,
    fontWeight: "700",
  },
  availabilityPill: {
    backgroundColor: COLORS.honey,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 13,
  },
  availabilityPillText: {
    color: COLORS.providerBrown,
    fontSize: 12,
    fontWeight: "800",
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 8,
  },
  description: {
    color: COLORS.textPrimary,
    fontSize: 13,
    lineHeight: 20,
  },
  centerState: {
    padding: 24,
    alignItems: "center",
  },
  stateTitle: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 8,
  },
  stateText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 8,
  },
  bottomCta: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 22,
    paddingTop: 12,
    backgroundColor: COLORS.honeyCream,
  },
});

export default ProviderDetailsScreen;
