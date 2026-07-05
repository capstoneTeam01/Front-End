import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import getEstimateValue from "../utils/getEstimateValue";
import UrgencyBadge from "../components/UrgencyBadge/UrgencyBadge";
import RepairEstimateSection from "../components/RepairEstimateSection/RepairEstimateSection";
import RecommendedActionsList from "../components/RecommendedActionsList/RecommendedActionsList";
import UserActionButtons from "../components/UserActionButtons/UserActionButtons";

import {
  RecommendationImageOverlay,
  RecommendationHeaderShape,

} from "../components/shapes/RecommendationShape";

import COLORS from "../constants/colors";
import styles from "./RecommendationScreenStyle";

const RecommendationScreen = ({
  analysisResult,
  imageUri,
  onBack,
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
        contentContainerStyle={styles.scrollContent}
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

          <View style={styles.repairEstimateContainer}>
            <RepairEstimateSection
              urgency={displayedUrgency}
              estimatedCostRange={estimatedCostText}
              estimatedRepairTime={estimatedTimeText}
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomActionContainer}>
        <View style={styles.bottomActionContent}>
          <UserActionButtons
            onFindExpertsPress={onFindExpertsPress}
            onDiyPress={handleDiyPress}
            showDiy={!isLowConfidence}
          />
        </View>
      </View>
    </View>
  );
};

export default RecommendationScreen;