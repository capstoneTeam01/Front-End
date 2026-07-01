import { useEffect, useCallback, useState } from "react";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";

const useGoogleAuth = () => {
  const [configured, setConfigured] = useState(false);

  useEffect(() => {
    try {
      GoogleSignin.configure({
        iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
        webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
        offlineAccess: false,
      });
      setConfigured(true);
    } catch (error) {
      console.log("[FixBee][GoogleAuth] configure failed:", error?.message);
    }
  }, []);

  const signIn = useCallback(async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const result = await GoogleSignin.signIn();

      const idToken = result?.data?.idToken || result?.idToken;
      if (!idToken) {
        throw new Error("Google sign-in did not return an ID token.");
      }
      return { idToken };
    } catch (error) {
      if (error?.code === statusCodes.SIGN_IN_CANCELLED) {
        return { cancelled: true };
      }
      console.log(
        "[FixBee][GoogleAuth] signIn error:",
        error?.message,
        error?.code,
      );
      throw error;
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      await GoogleSignin.signOut();
    } catch (error) {
      console.log("[FixBee][GoogleAuth] signOut error:", error?.message);
    }
  }, []);

  return { signIn, signOut, configured };
};

export default useGoogleAuth;
