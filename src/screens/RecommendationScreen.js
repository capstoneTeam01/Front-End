import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import UrgencyBadge from "../components/UrgencyBadge/UrgencyBadge";

import RepairEstimateSection from "../components/RepairEstimateSection/RepairEstimateSection";

const getEstimateValue = (...values) => {
  const match = values
    .map((value) => String(value || "").trim())
    .find((value) => value && value.toLowerCase() !== "null" && value.toLowerCase() !== "undefined" && value.toUpperCase() !== "N/A");

  return match || "N/A";
};

const getActionText = (action) => {
  if (typeof action === "string") {
    return action;
  }

  return (
    action.label ||
    action.title ||
    action.type ||
    action.action ||
    "Recommended action"
  );
};

const formatIssueTitle = (issue) => {
  if (!issue) {
    return "Repair Issue Detected";
  }

  return issue.toLowerCase().includes("detected")
    ? issue
    : `${issue} Detected`;
};

const RecommendationScreen = ({
  analysisResult,
  imageUri,
  onFindExpertsPress,
  onDiyPress,
}) => {
  const result = analysisResult?.analysis || analysisResult || {};
  const recommendedActions = result.recommendedActions || [];
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
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.screenTitle}>Issue Detected</Text>

      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderText}>Image Preview</Text>
        </View>
      )}

      <View style={styles.summaryCard}>
        <Text style={styles.issueTitle}>
          {formatIssueTitle(result.detectedIssue)}
        </Text>

        <Text style={styles.issueDescription}>
          {result.urgencyDescription ||
            `FixBee identified signs of ${result.detectedObject || "a repair issue"}.`}
        </Text>

        <UrgencyBadge urgency={result.urgency} />

      </View>

      <RepairEstimateSection
        urgency={result.urgency}
        estimatedCostRange={result.estimatedCostRange}
        estimatedRepairTime={result.estimatedRepairTime}
      />

      <Text style={styles.sectionTitle}>Recommended Actions</Text>

      <View style={styles.actionsCard}>
        {recommendedActions.length > 0 ? (
          recommendedActions.map((action, index) => (
            <View key={index} style={styles.actionItem}>
              <Text style={styles.actionText}>{getActionText(action)}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>No recommended actions available.</Text>
        )}
      </View>

      <View style={styles.buttonRow}>
        <Pressable style={styles.primaryButton} onPress={onFindExpertsPress}>
          <Text style={styles.primaryButtonText}>Find Experts</Text>
        </Pressable>

        <Pressable style={styles.secondaryButton} onPress={onDiyPress}>
          <Text style={styles.secondaryButtonText}>DIY</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default RecommendationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 28,
  },

  screenTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#222222",
    textAlign: "center",
    marginBottom: 16,
  },

  image: {
    width: "100%",
    height: 230,
    borderRadius: 22,
    marginBottom: 16,
    backgroundColor: "#D9D9D9",
  },

  imagePlaceholder: {
    width: "100%",
    height: 230,
    borderRadius: 22,
    marginBottom: 16,
    backgroundColor: "#D9D9D9",
    alignItems: "center",
    justifyContent: "center",
  },

  placeholderText: {
    color: "#555555",
    fontSize: 15,
  },

  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E1E1E1",
    borderRadius: 18,
    padding: 16,
    marginBottom: 18,
  },

  issueTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#222222",
    marginBottom: 8,
    textTransform: "capitalize",
  },

  issueDescription: {
    fontSize: 15,
    color: "#555555",
    lineHeight: 22,
    marginBottom: 14,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#222222",
    marginBottom: 10,
  },

  actionsCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E1E1E1",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 24,
  },

  actionItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EFEFEF",
  },

  actionText: {
    fontSize: 15,
    color: "#222222",
    fontWeight: "500",
  },

  emptyText: {
    fontSize: 15,
    color: "#666666",
    padding: 16,
  },

  buttonRow: {
    flexDirection: "row",
    gap: 12,
  },

  primaryButton: {
    flex: 1,
    height: 52,
    borderRadius: 14,
    backgroundColor: "#8B8B8B",
    alignItems: "center",
    justifyContent: "center",
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  secondaryButton: {
    flex: 1,
    height: 52,
    borderRadius: 14,
    backgroundColor: "#E1E1E1",
    alignItems: "center",
    justifyContent: "center",
  },

  secondaryButtonText: {
    color: "#222222",
    fontSize: 16,
    fontWeight: "700",
  },
});