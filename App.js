import { useEffect } from "react";
import { Text, TextInput } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from "@expo-google-fonts/inter";
import { Rubik_400Regular } from "@expo-google-fonts/rubik";

import AppNavigator from "./src/navigation/AppNavigator";
import { NotificationsProvider } from "./src/context/NotificationsContext";
import { warmUpFixBeeSession } from "./src/bootstrap/appStartupWarmup";
import FONT from "./src/constants/typography";

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.style = [
  Text.defaultProps.style,
  { fontFamily: FONT.regular },
];
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.style = [
  TextInput.defaultProps.style,
  { fontFamily: FONT.regular },
];

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Rubik_400Regular,
  });

  useEffect(() => {
    warmUpFixBeeSession({ reason: "app-start" });
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <NotificationsProvider>
        <AppNavigator />
      </NotificationsProvider>
    </SafeAreaProvider>
  );
}
