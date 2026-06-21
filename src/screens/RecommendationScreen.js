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
  const result = analysisResult?.analysis || analysisResult || {};

  const estimatedCostText = getEstimateValue(
    result.estimatedCostRange,
    result.costEstimate,
    result.estimatedCost,
    result.costRange
  );

  const estimatedTimeText = getEstimateValue(
    result.estimatedRepairTime,
    result.repairTimeEstimate,
    result.estimatedTime,
    result.repairTime
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.screenTitle}>Issue Detected</Text>

      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderText}>Image Preview</Text>
        </View>
      )}

      <AnalysisResultSummary
        detectedIssue={result.detectedIssue}
        detectedObject={result.detectedObject}
        urgency={result.urgency}
        urgencyDescription={result.urgencyDescription}
        isEmergency={false}
      />

      <RepairEstimateSection
        urgency={result.urgency}
        estimatedCostRange={estimatedCostText}
        estimatedRepairTime={estimatedTimeText}
      />

      <RecommendedActionsList
        title="Recommended Actions"
        actions={result.recommendedActions}
        emptyMessage="No recommended actions available."
      />

      <UserActionButtons
        onFindExpertsPress={onFindExpertsPress}
        onDiyPress={onDiyPress}
        showDiy={true}
      />
    </ScrollView>
  );
};

export default RecommendationScreen;