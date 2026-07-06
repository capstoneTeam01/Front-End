import { useCallback } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";

WebBrowser.maybeCompleteAuthSession();

// The backend serves the Google sign-in page and verifies the returned idToken.
const AUTH_PAGE_URL =
  "https://backend-production-6ace.up.railway.app/google-auth.html";

// Deep link the page redirects back to: fixbee://google-auth?id_token=...
const REDIRECT_URL = Linking.createURL("google-auth");

const extractIdToken = (url) => {
  if (!url) return null;
  try {
    const { queryParams } = Linking.parse(url);
    return queryParams?.id_token || null;
  } catch (error) {
    console.log("[FixBee][Auth] could not parse redirect url", error?.message);
    return null;
  }
};

const useGoogleAuth = () => {
  const signIn = useCallback(async () => {
    const result = await WebBrowser.openAuthSessionAsync(
      AUTH_PAGE_URL,
      REDIRECT_URL,
    );

    if (result.type === "cancel" || result.type === "dismiss") {
      return { cancelled: true };
    }

    if (result.type !== "success" || !result.url) {
      throw new Error("Google sign-in was interrupted. Please try again.");
    }

    const idToken = extractIdToken(result.url);
    if (!idToken) {
      throw new Error("Google sign-in did not return an ID token.");
    }

    return { idToken };
  }, []);

  return { signIn, ready: true };
};

export default useGoogleAuth;
