import React, { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Easing, useWindowDimensions, View } from "react-native";
import Svg, { Path } from "react-native-svg";

import COLORS from "../constants/colors";
import { getSavedToken } from "../features/auth/services/authSessionService";
import styles from "./SplashScreenStyle";

const ANIM_MS = 1400;
const ANIM_DELAY_MS = 280;
const ANIM_HOLD_MS = 400; // brief pause on final cream frame before navigate
const HEX_CORNER_RADIUS = 10;

const BEE_W = 84;
const BEE_H = 88;

// Wing centers in the bee SVG viewBox — where yellow gets sucked
const LEFT_WING = { x: 17, y: 40.5 };
const RIGHT_WING = { x: 61, y: 66.5 };

const lerp = (a, b, t) => a + (b - a) * t;

const lerpPoint = (a, b, t) => ({
  x: lerp(a.x, b.x, t),
  y: lerp(a.y, b.y, t),
});

/** Flat-top hexagon points (matches FixBee hex geometry). */
const hexPoints = (cx, cy, radius) => {
  const pts = [];
  for (let i = 0; i < 6; i += 1) {
    const angle = ((60 * i - 30) * Math.PI) / 180;
    pts.push({
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    });
  }
  return pts;
};

/** Rounded flat-top hexagon path with corner radius. */
const roundedHexPath = (cx, cy, radius, cornerRadius = HEX_CORNER_RADIUS) => {
  const pts = hexPoints(cx, cy, radius);
  const n = pts.length;
  const maxCorner = Math.min(cornerRadius, radius * 0.35);
  if (maxCorner < 0.5) {
    return `M ${pts.map((p) => `${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" L ")} Z`;
  }

  let d = "";
  for (let i = 0; i < n; i += 1) {
    const prev = pts[(i - 1 + n) % n];
    const curr = pts[i];
    const next = pts[(i + 1) % n];

    const len1 = Math.hypot(curr.x - prev.x, curr.y - prev.y);
    const len2 = Math.hypot(next.x - curr.x, next.y - curr.y);
    const r = Math.min(maxCorner, len1 / 2, len2 / 2);

    const p1 = {
      x: curr.x + ((prev.x - curr.x) / len1) * r,
      y: curr.y + ((prev.y - curr.y) / len1) * r,
    };
    const p2 = {
      x: curr.x + ((next.x - curr.x) / len2) * r,
      y: curr.y + ((next.y - curr.y) / len2) * r,
    };

    if (i === 0) {
      d += `M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)}`;
    } else {
      d += ` L ${p1.x.toFixed(2)} ${p1.y.toFixed(2)}`;
    }
    d += ` Q ${curr.x.toFixed(2)} ${curr.y.toFixed(2)} ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
  }

  return `${d} Z`;
};

