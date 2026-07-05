import { useCallback } from "react";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

const useGoogleAuth = () => {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  });

  const signIn = useCallback(async () => {
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
  }, [promptAsync]);

  return { signIn, ready: !!request };
};

export default useGoogleAuth;