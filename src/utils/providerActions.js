import { Alert, Linking } from "react-native";

const openUrl = async (url, fallbackMessage) => {
  try {
    const canOpen = await Linking.canOpenURL(url);
    if (!canOpen) {
      Alert.alert("Could not open", fallbackMessage || "This action is not available on this device.");
      return false;
    }
    await Linking.openURL(url);
    return true;
  } catch (error) {
    Alert.alert("Could not open", error.message);
    return false;
  }
};

export const callProvider = (provider) => {
  const phone = provider?.phoneNormalized || provider?.phoneDisplay;
  if (!phone) {
    Alert.alert("Phone unavailable", "This provider does not have a phone number yet.");
    return false;
  }

  const cleanPhone = String(phone).replace(/[^+\d]/g, "");
  return openUrl(`tel:${cleanPhone}`, "Phone calls are not available on this device.");
};

export const openProviderWebsite = (provider) => {
  const website = provider?.websiteUrl || provider?.listingUrl;
  if (!website) {
    Alert.alert("Website unavailable", "This provider does not have a website yet.");
    return false;
  }

  const url = website.startsWith("http") ? website : `https://${website}`;
  return openUrl(url, "Web browser is not available on this device.");
};

export const openProviderMap = (provider) => {
  const hasCoordinates = provider?.latitude && provider?.longitude;
  const query = hasCoordinates
    ? `${provider.latitude},${provider.longitude}`
    : provider?.address || provider?.businessName;

  if (!query) {
    Alert.alert("Map unavailable", "This provider does not have a map location yet.");
    return false;
  }

  const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  return openUrl(url, "Maps are not available on this device.");
};
