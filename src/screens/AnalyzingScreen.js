import React, {
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Animated,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AnimatedBeeSvg from "../components/AnimatedBeeSvg";
import AuthFooterTray from "../components/AuthFooterTray/AuthFooterTray";
import HeroHexagon from "../components/HeroHexagon/HeroHexagon";
import HexTile from "../components/HexTile/HexTile";
import COLORS from "../constants/colors";
import { TopBackgroundPattern } from "./AnalyzingScreenShapes";
import styles from "./AnalyzingScreenStyle";

const analysisSteps = [
  "Detecting Issue..",
  "Analyzing Damage..",
  "Estimating Repair Cost..",
  "Finding Repair Solutions..",
];

const STEP_DURATION_MS = 1250;
const ACTIVE_DOT_PULSE_MS = 650;
const FIGMA_FRAME_WIDTH = 402;
const TOP_BACKGROUND_AREA_HEIGHT = 116;
const ANALYSIS_HERO_HEIGHT = 400;
const ANALYSIS_HERO_TO_STEPS_GAP = 16;

const AUTO_COMPLETED_STEP_COUNT =
  analysisSteps.length - 1;

const StepStatusIcon = ({
  isActive,
  isCompleted,
}) => {
  const dotScale = useRef(
    new Animated.Value(1)
  ).current;

  useEffect(() => {
    if (!isActive) {
      dotScale.setValue(1);
      return undefined;
    }

    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(dotScale, {
          toValue: 1.45,
          duration: ACTIVE_DOT_PULSE_MS,
          useNativeDriver: true,
        }),
        Animated.timing(dotScale, {
          toValue: 1,
          duration: ACTIVE_DOT_PULSE_MS,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();

    return () => {
      animation.stop();
      dotScale.setValue(1);
    };
  }, [dotScale, isActive]);

  let backgroundColor = COLORS.warmCream;

  if (isCompleted) {
    backgroundColor = COLORS.lightHoney;
  }

  if (isActive) {
    backgroundColor = COLORS.primary;
  }

  return (
    <View style={styles.statusHexagonContainer}>
      <HexTile
        size={42}
        flatTop={false}
        fill={backgroundColor}
      >
        {isCompleted ? (
          <Ionicons
            name="checkmark"
            size={25}
            color={COLORS.secondary}
          />
        ) : null}

        {isActive ? (
          <Animated.View
            style={[
              styles.activeDot,
              {
                transform: [
                  { scale: dotScale },
                ],
              },
            ]}
          />
        ) : null}
      </HexTile>
    </View>
  );
};

const AnalyzingScreen = ({ onCancel }) => {
  const { width: screenWidth } = useWindowDimensions();
  const layoutScale = screenWidth / FIGMA_FRAME_WIDTH;
  const [
    completedStepCount,
    setCompletedStepCount,
  ] = useState(0);

  useEffect(() => {
    const firstThreeStepsCompleted =
      completedStepCount >=
      AUTO_COMPLETED_STEP_COUNT;

    if (firstThreeStepsCompleted) {
      return;
    }

    const stepTimer = setTimeout(() => {
      setCompletedStepCount(
        (currentCount) => currentCount + 1
      );
    }, STEP_DURATION_MS);

    return () => {
      clearTimeout(stepTimer);
    };
  }, [completedStepCount]);

  return (
    <View style={styles.container}>
      <TopBackgroundPattern
        style={styles.topPattern}
      />

      <View
        style={[
          styles.heroContainer,
          {
            top: TOP_BACKGROUND_AREA_HEIGHT * layoutScale,
            left: 24 * layoutScale,
            width: 354 * layoutScale,
            height: ANALYSIS_HERO_HEIGHT * layoutScale,
          },
        ]}
      >
        <HeroHexagon width={354 * layoutScale}>
          <View style={styles.heroContent}>
            <AnimatedBeeSvg
              source={require("../assets/bee-animations/identifying.svganim")}
              width={141 * layoutScale}
              height={225 * layoutScale}
              style={[
                styles.mascot,
                {
                  top: 28 * layoutScale,
                  left: 106.5 * layoutScale,
                },
              ]}
            />

            <Text
              style={[
                styles.heroTitle,
                { top: 286 * layoutScale },
              ]}
            >
              Analyzing Issue..
            </Text>
          </View>
        </HeroHexagon>
      </View>

      <View
        style={[
          styles.stepsCard,
          {
            top:
              (TOP_BACKGROUND_AREA_HEIGHT +
                ANALYSIS_HERO_HEIGHT +
                ANALYSIS_HERO_TO_STEPS_GAP) *
              layoutScale,
            left: 24 * layoutScale,
            right: 24 * layoutScale,
            minHeight: 238 * layoutScale,
          },
        ]}
      >
        {analysisSteps.map(
          (step, index) => {
            const isCompleted =
              index < completedStepCount;

            const isActive =
              index === completedStepCount;

            return (
              <View
                key={step}
                style={styles.stepRow}
              >
                <StepStatusIcon
                  isActive={isActive}
                  isCompleted={isCompleted}
                />

                <Text style={styles.stepText}>
                  {step}
                </Text>
              </View>
            );
          }
        )}
      </View>

      <AuthFooterTray
        fill={COLORS.warmCream}
        style={styles.bottomArea}
      >
        <Pressable
          onPress={onCancel}
          style={({ pressed }) => [
            styles.cancelButton,
            pressed
              ? styles.cancelButtonPressed
              : null,
          ]}
        >
          <Text style={styles.cancelButtonText}>
            Cancel
          </Text>
        </Pressable>
      </AuthFooterTray>
    </View>
  );
};

export default AnalyzingScreen;
