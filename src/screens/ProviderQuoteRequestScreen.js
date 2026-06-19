import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";

import ProviderPlainButton from "../components/ProviderPlainButton";
import { getCurrentUserDisplayName } from "../features/auth/services/currentUserProfileService";
import { loadProvidersByIds } from "../localDb/businessDirectoryProviderLocalDb";
import {
  buildProviderQuoteEmailDraft,
  openProviderQuoteEmailDraft,
} from "../services/providerQuoteEmailService";

const androidTopSpace = Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0;
const bottomButtonSpace = Platform.OS === "android" ? 72 : 20;

const clean = (value) => String(value || "").trim();
const getIssueTitle = (routeParams = {}) => clean(routeParams.fromIssue) || "Repair issue";

const ProviderQuoteRequestScreen = ({ navigation, route }) => {
  const [sending, setSending] = useState(false);
  const selectedProviderIds = useMemo(
    () => (Array.isArray(route?.params?.selectedProviderIds) ? route.params.selectedProviderIds : []),
    [route?.params?.selectedProviderIds]
  );

  const handleOpenDraft = async () => {
    setSending(true);

    try {
      const providers = await loadProvidersByIds(selectedProviderIds);
      const requesterName = await getCurrentUserDisplayName();
      const emailDraft = buildProviderQuoteEmailDraft({
        providers,
        issue: getIssueTitle(route?.params),
        detectedObject: route?.params?.detectedObject,
        urgency: route?.params?.urgency,
        estimatedCostRange: route?.params?.estimatedCostRange,
        estimatedRepairTime: route?.params?.estimatedRepairTime,
        address: route?.params?.address,
        unit: route?.params?.unit,
        city: route?.params?.city,
        date: route?.params?.date,
        time: route?.params?.time,
        notes: route?.params?.notes,
        imageUri: route?.params?.uploadedImageUri,
        uploadedImageUrl: route?.params?.uploadedImageUrl,
        requesterName,
      });

      console.log("[FixBee][QuoteRequest] opening quote draft from review screen", {
        selectedCount: selectedProviderIds.length,
        hasImageLink: Boolean(emailDraft.imageUrl),
      });

      const opened = await openProviderQuoteEmailDraft(emailDraft);
      navigation.navigate("ProviderConfirmation", {
        ...route.params,
        quoteStatus: opened ? "email-draft-opened" : "email-draft-not-opened",
        quoteEmailTo: emailDraft.to,
        quoteEmailCc: emailDraft.cc,
        quoteEmailBcc: emailDraft.bcc,
        quoteEmailSubject: emailDraft.subject,
      });
    } catch (error) {
      Alert.alert("Quote request failed", error.message || "Could not prepare the email draft.");
    } finally {
      setSending(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 12, paddingTop: 12 + androidTopSpace }}>
        <ProviderPlainButton title="Back" onPress={() => navigation.goBack()} />
        <Text>Quote Request</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 12, paddingBottom: 24 }}>
        <Text>Ready to open email draft.</Text>
        <Text>Selected providers: {selectedProviderIds.length}</Text>
      </ScrollView>

      <View style={{ padding: 12, paddingBottom: bottomButtonSpace }}>
        {sending ? <ActivityIndicator /> : <ProviderPlainButton title="Open Email Draft" onPress={handleOpenDraft} />}
      </View>
    </SafeAreaView>
  );
};

export default ProviderQuoteRequestScreen;
