import Constants from "expo-constants";
import { Platform } from "react-native";

import { API_URL } from "../constants/config";

const getExpoDevHost = () => {
  const hostUri =
    Constants.expoConfig?.hostUri ??
    Constants.expoGoConfig?.debuggerHost ??
    Constants.manifest2?.extra?.expoGo?.debuggerHost ??
    Constants.manifest?.debuggerHost;

  if (!hostUri) {
    return null;
  }

  return hostUri.split(":")[0];
};

const isPlaceholderOrLocal = (url) =>
  !url ||
  url.includes("localhost") ||
  url.includes("127.0.0.1") ||
  url.includes("192.168.x.x");

const resolveApiUrl = () => {
  const configured = (API_URL || "").replace(/\/$/, "");

  if (configured && !isPlaceholderOrLocal(configured)) {
    return configured;
  }

  const expoHost = getExpoDevHost();
  if (expoHost) {
    // This is important for a real phone using Expo Go. 10.0.2.2 only works
    // inside the Android emulator; a physical phone needs the laptop LAN IP.
    return `http://${expoHost}:5000`;
  }

  if (Platform.OS === "android") {
    return "http://10.0.2.2:5000";
  }

  return configured || "http://localhost:5000";
};

export { resolveApiUrl };
