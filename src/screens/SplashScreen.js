import React, { useEffect, useRef } from "react";
import { Animated, Easing, View } from "react-native";
import Svg, { Path } from "react-native-svg";

import COLORS from "../constants/colors";
import { getSavedToken } from "../features/auth/services/authSessionService";
import styles from "./SplashScreenStyle";

const SPLASH_MIN_MS = 1200;
const ANIM_MS = 900;

const HEX_YELLOW = "#FBB800";

const SplashScreen = ({ navigation }) => {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: ANIM_MS,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [progress]);

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
          routes: [{ name: token ? "Home" : "Welcome" }],
        });
      }, wait);
    };

    decideRoute();

    return () => {
      isMounted = false;
    };
  }, [navigation]);

  const backgroundColor = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [COLORS.primary, COLORS.warmCream],
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor }]}>
      <Svg width={84} height={88} viewBox="0 0 84 88" fill="none">
        {/* bottom-center hexagon (bee body) */}
        <Path
          d="M29.037 49.5254C30.2517 48.8249 31.7483 48.8249 32.963 49.5254L46.037 57.0647C47.2517 57.7652 48 59.0597 48 60.4607V75.5393C48 76.9403 47.2517 78.2348 46.037 78.9353L32.963 86.4746C31.7483 87.1751 30.2517 87.1751 29.037 86.4746L15.963 78.9353C14.7483 78.2348 14 76.9403 14 75.5393V60.4607C14 59.0597 14.7483 57.7652 15.963 57.0647L29.037 49.5254Z"
          fill="black"
        />

        {/* bottom-right hexagon */}
        <Path
          d="M60.0557 49.2607C60.6422 48.9136 61.3578 48.9136 61.9443 49.2607L75.0186 56.998C75.6111 57.3488 76 58.0155 76 58.7627V74.2373C76 74.9845 75.6111 75.6512 75.0186 76.002L61.9443 83.7393C61.3578 84.0864 60.6422 84.0864 60.0557 83.7393L46.9814 76.002C46.3889 75.6512 46 74.9845 46 74.2373V58.7627C46 58.0155 46.3889 57.3488 46.9814 56.998L60.0557 49.2607Z"
          fill={HEX_YELLOW}
          stroke="black"
          strokeWidth={4}
        />

        {/* left hexagon */}
        <Path
          d="M16.0557 23.2607C16.6422 22.9136 17.3578 22.9136 17.9443 23.2607L31.0186 30.998C31.6111 31.3488 32 32.0155 32 32.7627V48.2373C32 48.9845 31.6111 49.6512 31.0186 50.002L17.9443 57.7393C17.3578 58.0864 16.6422 58.0864 16.0557 57.7393L2.98145 50.002C2.38894 49.6512 2 48.9845 2 48.2373V32.7627C2 32.0155 2.38894 31.3488 2.98145 30.998L16.0557 23.2607Z"
          fill={HEX_YELLOW}
          stroke="black"
          strokeWidth={4}
        />

        {/* top-center hexagon (bee body) */}
        <Path
          d="M45.037 21.5392C46.2517 20.8203 47.7483 20.8203 48.963 21.5392L62.037 29.2769C63.2517 29.9958 64 31.3244 64 32.7623V48.2377C64 49.6756 63.2517 51.0042 62.037 51.7231L48.963 59.4608C47.7483 60.1797 46.2517 60.1797 45.037 59.4608L31.963 51.7231C30.7483 51.0042 30 49.6756 30 48.2377V32.7623C30 31.3244 30.7483 29.9958 31.963 29.2769L45.037 21.5392Z"
          fill="black"
        />

        {/* antenna */}
        <Path
          d="M81 21.7405L65.963 30.4711C64.7483 31.1763 63.2517 31.1763 62.037 30.4711L48.963 22.8802C47.7483 22.175 47 20.8716 47 19.4611V2"
          stroke="black"
          strokeWidth={4}
          strokeLinecap="round"
        />
      </Svg>
    </Animated.View>
  );
};

export default SplashScreen;
