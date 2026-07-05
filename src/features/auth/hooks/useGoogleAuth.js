import { useCallback } from "react";
import { Platform } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

const GOOGLE_CLIENT_IDS = {
  android: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
  ios: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
  web: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
};

const FALLBACK_GOOGLE_CLIENT_ID = "missing-google-client-id.apps.googleusercontent.com";

const getCurrentPlatformClientId = () => {
  if (Platform.OS === "android") return GOOGLE_CLIENT_IDS.android;
  if (Platform.OS === "ios") return GOOGLE_CLIENT_IDS.ios;
  return GOOGLE_CLIENT_IDS.web;
};

const useGoogleAuth = () => {
  const configuredClientId = getCurrentPlatformClientId();
  const isConfigured = Boolean(configuredClientId);

  if (!isConfigured) {
    console.log("[FixBee][Auth] Google sign-in client id missing", {
      platform: Platform.OS,
    });
  }

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    androidClientId:
      GOOGLE_CLIENT_IDS.android ||
      GOOGLE_CLIENT_IDS.web ||
      FALLBACK_GOOGLE_CLIENT_ID,
    iosClientId:
      GOOGLE_CLIENT_IDS.ios || GOOGLE_CLIENT_IDS.web || FALLBACK_GOOGLE_CLIENT_ID,
    webClientId: GOOGLE_CLIENT_IDS.web || FALLBACK_GOOGLE_CLIENT_ID,
  });

  const signIn = useCallback(async () => {
    if (!isConfigured) {
      throw new Error(
        Platform.OS === "android"
          ? "Google sign-in is missing EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID."
          : "Google sign-in is not configured for this platform.",
      );
    }

    const result = await promptAsync();

    if (result?.type === "cancel" || result?.type === "dismiss") {
      return { cancelled: true };
    }

    if (result?.type !== "success") {
      throw new Error(result?.error?.message || "Google sign-in failed.");
    }

    const idToken = result?.params?.id_token || result?.authentication?.idToken;
    if (!idToken) {
      throw new Error("Google sign-in did not return an ID token.");
    }

    return { idToken };
  }, [isConfigured, promptAsync]);

  return { signIn, ready: isConfigured && !!request };
};

export default useGoogleAuth;
