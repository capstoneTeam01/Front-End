import React from "react";
import {
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import getEstimateValue from "../utils/getEstimateValue";
import AppHeader from "../components/AppHeader/AppHeader";
import AuthFooterTray from "../components/AuthFooterTray/AuthFooterTray";
import UrgencyBadge from "../components/UrgencyBadge/UrgencyBadge";
import RepairEstimateSection from "../components/RepairEstimateSection/RepairEstimateSection";
import RecommendedActionsList from "../components/RecommendedActionsList/RecommendedActionsList";
import UserActionButtons from "../components/UserActionButtons/UserActionButtons";

import {
  RecommendationImageOverlay,
} from "../components/shapes/RecommendationShape";

import COLORS from "../constants/colors";
import styles from "./RecommendationScreenStyle";

const RecommendationScreen = ({
  analysisResult,
  imageUri,
  onBack,
  onNotificationPress,
  onFindExpertsPress,
  onDiyPress,
}) => {
  const result =
    analysisResult?.analysis ||
    analysisResult ||
    {};

  const isLowConfidence =
    result.analysisStatus ===
    "LOW_CONFIDENCE";

  const estimatedCostText =
    isLowConfidence
      ? "N/A"
      : getEstimateValue(
          result.estimatedCostRange,
          result.costEstimate,
          result.estimatedCost,
          result.costRange
        );

  const estimatedTimeText =
    isLowConfidence
      ? "N/A"
      : getEstimateValue(
          result.estimatedRepairTime,
          result.repairTimeEstimate,
          result.estimatedTime,
          result.repairTime
        );

  const displayedIssue =
    isLowConfidence
      ? "Unable to Confirm Repair Issue"
      : result.detectedIssue ||
        "Possible Repair Issue Detected";

  const displayedUrgency =
    isLowConfidence
      ? "N/A"
      : result.urgency || "N/A";

  const displayedDescription =
    isLowConfidence
      ? result.userMessage ||
        "The image is not clear enough for a reliable repair assessment. Please retake the photo."
      : result.urgencyDescription ||
        result.confidenceReason ||
        "FixBee identified a possible repair issue in the uploaded image.";

  const displayedImageUri =
    imageUri ||
    analysisResult?.uploadedImageUri ||
    analysisResult?.uploadedImageUrl ||
    result.imageUrl ||
    null;

  const issuesToFix =
    !isLowConfidence &&
    Array.isArray(result.issuesToFix)
      ? result.issuesToFix.filter((issue) => {
          return (
            typeof issue === "string" &&
            issue.trim() !== ""
          );
        })
      : [];

  const immediateActions = Array.isArray(result.userActions)
    ? result.userActions
        .filter((action) => {
          if (typeof action === "string") return true;
          return action?.actionType !== "MARK_RESOLVED";
        })
        .map((action) => {
          if (typeof action === "string") return action;
          return (
            action?.description ||
            action?.label ||
            action?.title ||
            null
          );
        })
        .filter(Boolean)
    : [];

  const getPhotoId = () => {
    return (
      analysisResult?.photoId ||
      analysisResult?.scan?.photoId ||
      analysisResult?.analysis?.photoId ||
      analysisResult?.data?.photoId ||
      analysisResult?._id ||
      result?.photoId ||
      null
    );
  };

  const handleDiyPress = () => {
    if (isLowConfidence) {
      return;
    }

    onDiyPress?.({
      analysisResult,
      photoId: getPhotoId(),
      urgency: result?.urgency || "Low",
    });
  };

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
              size={80}
            />
          </View>

          <View style={styles.sectionContainer}>
            <RecommendedActionsList
              title="Recommended Actions"
              actions={result.recommendedActions}
              emptyMessage={
                isLowConfidence
                  ? "Retake the photo with better lighting and a clearer view."
                  : "No recommended actions available."
              }
            />
          </View>

          {issuesToFix.length > 0 ? (
            <View style={styles.sectionContainer}>
              <RecommendedActionsList
                title="Issues to Fix"
                actions={issuesToFix}
                emptyMessage="No specific repair issues were returned."
              />
            </View>
          ) : null}

          <View style={styles.sectionContainer}>
            <RecommendedActionsList
              title="Actions"
              actions={immediateActions}
              emptyMessage="Keep the affected area clear and monitor for changes."
            />
          </View>

          <View
            style={
              styles.repairEstimateContainer
            }
          >
            <RepairEstimateSection
              urgency={displayedUrgency}
              estimatedCostRange={
                estimatedCostText
              }
              estimatedRepairTime={
                estimatedTimeText
              }
            />
          </View>
        </View>
      </ScrollView>

      <AppHeader
        title="Issue Detected"
        onBack={onBack}
        right={
          <Ionicons
            name="notifications-outline"
            size={20}
            color={COLORS.secondary}
            onPress={onNotificationPress}
          />
        }
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
            onDiyPress={handleDiyPress}
            showDiy={!isLowConfidence}
            buttonStyle={styles.actionButton}
          />
        </AuthFooterTray>
      </View>
    </View>
  );
};

export default RecommendationScreen;
