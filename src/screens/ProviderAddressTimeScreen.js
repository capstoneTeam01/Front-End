import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";

import ProviderPlainButton from "../components/ProviderPlainButton";
import { getCurrentUserDisplayName } from "../features/auth/services/currentUserProfileService";
import { loadProvidersByIds } from "../localDb/businessDirectoryProviderLocalDb";
import {
  buildProviderQuoteEmailDraft,
  openProviderQuoteEmailDraft,
} from "../services/providerQuoteEmailService";
import { getCurrentCityFromGps } from "../utils/locationHelper";

const clean = (value) => String(value || "").trim();

const androidTopSpace = Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0;
const bottomButtonSpace = Platform.OS === "android" ? 72 : 20;

const inputStyle = {
  borderWidth: 1,
  borderColor: "#999",
  padding: 8,
  marginVertical: 6,
};

const getIssueTitle = (routeParams = {}) =>
  clean(routeParams.fromIssue) || clean(routeParams.issueTitle) || "Repair issue";

const ProviderAddressTimeScreen = ({ navigation, route }) => {
  const selectedProviderIds = useMemo(
    () => (Array.isArray(route?.params?.selectedProviderIds) ? route.params.selectedProviderIds : []),
    [route?.params?.selectedProviderIds]
  );
  const selectedProviderNames = Array.isArray(route?.params?.selectedProviderNames)
    ? route.params.selectedProviderNames
    : [];

  const [providers, setProviders] = useState([]);
  const [address, setAddress] = useState("");
  const [unit, setUnit] = useState("");
  const [city, setCity] = useState(clean(route?.params?.city) || "Vancouver");
  const [date, setDate] = useState("Today");
  const [time, setTime] = useState("Morning");
  const [notes, setNotes] = useState("");
  const [locating, setLocating] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    let active = true;

    (async () => {
      const rows = await loadProvidersByIds(selectedProviderIds);
      if (active) setProviders(rows);
      console.log("[FixBee][AddressTime] selected providers loaded", {
        selectedCount: selectedProviderIds.length,
        loadedCount: rows.length,
      });
    })();

    return () => {
      active = false;
    };
  }, [selectedProviderIds.join(",")]);

  const routeCachedAddress = clean(route?.params?.detectedStreetAddress);

  const handleUseCurrentLocation = async () => {
    setLocating(true);
    console.log("[FixBee][AddressTime] use current location pressed");

    // Address stays empty until this button is pressed.
    // Use the cached/prefetched location first, then GPS fallback.
    if (routeCachedAddress) {
      setAddress(routeCachedAddress);
      if (route?.params?.detectedUserCity) setCity(route.params.detectedUserCity);
    }

    try {
      const location = await getCurrentCityFromGps({
        preferCached: true,
        cacheReason: "address-time-use-current-location",
        requireStreetAddress: true,
      });

      const nextAddress = clean(location?.streetAddress) || routeCachedAddress;
      const nextCity = clean(location?.city) || city;

      if (nextAddress) {
        setAddress(nextAddress);
      } else {
        setAddress("");
      }
      if (nextCity) setCity(nextCity);

      console.log("[FixBee][Location] address filled", {
        city: nextCity,
        streetAddress: nextAddress,
        source: location?.source,
      });
    } catch (error) {
      console.log("[FixBee][Location] address fill failed", error?.message);
      if (!routeCachedAddress) {
        Alert.alert("Location unavailable", "Please type the address manually or try again.");
      }
    } finally {
      setLocating(false);
    }
  };

  const handleSendQuoteRequest = async () => {
    if (!clean(address)) {
      Alert.alert("Address required", "Enter the service address or tap Use Current Location.");
      return;
    }

    setSending(true);

    try {
      let safeProviders = providers;
      if (!safeProviders.length) {
        safeProviders = await loadProvidersByIds(selectedProviderIds);
      }

      if (!safeProviders.length && selectedProviderNames.length) {
        safeProviders = selectedProviderNames.map((name, index) => ({
          id: selectedProviderIds[index],
          businessName: name,
        }));
      }

      const requesterName = await getCurrentUserDisplayName();
      const emailDraft = buildProviderQuoteEmailDraft({
        providers: safeProviders,
        issue: getIssueTitle(route?.params),
        detectedObject: route?.params?.detectedObject,
        urgency: route?.params?.urgency,
        estimatedCostRange: route?.params?.estimatedCostRange,
        estimatedRepairTime: route?.params?.estimatedRepairTime,
        address,
        unit,
        city,
        date,
        time,
        notes,
        imageUri: route?.params?.uploadedImageUri,
        uploadedImageUrl: route?.params?.uploadedImageUrl,
        requesterName,
      });

      console.log("[FixBee][QuoteRequest] sending quote request", {
        selectedCount: selectedProviderIds.length,
        to: emailDraft.to,
        cc: emailDraft.cc,
        bccCount: emailDraft.bccList?.length || 0,
        hasImageLink: Boolean(emailDraft.imageUrl),
      });

      const opened = await openProviderQuoteEmailDraft(emailDraft);

      navigation.navigate("ProviderConfirmation", {
        ...route.params,
        address,
        unit,
        city,
        date,
        time,
        notes,
        quoteStatus: opened ? "email-draft-opened" : "email-draft-not-opened",
        quoteEmailTo: emailDraft.to,
        quoteEmailCc: emailDraft.cc,
        quoteEmailBcc: emailDraft.bcc,
        quoteEmailSubject: emailDraft.subject,
      });
    } catch (error) {
      console.log("[FixBee][QuoteRequest] quote request failed", error?.message);
      Alert.alert("Quote request failed", error.message || "Could not prepare the email draft.");
    } finally {
      setSending(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <View style={{ padding: 12, paddingTop: 12 + androidTopSpace }}>
          <ProviderPlainButton title="Back" onPress={() => navigation.goBack()} />
          <Text>Address and Time</Text>
          <Text>Selected providers: {selectedProviderIds.length}</Text>
        </View>

        <ScrollView contentContainerStyle={{ padding: 12, paddingBottom: 24 }} keyboardShouldPersistTaps="handled">
          <Text>Street address</Text>
          <TextInput style={inputStyle} value={address} onChangeText={setAddress} placeholder="Street address" />

          <Text>Unit</Text>
          <TextInput style={inputStyle} value={unit} onChangeText={setUnit} placeholder="Unit / apartment optional" />

          <Text>City</Text>
          <TextInput style={inputStyle} value={city} onChangeText={setCity} placeholder="City" />

          {locating ? <ActivityIndicator /> : <ProviderPlainButton title="Use Current Location" onPress={handleUseCurrentLocation} />}

          <Text>Preferred date</Text>
          <TextInput style={inputStyle} value={date} onChangeText={setDate} placeholder="Preferred date" />

          <Text>Preferred time</Text>
          <TextInput style={inputStyle} value={time} onChangeText={setTime} placeholder="Preferred time" />

          <Text>Notes</Text>
          <TextInput
            style={[inputStyle, { minHeight: 80 }]}
            value={notes}
            onChangeText={setNotes}
            placeholder="Notes"
            multiline
          />
        </ScrollView>

        <View style={{ padding: 12, paddingBottom: bottomButtonSpace }}>
          {sending ? <ActivityIndicator /> : <ProviderPlainButton title="Send Quote Request" onPress={handleSendQuoteRequest} />}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ProviderAddressTimeScreen;
