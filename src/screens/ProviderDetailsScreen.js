import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AppHeader from "../components/AppHeader/AppHeader";
import HeaderBellButton from "../components/AppHeader/HeaderBellButton";
import AuthFooterTray from "../components/AuthFooterTray/AuthFooterTray";
import ProviderPlainButton from "../components/ProviderPlainButton";
import ProviderHexAvatar from "../components/ProviderHexAvatar";
import ProviderRating from "../components/ProviderRating";
import ProviderSelectionLimitPopup from "../components/ProviderSelectionLimitPopup/ProviderSelectionLimitPopup";
import { loadProviderDetails } from "../localDb/businessDirectoryProviderLocalDb";
import { MAX_SELECTED_PROVIDERS } from "../utils/providerConstants";
import COLORS from "../constants/colors";
import { RADIUS, SIDE_PADDING, SPACING, TYPE } from "../constants/layout";

const normalizeSelectedIds = (ids = []) => {
  if (!Array.isArray(ids)) return [];
  return [...new Set(ids.filter(Boolean).map((id) => String(id)))].slice(
    0,
    MAX_SELECTED_PROVIDERS,
  );
};

const ProviderDetailsScreen = ({ navigation, route }) => {
  const providerId = route?.params?.providerId;
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [limitPopupVisible, setLimitPopupVisible] = useState(false);

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

    const normalizedProviderId = String(provider.id);

    if (!selectedIds.includes(normalizedProviderId)) {
      if (selectedIds.length >= MAX_SELECTED_PROVIDERS) {
        setLimitPopupVisible(true);
        return;
      }

      nextSelectedIds = normalizeSelectedIds([
        ...selectedIds,
        normalizedProviderId,
      ]);
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
      <AppHeader
        title="Providers"
        onBack={() => navigation.goBack()}
        right={
          <HeaderBellButton
            onPress={() => navigation.navigate("Notifications")}
          />
        }
      />

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
            <View style={styles.providerSummary}>
              <ProviderHexAvatar label={provider.businessName} size={100} />
              <Text style={styles.name}>
                {provider.businessName || "Provider"}
              </Text>
              <ProviderRating
                rating={provider.rating}
                reviewCount={provider.reviewCount}
                showGoogle
              />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.description}>
                {provider.businessDescription ||
                  "Licensed repair professional available for residential maintenance and repair requests."}
              </Text>

              <View style={styles.metaRow}>
                <View style={styles.categoryPill}>
                  <Text style={styles.categoryPillText}>
                    {provider.primaryCategory ||
                      provider.providerType ||
                      "Plumbing"}
                  </Text>
                </View>
                <View style={styles.availabilityPill}>
                  <Text style={styles.availabilityPillText}>24/7</Text>
                </View>
              </View>
            </View>
          </ScrollView>

          <View style={styles.bottomCta}>
            <AuthFooterTray fill={COLORS.warmCream}>
              <ProviderPlainButton
                title="Add to List"
                onPress={handleAddToList}
              />
            </AuthFooterTray>
          </View>
        </>
      ) : null}

      <ProviderSelectionLimitPopup
        visible={limitPopupVisible}
        limit={MAX_SELECTED_PROVIDERS}
        onClose={() => setLimitPopupVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    paddingHorizontal: SIDE_PADDING,
    paddingTop: 40,
    paddingBottom: 118,
  },
  providerSummary: {
    minHeight: 210,
    alignItems: "flex-start",
  },
  name: {
    marginTop: SPACING.card,
    marginBottom: SPACING.sm,
    color: COLORS.secondary,
    ...TYPE.sectionTitle,
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
    borderRadius: RADIUS.field,
  },
  categoryPillText: {
    color: COLORS.textPrimary,
    ...TYPE.caption,
  },
  availabilityPill: {
    backgroundColor: COLORS.honey,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: RADIUS.field,
  },
  availabilityPillText: {
    color: COLORS.providerBrown,
    ...TYPE.caption,
  },
  section: {
    paddingTop: 20,
  },
  sectionTitle: {
    color: COLORS.textPrimary,
    marginBottom: SPACING.card,
    ...TYPE.sectionTitle,
  },
  description: {
    color: COLORS.textSecondary,
    ...TYPE.body,
  },
  centerState: {
    padding: SIDE_PADDING,
    alignItems: "center",
  },
  stateTitle: {
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
    ...TYPE.body,
  },
  stateText: {
    color: COLORS.textSecondary,
    marginTop: SPACING.sm,
    ...TYPE.caption,
  },
  bottomCta: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default ProviderDetailsScreen;
