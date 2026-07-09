import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts, Rubik_400Regular, Rubik_500Medium } from "@expo-google-fonts/rubik";

import AppNavigator from "./src/navigation/AppNavigator";
import { warmUpFixBeeSession } from "./src/bootstrap/appStartupWarmup";

export default function App() {
  const [fontsLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_500Medium,
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
      <AppNavigator />
    </SafeAreaProvider>
  );
}
