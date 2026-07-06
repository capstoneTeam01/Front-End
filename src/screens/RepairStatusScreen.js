import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { updateChosenProvider } from "../api/updateChosenProvider";

import AppHeader from "../components/AppHeader/AppHeader";
import COLORS from "../constants/colors";
import { apiGet } from "../api/apiClient";
import styles from "./RepairStatusScreenStyle";

const getProviderName = (provider) => {
  return (
    provider?.businessName ||
    provider?.name ||
    provider?.title ||
    provider?.companyName ||
    "Service Provider"
  );
};

const RepairStatusScreen = ({ navigation, route }) => {
  const photoId =
    route?.params?.photoId ||
    route?.params?.relatedId ||
    route?.params?.notification?.relatedId;

  const [loading, setLoading] = useState(true);
  const [scan, setScan] = useState(null);
  const [selectedProviderIndex, setSelectedProviderIndex] = useState(null);

  const loadRepair = async () => {
    if (!photoId) {
      setLoading(false);
      Alert.alert("Repair unavailable", "Repair scan ID is missing.", [
        { text: "Go Back", onPress: () => navigation.goBack() },
      ]);
      return;
    }

    try {
      setLoading(true);
      const response = await apiGet(`/api/photos/${photoId}`);
      setScan(response?.scan || null);
    } catch (error) {
      Alert.alert(
        "Unable to load repair",
        error?.message || "Could not load repair details."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRepair();
  }, [photoId]);

  const providers = Array.isArray(scan?.selectedProviders)
    ? scan.selectedProviders
    : [];

  const analysis = scan?.analysis || {};

  const handleConfirmProvider = async () => {
  if (selectedProviderIndex === null) {
    Alert.alert("Select provider", "Please select the provider who replied.");
    return;
  }

  const chosenProvider = providers[selectedProviderIndex];

  try {
    await updateChosenProvider(photoId, chosenProvider);

    setScan((currentScan) => ({
      ...currentScan,
      chosenProvider,
      providerReplyStatus: "replied",
    }));

    Alert.alert(
      "Provider saved",
      `${getProviderName(chosenProvider)} has been saved for this repair.`,
      [
    {
      text: "Continue",
      onPress: () => {
        navigation.navigate("MyRepairs");
      },
    },
  ]
    );
  } catch (error) {
    Alert.alert(
      "Unable to save provider",
      error?.message || "Could not update the chosen provider."
    );
  }
};

  if (loading) {
    return (
      <View style={styles.safe}>
        <AppHeader title="Repair Status" onBack={() => navigation.goBack()} />

        <View style={styles.loadingBox}>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingText}>Loading repair status...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.safe}>
      <AppHeader title="Repair Status" onBack={() => navigation.goBack()} />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.summaryCard}>
          <Text style={styles.label}>Issue</Text>
          <Text style={styles.title}>
            {analysis.detectedIssue || scan?.detectedObject || "Repair Issue"}
          </Text>

          <Text style={styles.meta}>
            Status: {scan?.repairStatus || "open"}
          </Text>

          <Text style={styles.meta}>
            Flow: {scan?.repairFlow || "none"}
          </Text>

          <Text style={styles.meta}>
            Provider Reply: {scan?.providerReplyStatus || "not_requested"}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Selected Providers</Text>

          {providers.length === 0 ? (
            <Text style={styles.emptyText}>
              No providers were saved for this repair.
            </Text>
          ) : (
            providers.map((provider, index) => {
              const selected = selectedProviderIndex === index;

              return (
                <TouchableOpacity
                  key={`${getProviderName(provider)}-${index}`}
                  style={[
                    styles.providerCard,
                    selected && styles.providerCardSelected,
                  ]}
                  onPress={() => setSelectedProviderIndex(index)}
                >
                  <View style={styles.checkbox}>
                    {selected ? (
                      <Ionicons
                        name="checkmark"
                        size={18}
                        color={COLORS.secondary}
                      />
                    ) : null}
                  </View>

                  <View style={styles.providerContent}>
                    <Text style={styles.providerName}>
                      {getProviderName(provider)}
                    </Text>

                    <Text style={styles.providerMeta}>
                      {provider?.email || provider?.phone || "Contact unavailable"}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })
          )}
        </View>

        <TouchableOpacity
          disabled={selectedProviderIndex === null}
          style={[
            styles.primaryButton,
            selectedProviderIndex === null && styles.primaryButtonDisabled,
          ]}
         onPress={handleConfirmProvider}
        >
          <Text style={styles.primaryButtonText}>Confirm Provider</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default RepairStatusScreen;