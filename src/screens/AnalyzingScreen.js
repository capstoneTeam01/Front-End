import React, { useEffect, useState } from "react";
import {
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import OnboardingIdentifying from "../components/Mascot/OnboardingIdentifying.svg";
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

// The first three steps complete automatically.
// The fourth step keeps loading until this screen is replaced.
const AUTO_COMPLETED_STEP_COUNT =
  analysisSteps.length - 1;

const StepStatusIcon = ({
  isActive,
  isCompleted,
}) => {
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
          <View style={styles.activeDot} />
        ) : null}
      </HexTile>
    </View>
  );
};

const AnalyzingScreen = ({ onCancel }) => {
  const { width: screenWidth } = useWindowDimensions();
  const layoutScale = screenWidth / 402;
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
            top: 100 * layoutScale,
            left: 24 * layoutScale,
            width: 354 * layoutScale,
            height: 400 * layoutScale,
          },
        ]}
      >
        <HeroHexagon width={354 * layoutScale}>
          <View style={styles.heroContent}>
            <OnboardingIdentifying
              width={134 * layoutScale}
              height={225 * layoutScale}
              style={[
                styles.mascot,
                {
                  top: 28 * layoutScale,
                  left: 110 * layoutScale,
                },
              ]}
            />

            <Text
              style={[
                styles.heroTitle,
                { top: 244 * layoutScale },
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
            top: 516 * layoutScale,
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
