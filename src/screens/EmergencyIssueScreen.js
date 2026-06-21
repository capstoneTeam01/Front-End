import { Image, ScrollView, Text, View } from "react-native";
import getEstimateValue from "../utils/getEstimateValue";
import AnalysisResultSummary from "../components/AnalysisResultSummary/AnalysisResultSummary";
import RepairEstimateSection from "../components/RepairEstimateSection/RepairEstimateSection";
import RecommendedActionsList from "../components/RecommendedActionsList/RecommendedActionsList";
import UserActionButtons from "../components/UserActionButtons/UserActionButtons";
import styles from "./EmergencyIssueScreenStyle";

const EmergencyIssueScreen = ({
  analysisResult,
  imageUri,
  onFindExpertsPress,
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
        isEmergency={true}
      />

      <RecommendedActionsList
        title="Immediate Actions"
        actions={result.recommendedActions}
        emptyMessage="Avoid interacting with the issue and contact a professional."
      />

      <RepairEstimateSection
        estimatedCostRange={estimatedCostText}
        estimatedRepairTime={estimatedTimeText}
        showSeverity={false}
        showTitle={false}
      />

      <UserActionButtons
        onFindExpertsPress={onFindExpertsPress}
        showDiy={false}
      />
    </ScrollView>
  );
};
export default EmergencyIssueScreen;