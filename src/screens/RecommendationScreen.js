import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

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

const RecommendationScreen = ({ analysisResult, imageUri }) => {
  const result = analysisResult?.analysis || analysisResult || {};

  const recommendedActions = result.recommendedActions || [];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderText}>Image Preview</Text>
        </View>
      )}

      <View style={styles.card}>
        <Text style={styles.title}>
          {result.detectedIssue || "Repair Issue Detected"}
        </Text>

        <Text style={styles.description}>
          FixBee identified {result.detectedObject || "a repair issue"}.
        </Text>

        <Text style={styles.sectionTitle}>Repair Estimate</Text>

        <View style={styles.estimateRow}>
          <View style={styles.estimateBox}>
            <Text style={styles.estimateLabel}>Severity</Text>
            <Text style={styles.estimateValue}>{result.urgency || "N/A"}</Text>
          </View>

          <View style={styles.estimateBox}>
            <Text style={styles.estimateLabel}>Cost</Text>
            <Text style={styles.estimateValue}>
              {result.estimatedCostRange || "N/A"}
            </Text>
          </View>

          <View style={styles.estimateBox}>
            <Text style={styles.estimateLabel}>Time</Text>
            <Text style={styles.estimateValue}>
              {result.estimatedRepairTime || "N/A"}
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Urgency Note</Text>
        <Text style={styles.description}>
          {result.urgencyDescription || "No urgency details available."}
        </Text>

        <Text style={styles.sectionTitle}>Recommended Actions</Text>

        {recommendedActions.length > 0 ? (
          recommendedActions.map((action, index) => (
            <View key={index} style={styles.actionItem}>
              <Text style={styles.actionText}>{getActionText(action)}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.description}>No actions available.</Text>
        )}

        <Text style={styles.sectionTitle}>Provider Type</Text>
        <Text style={styles.description}>
          {result.providerType || "Not available"}
        </Text>

        <View style={styles.buttonRow}>
          <Pressable style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Find Experts</Text>
          </Pressable>

          <Pressable style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>DIY</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default RecommendationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },

  content: {
    padding: 20,
  },

  image: {
    width: "100%",
    height: 260,
    borderRadius: 4,
    marginBottom: 16,
    backgroundColor: "#D9D9D9",
  },

  imagePlaceholder: {
    width: "100%",
    height: 260,
    borderRadius: 4,
    marginBottom: 16,
    backgroundColor: "#D9D9D9",
    alignItems: "center",
    justifyContent: "center",
  },

  placeholderText: {
    color: "#555555",
    fontSize: 16,
  },

  card: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#D1D1D1",
    borderRadius: 4,
    padding: 16,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#222222",
    marginBottom: 12,
    textTransform: "capitalize",
  },

  description: {
    fontSize: 16,
    color: "#333333",
    lineHeight: 22,
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#222222",
    marginTop: 16,
    marginBottom: 10,
  },

  estimateRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 12,
  },

  estimateBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#D1D1D1",
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#F5F5F5",
  },

  estimateLabel: {
    fontSize: 13,
    color: "#555555",
    marginBottom: 6,
  },

  estimateValue: {
    fontSize: 15,
    fontWeight: "700",
    color: "#222222",
    textTransform: "capitalize",
  },

  actionItem: {
    borderWidth: 1,
    borderColor: "#D1D1D1",
    borderRadius: 4,
    padding: 12,
    marginBottom: 8,
    backgroundColor: "#FFFFFF",
  },

  actionText: {
    fontSize: 16,
    color: "#222222",
  },

  buttonRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
  },

  primaryButton: {
    flex: 1,
    backgroundColor: "#888888",
    paddingVertical: 14,
    borderRadius: 4,
    alignItems: "center",
  },

  primaryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },

  secondaryButton: {
    flex: 1,
    backgroundColor: "#D9D9D9",
    paddingVertical: 14,
    borderRadius: 4,
    alignItems: "center",
  },

  secondaryButtonText: {
    color: "#222222",
    fontSize: 16,
    fontWeight: "700",
  },
});