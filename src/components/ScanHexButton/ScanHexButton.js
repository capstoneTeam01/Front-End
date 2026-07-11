import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";

import ScanIcon from "../../../assets/icons/Scan_Icon.svg";
import COLORS from "../../constants/colors";
import PolygonAsset from "../PolygonAsset";
import styles from "./ScanHexButtonStyle";

const PULSE_OUT_MS = 700;
const PULSE_IN_MS = 700;
const PULSE_PAUSE_MS = 550;

const ScanHexButton = ({ onPress, size = 87, pulse = true }) => {
  const glowScale = useRef(new Animated.Value(1)).current;
  const glowOpacity = useRef(new Animated.Value(0.7)).current;

  useEffect(() => {
    if (!pulse) {
      glowScale.setValue(1);
      glowOpacity.setValue(0);
      return undefined;
    }

    const animation = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(glowScale, {
            toValue: 1.16,
            duration: PULSE_OUT_MS,
            useNativeDriver: true,
          }),
          Animated.timing(glowOpacity, {
            toValue: 0.4,
            duration: PULSE_OUT_MS,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(glowScale, {
            toValue: 1,
            duration: PULSE_IN_MS,
            useNativeDriver: true,
          }),
          Animated.timing(glowOpacity, {
            toValue: 0.7,
            duration: PULSE_IN_MS,
            useNativeDriver: true,
          }),
        ]),
        Animated.delay(PULSE_PAUSE_MS),
      ])
    );

    animation.start();

    return () => {
      animation.stop();
      glowScale.setValue(1);
      glowOpacity.setValue(0.7);
    };
  }, [glowOpacity, glowScale, pulse]);

  return (
    <View style={[styles.wrap, { width: size }]}>
      {pulse ? (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.glow,
            {
              opacity: glowOpacity,
              transform: [{ scale: glowScale }],
            },
          ]}
        >
          <PolygonAsset
            variant="polygon4"
            width={size}
            fill={COLORS.primary}
          />
        </Animated.View>
      ) : null}

      <PolygonAsset
        variant="polygon4"
        width={size}
        fill={COLORS.primary}
        onPress={onPress}
        accessibilityLabel="Scan an issue"
      >
        <ScanIcon width={26} height={26} color={COLORS.secondary} />
      </PolygonAsset>
    </View>
  );
};

export default ScanHexButton;