const SplashScreen = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  const progress = useRef(new Animated.Value(0)).current;
  const [suck, setSuck] = useState(0);

  const beeOrigin = useMemo(
    () => ({
      x: (width - BEE_W) / 2,
      y: (height - BEE_H) / 2,
    }),
    [width, height],
  );

  const leftWing = useMemo(
    () => ({
      x: beeOrigin.x + LEFT_WING.x,
      y: beeOrigin.y + LEFT_WING.y,
    }),
    [beeOrigin],
  );

  const rightWing = useMemo(
    () => ({
      x: beeOrigin.x + RIGHT_WING.x,
      y: beeOrigin.y + RIGHT_WING.y,
    }),
    [beeOrigin],
  );

  // Big enough that the two hexes cover the screen at the start
  const startRadius = useMemo(
    () => Math.hypot(width, height) * 0.72,
    [width, height],
  );

  useEffect(() => {
    let isMounted = true;
    let routeName = null;
    let animDone = false;
    let authDone = false;

    const goNext = () => {
      if (!isMounted || !animDone || !authDone || !routeName) return;
      navigation.reset({
        index: 0,
        routes: [{ name: routeName }],
      });
    };

    const progressId = progress.addListener(({ value }) => setSuck(value));

    Animated.sequence([
      Animated.delay(ANIM_DELAY_MS),
      Animated.timing(progress, {
        toValue: 1,
        duration: ANIM_MS,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        useNativeDriver: false,
      }),
      Animated.delay(ANIM_HOLD_MS),
    ]).start(({ finished }) => {
      if (!finished || !isMounted) return;
      animDone = true;
      goNext();
    });

    (async () => {
      try {
        const token = await getSavedToken();
        routeName = token ? "Home" : "Welcome";
      } catch (error) {
        console.log("[FixBee][Splash] token check failed", error?.message);
        routeName = "Welcome";
      }
      if (!isMounted) return;
      authDone = true;
      goNext();
    })();

    return () => {
      isMounted = false;
      progress.removeListener(progressId);
    };
  }, [navigation, progress]);


  const t = Math.pow(suck, 0.9);
  const radius = startRadius * (1 - t);


  const tlCenter = lerpPoint(
    { x: width * 0.22, y: height * 0.22 },
    leftWing,
    t,
  );
  const brCenter = lerpPoint(
    { x: width * 0.78, y: height * 0.78 },
    rightWing,
    t,
  );

  const yellowTopLeft =
    radius > 1 ? roundedHexPath(tlCenter.x, tlCenter.y, radius) : "";
  const yellowBottomRight =
    radius > 1 ? roundedHexPath(brCenter.x, brCenter.y, radius) : "";

  return (
    <View style={[styles.container, { backgroundColor: COLORS.warmCream }]}>
      <Svg
        width={width}
        height={height}
        style={styles.yellowLayer}
        pointerEvents="none"
      >
        {yellowTopLeft ? (
          <Path d={yellowTopLeft} fill={COLORS.primary} />
        ) : null}
        {yellowBottomRight ? (
          <Path d={yellowBottomRight} fill={COLORS.primary} />
        ) : null}
      </Svg>

      <View style={styles.beeWrap}>
        <Svg width={BEE_W} height={BEE_H} viewBox="0 0 84 88" fill="none">
          <Path
            d="M29.037 49.5254C30.2517 48.8249 31.7483 48.8249 32.963 49.5254L46.037 57.0647C47.2517 57.7652 48 59.0597 48 60.4607V75.5393C48 76.9403 47.2517 78.2348 46.037 78.9353L32.963 86.4746C31.7483 87.1751 30.2517 87.1751 29.037 86.4746L15.963 78.9353C14.7483 78.2348 14 76.9403 14 75.5393V60.4607C14 59.0597 14.7483 57.7652 15.963 57.0647L29.037 49.5254Z"
            fill="black"
          />

          <Path
            d="M60.0557 49.2607C60.6422 48.9136 61.3578 48.9136 61.9443 49.2607L75.0186 56.998C75.6111 57.3488 76 58.0155 76 58.7627V74.2373C76 74.9845 75.6111 75.6512 75.0186 76.002L61.9443 83.7393C61.3578 84.0864 60.6422 84.0864 60.0557 83.7393L46.9814 76.002C46.3889 75.6512 46 74.9845 46 74.2373V58.7627C46 58.0155 46.3889 57.3488 46.9814 56.998L60.0557 49.2607Z"
            fill={COLORS.primary}
            stroke="black"
            strokeWidth={4}
          />

          <Path
            d="M16.0557 23.2607C16.6422 22.9136 17.3578 22.9136 17.9443 23.2607L31.0186 30.998C31.6111 31.3488 32 32.0155 32 32.7627V48.2373C32 48.9845 31.6111 49.6512 31.0186 50.002L17.9443 57.7393C17.3578 58.0864 16.6422 58.0864 16.0557 57.7393L2.98145 50.002C2.38894 49.6512 2 48.9845 2 48.2373V32.7627C2 32.0155 2.38894 31.3488 2.98145 30.998L16.0557 23.2607Z"
            fill={COLORS.primary}
            stroke="black"
            strokeWidth={4}
          />

          <Path
            d="M45.037 21.5392C46.2517 20.8203 47.7483 20.8203 48.963 21.5392L62.037 29.2769C63.2517 29.9958 64 31.3244 64 32.7623V48.2377C64 49.6756 63.2517 51.0042 62.037 51.7231L48.963 59.4608C47.7483 60.1797 46.2517 60.1797 45.037 59.4608L31.963 51.7231C30.7483 51.0042 30 49.6756 30 48.2377V32.7623C30 31.3244 30.7483 29.9958 31.963 29.2769L45.037 21.5392Z"
            fill="black"
          />

          <Path
            d="M81 21.7405L65.963 30.4711C64.7483 31.1763 63.2517 31.1763 62.037 30.4711L48.963 22.8802C47.7483 22.175 47 20.8716 47 19.4611V2"
            stroke="black"
            strokeWidth={4}
            strokeLinecap="round"
          />
        </Svg>
      </View>
    </View>
  );
};

export default SplashScreen;
