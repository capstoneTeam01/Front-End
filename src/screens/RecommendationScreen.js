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
import HeaderBellButton from "../components/AppHeader/HeaderBellButton";
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

const clean = (value) => String(value || "").trim();

const capitalizeFirstLetter = (value) => {
  const text = clean(value);
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : "";
};

const getFirstText = (...values) => {
  for (const value of values) {
    const text = clean(value);
    if (text) return text;
  }

  return "";
};

const getNormalizedStatusText = (result = {}) => {
  return [
    result.analysisStatus,
    result.status,
    result.resultStatus,
    result.issueStatus,
    result.classification,
    result.outcome,
  ]
    .filter(Boolean)
    .map((value) => String(value).toLowerCase())
    .join(" ");
};

const getBackendMessageText = (result = {}) =>
  getFirstText(
    result.userMessage,
    result.message,
    result.displayMessage,
    result.analysisMessage,
    result.description,
    result.confidenceReason,
    result.urgencyDescription
  );

const getBackendTitleText = (result = {}) =>
  getFirstText(
    result.headline,
    result.title,
    result.displayTitle,
    result.userTitle,
    result.resultTitle,
    result.detectedIssue,
    result.issueTitle,
    result.issueName
  );

const getAnalysisPayload = (analysisResult = {}) =>
  analysisResult?.analysis ||
  analysisResult?.data?.analysis ||
  analysisResult?.scan?.analysis ||
  analysisResult?.data ||
  analysisResult?.scan ||
  analysisResult ||
  {};

const isNoIssueResult = (result = {}) => {
  const statusText = getNormalizedStatusText(result);
  const contentText = [
    getBackendTitleText(result),
    getBackendMessageText(result),
    result.detectedObject,
  ]
    .filter(Boolean)
    .map((value) => String(value).toLowerCase())
    .join(" ");

  return (
    statusText.includes("no_issue") ||
    statusText.includes("no issue") ||
    statusText.includes("no_repair") ||
    statusText.includes("no repair") ||
    statusText.includes("nothing_detected") ||
    statusText.includes("nothing detected") ||
    contentText.includes("no issue visible") ||
    contentText.includes("no issue detected") ||
    contentText.includes("no repair issue") ||
    contentText.includes("nothing detected")
  );
};

const isRetakeResult = (result = {}) => {
  const statusText = getNormalizedStatusText(result);
  const messageText = getBackendMessageText(result).toLowerCase();

  return (
    statusText.includes("low_confidence") ||
    statusText.includes("low confidence") ||
    statusText.includes("blurry") ||
    statusText.includes("blurred") ||
    statusText.includes("retake") ||
    statusText.includes("unclear") ||
    messageText.includes("blurry") ||
    messageText.includes("blurred") ||
    messageText.includes("retake") ||
    messageText.includes("not clear enough")
  );
};

const RecommendationScreen = ({
  analysisResult,
  imageUri,
  onBack,
  onNotificationPress,
  onFindExpertsPress,
  onDiyPress,
}) => {
  const result = getAnalysisPayload(analysisResult);

  const isLowConfidence = isRetakeResult(result);
  const isNoIssue = !isLowConfidence && isNoIssueResult(result);
  const isRepairAssessment = !isLowConfidence && !isNoIssue;
  const backendTitleText = getBackendTitleText(result);
  const backendMessageText = getBackendMessageText(result);

  const estimatedCostText =
    !isRepairAssessment
      ? "N/A"
      : getEstimateValue(
          result.estimatedCostRange,
          result.costEstimate,
          result.estimatedCost,
          result.costRange
        );

  const estimatedTimeText =
    !isRepairAssessment
      ? "N/A"
      : getEstimateValue(
          result.estimatedRepairTime,
          result.repairTimeEstimate,
          result.estimatedTime,
          result.repairTime
        );

  const displayedIssue =
    capitalizeFirstLetter(
      backendTitleText ||
        backendMessageText ||
        (isLowConfidence
          ? "Unable to Confirm Repair Issue"
          : isNoIssue
            ? "No Issue Detected"
            : "Possible Repair Issue Detected")
    );

  const displayedUrgency =
    !isRepairAssessment
      ? "N/A"
      : result.urgency || "N/A";

  const displayedDescription =
    isLowConfidence
      ? capitalizeFirstLetter(
          backendTitleText
            ? backendMessageText
            : ""
        ) ||
        "The image is not clear enough for a reliable repair assessment. Please retake the photo."
      : isNoIssue
        ? capitalizeFirstLetter(
            backendTitleText
              ? backendMessageText
              : ""
          ) ||
          "No visible repair issue was detected in this image."
        : capitalizeFirstLetter(
            result.urgencyDescription ||
              result.confidenceReason ||
              backendMessageText ||
              "FixBee identified a possible repair issue in the uploaded image."
          );

  const resultActionMessage =
    isLowConfidence
      ? "Retake the photo with better lighting and a clearer view."
      : isNoIssue
        ? "No repair action is needed for this scan."
        : "No recommended actions available.";

  const displayedImageUri =
    imageUri ||
    analysisResult?.uploadedImageUri ||
    analysisResult?.uploadedImageUrl ||
    result.imageUrl ||
    null;

  const issuesToFix =
    isRepairAssessment &&
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
    if (!isRepairAssessment) {
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
                resultActionMessage
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

          {immediateActions.length > 0 || isRepairAssessment ? (
            <View style={styles.sectionContainer}>
              <RecommendedActionsList
                title="Actions"
                actions={immediateActions}
                emptyMessage="Keep the affected area clear and monitor for changes."
              />
            </View>
          ) : null}

          {isRepairAssessment ? (
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
          ) : null}
        </View>
      </ScrollView>

      <AppHeader
        title={
          isRepairAssessment
            ? "Issue Detected"
            : "Scan Result"
        }
        onBack={onBack}
        right={
          <HeaderBellButton onPress={onNotificationPress} />
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
              isRepairAssessment
                ? onFindExpertsPress
                : onBack
            }
            onDiyPress={handleDiyPress}
            findExpertsLabel={
              isRepairAssessment
                ? "Find Experts"
                : "Retake Photo"
            }
            showDiy={isRepairAssessment}
            buttonStyle={styles.actionButton}
          />
        </AuthFooterTray>
      </View>
    </View>
  );
};

export default RecommendationScreen;
