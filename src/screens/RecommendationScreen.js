import { Image, ScrollView, Text, View } from "react-native";

import getEstimateValue from "../utils/getEstimateValue";
import AnalysisResultSummary from "../components/AnalysisResultSummary/AnalysisResultSummary";
import RepairEstimateSection from "../components/RepairEstimateSection/RepairEstimateSection";
import RecommendedActionsList from "../components/RecommendedActionsList/RecommendedActionsList";
import UserActionButtons from "../components/UserActionButtons/UserActionButtons";
import styles from "./RecommendationScreenStyle";

const RecommendationScreen = ({
  analysisResult,
  imageUri,
  onFindExpertsPress,
  onDiyPress,
}) => {
  const result =
    analysisResult?.analysis || analysisResult || {};

  const isLowConfidence =
    result.analysisStatus === "LOW_CONFIDENCE";

  const estimatedCostText = isLowConfidence
    ? "N/A"
    : getEstimateValue(
        result.estimatedCostRange,
        result.costEstimate,
        result.estimatedCost,
        result.costRange
      );

  const estimatedTimeText = isLowConfidence
    ? "N/A"
    : getEstimateValue(
        result.estimatedRepairTime,
        result.repairTimeEstimate,
        result.estimatedTime,
        result.repairTime
      );

  const displayedIssue = isLowConfidence
    ? "Unable to Confirm Repair Issue"
    : result.detectedIssue;

  const displayedObject = isLowConfidence
    ? "N/A"
    : result.detectedObject;

  const displayedUrgency = isLowConfidence
    ? "N/A"
    : result.urgency;

  const displayedDescription = isLowConfidence
    ? result.userMessage ||
      "The image is not clear enough for a reliable repair assessment. Please retake the photo."
    : result.urgencyDescription;

  const handleDiyPress = () => {
    if (isLowConfidence) {
      return;
    }

    if (onDiyPress) {
      onDiyPress();
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.screenTitle}>
        Issue Detected
      </Text>

      {imageUri ? (
        <Image
          source={{ uri: imageUri }}
          style={styles.image}
        />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderText}>
            Image Preview
          </Text>
        </View>
      )}

      <AnalysisResultSummary
        detectedIssue={displayedIssue}
        detectedObject={displayedObject}
        urgency={displayedUrgency}
        urgencyDescription={displayedDescription}
        isEmergency={false}
      />

      <RepairEstimateSection
        urgency={displayedUrgency}
        estimatedCostRange={estimatedCostText}
        estimatedRepairTime={estimatedTimeText}
      />

      <RecommendedActionsList
        title="Recommended Actions"
        actions={result.recommendedActions}
        emptyMessage={
          isLowConfidence
            ? "Retake the photo with better lighting and a clearer view."
            : "No recommended actions available."
        }
      />

      <UserActionButtons
        onFindExpertsPress={onFindExpertsPress}
        onDiyPress={handleDiyPress}
        showDiy={!isLowConfidence}
      />
    </ScrollView>
  );
};

export default RecommendationScreen;