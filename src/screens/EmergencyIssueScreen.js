import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import UrgencyBadge from "../components/UrgencyBadge/UrgencyBadge";
import RecommendedActionsList from "../components/RecommendedActionsList/RecommendedActionsList";
import UserActionButtons from "../components/UserActionButtons/UserActionButtons";

import {
  RecommendationHeaderShape,
  RecommendationImageOverlay,
} from "../components/shapes/RecommendationShape";

import COLORS from "../constants/colors";
import styles from "./EmergencyIssueScreenStyle";

const getImmediateActions = (userActions) => {
  if (!Array.isArray(userActions)) {
    return [];
  }

  return userActions
    .filter((action) => {
      if (typeof action === "string") {
        return true;
      }

      return action?.actionType !== "MARK_RESOLVED";
    })
    .map((action) => {
      if (typeof action === "string") {
        return action;
      }

      return (
        action?.description ||
        action?.label ||
        action?.title ||
        null
      );
    })
    .filter(Boolean);
};

const EmergencyIssueScreen = ({
  analysisResult,
  imageUri,
  onBack,
  onFindExpertsPress,
}) => {
  const result =
    analysisResult?.analysis ||
    analysisResult ||
    {};

  const displayedImageUri =
    imageUri ||
    analysisResult?.uploadedImageUri ||
    analysisResult?.uploadedImageUrl ||
    result.imageUrl ||
    null;

  const displayedIssue =
    result.detectedIssue ||
    "Repair Issue Detected";

  const displayedDescription =
    result.urgencyDescription ||
    "Avoid interacting with the affected area and contact a qualified professional.";

  const displayedUrgency =
    result.urgency || "N/A";

  const recommendedActions =
    Array.isArray(result.recommendedActions)
      ? result.recommendedActions
      : [];

  const issuesToFix =
    Array.isArray(result.issuesToFix)
      ? result.issuesToFix.filter(Boolean)
      : [];

  const immediateActions =
    getImmediateActions(result.userActions);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <RecommendationHeaderShape
          style={styles.headerShape}
        />

        <Pressable
          onPress={onBack}
          hitSlop={12}
          style={({ pressed }) => [
            styles.backButton,
            pressed
              ? styles.backButtonPressed
              : null,
          ]}
        >
          <Ionicons
            name="chevron-back"
            size={28}
            color={COLORS.secondary}
          />
        </Pressable>

        <Text style={styles.headerTitle}>
          Issue Detected
        </Text>
      </View>

      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={
          styles.scrollContent
        }
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroContainer}>
          {displayedImageUri ? (
            <Image
              source={{
                uri: displayedImageUri,
              }}
              style={styles.heroImage}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Ionicons
                name="image-outline"
                size={42}
                color={COLORS.greyText}
              />

              <Text style={styles.placeholderText}>
                Image Preview
              </Text>
            </View>
          )}

          <RecommendationImageOverlay
            style={styles.heroOverlay}
          />

          <View style={styles.heroTextContainer}>
            <Text style={styles.issueTitle}>
              {displayedIssue}
            </Text>

            <Text style={styles.issueDescription}>
              {displayedDescription}
            </Text>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.riskBadgePosition}>
            <UrgencyBadge
              urgency={displayedUrgency}
            />
          </View>

          <RecommendedActionsList
            title="Recommended Actions"
            actions={recommendedActions}
            emptyMessage="Avoid interacting with the issue and contact a qualified professional."
          />

          {issuesToFix.length > 0 ? (
            <RecommendedActionsList
              title="Issues to Fix"
              actions={issuesToFix}
              emptyMessage="No specific repair issues were returned."
            />
          ) : null}

          <RecommendedActionsList
            title="Immediate Actions"
            actions={immediateActions}
            emptyMessage="Keep away from the affected area and arrange professional assistance."
          />
        </View>
      </ScrollView>

      <View style={styles.bottomActionContainer}>
        <View style={styles.bottomActionContent}>
          <UserActionButtons
            onFindExpertsPress={
              onFindExpertsPress
            }
            showDiy={false}
          />
        </View>
      </View>
    </View>
  );
};

export default EmergencyIssueScreen;