import React, { useEffect } from "react";
import { View, Text } from "react-native";
import styles from "./SplashScreenStyle";
import { getSavedToken } from "../features/auth/services/authSessionService";

const SPLASH_MIN_MS = 1200;

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    let isMounted = true;

    const decideRoute = async () => {
      const startedAt = Date.now();
      let token = null;

      try {
        token = await getSavedToken();
      } catch (error) {
        console.log("[FixBee][Splash] token check failed", error?.message);
      }

      const elapsed = Date.now() - startedAt;
      const wait = Math.max(0, SPLASH_MIN_MS - elapsed);

      setTimeout(() => {
        if (!isMounted) return;
        navigation.reset({
          index: 0,
          routes: [{ name: token ? "Home" : "Login" }],
        });
      }, wait);
    };

    decideRoute();

    return () => {
      isMounted = false;
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.logoMark} />
      <Text style={styles.wordmark}>
        <Text style={styles.wordmarkFix}>Fix</Text>
        <Text style={styles.wordmarkBee}>Bee</Text>
      </Text>
    </View>
  );
};

export default SplashScreen;
