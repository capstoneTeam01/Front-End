import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import HexTile from "../components/HexTile/HexTile";
import COLORS from "../constants/colors";
import {
  AnalysisHeroHexagon,
  BottomActionBackground,
  TopBackgroundPattern,
} from "./AnalyzingScreenShapes";
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
          <ActivityIndicator
            size="small"
            color={COLORS.secondary}
          />
        ) : null}
      </HexTile>
    </View>
  );
};

const AnalyzingScreen = ({ onCancel }) => {
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

      <View style={styles.content}>
        <View style={styles.heroContainer}>
          <AnalysisHeroHexagon
            style={styles.heroGraphic}
          />

          <View style={styles.heroContent}>
            <View
              style={styles.userHexagonContainer}
            >
              <HexTile
                size={78}
                flatTop={false}
                fill={COLORS.lightHoney}
              >
                <Ionicons
                  name="person-outline"
                  size={42}
                  color={COLORS.secondary}
                  style={styles.userIcon}
                />
              </HexTile>
            </View>

            <Text style={styles.heroTitle}>
              Analyzing Issue
            </Text>
          </View>
        </View>

        <View style={styles.stepsCard}>
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
      </View>

      <View style={styles.bottomArea}>
        <BottomActionBackground
          style={styles.bottomBackground}
        />

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
      </View>
    </View>
  );
};

export default AnalyzingScreen;