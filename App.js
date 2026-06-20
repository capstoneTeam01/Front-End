import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import AppNavigator from "./src/navigation/AppNavigator";
import { warmUpFixBeeSession } from "./src/bootstrap/appStartupWarmup";

export default function App() {
  useEffect(() => {
    warmUpFixBeeSession({ reason: "app-start" });
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <AppNavigator />
    </SafeAreaProvider>
  );
}
