import React from "react";
import {
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AppHeader from "../components/AppHeader/AppHeader";
import HeaderBellButton from "../components/AppHeader/HeaderBellButton";
import AuthFooterTray from "../components/AuthFooterTray/AuthFooterTray";
import UrgencyBadge from "../components/UrgencyBadge/UrgencyBadge";
import RecommendedActionsList from "../components/RecommendedActionsList/RecommendedActionsList";
import UserActionButtons from "../components/UserActionButtons/UserActionButtons";

import {
  RecommendationImageOverlay,
} from "../components/shapes/RecommendationShape";

import COLORS from "../constants/colors";
import styles from "./EmergencyIssueScreenStyle";
import {
  capitalizeFirstLetter,
  formatTitle,
} from "../utils/textFormatters";

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
  onNotificationPress,
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
              {formatTitle(displayedIssue)}
            </Text>

            <Text style={styles.issueDescription}>
              {capitalizeFirstLetter(
                displayedDescription
              )}
            </Text>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.riskBadgePosition}>
            <UrgencyBadge
              urgency={displayedUrgency}
              size={80}
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

      <AppHeader
        title="Issue Detected"
        onBack={onBack}
        right={<HeaderBellButton onPress={onNotificationPress} />}
        style={styles.headerContainer}
      />

      <View style={styles.bottomActionContainer}>
        <AuthFooterTray
          fill={COLORS.warmCream}
          style={styles.bottomActionContent}
        >
          <UserActionButtons
            onFindExpertsPress={
              onFindExpertsPress
            }
            showDiy={false}
            buttonStyle={styles.findExpertsButton}
          />
        </AuthFooterTray>
      </View>
    </View>
  );
};

export default EmergencyIssueScreen;
