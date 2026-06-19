import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const analysisSteps = [
  "Detecting issue...",
  "Analyzing damage...",
  "Estimating repair cost...",
  "Finding repair solutions...",
];

const AnalyzingScreen = ({ onCancel }) => {
  return (
    <View style={styles.container}>
      <View style={styles.heroPlaceholder}>
        <View style={styles.logoBox} />
      </View>

      <Text style={styles.title}>Analyzing Issue</Text>

      <Text style={styles.subtitle}>
        FixBee is identifying the problem and preparing repair guidance.
      </Text>

      <View style={styles.stepsCard}>
        {analysisSteps.map((step, index) => {
          const isLastStep = index === analysisSteps.length - 1;

          return (
            <View key={step} style={styles.stepRow}>
              <View style={[styles.stepIcon, isLastStep && styles.activeStepIcon]}>
                {isLastStep ? (
                  <ActivityIndicator size="small" color="#333333" />
                ) : (
                  <Text style={styles.checkText}>✓</Text>
                )}
              </View>

              <Text style={styles.stepText}>{step}</Text>
            </View>
          );
        })}
      </View>

      <Text style={styles.helperText}>This may take a few seconds.</Text>

      <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AnalyzingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    paddingHorizontal: 24,
    justifyContent: "center",
  },

  heroPlaceholder: {
    height: 150,
    backgroundColor: "#EFEFEF",
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },

  logoBox: {
    width: 56,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#D8D8D8",
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1F1F1F",
    textAlign: "center",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 15,
    color: "#666666",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
  },

  stepsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E2E2E2",
    overflow: "hidden",
    marginBottom: 18,
  },

  stepRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EFEFEF",
  },

  stepIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#222222",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  activeStepIcon: {
    backgroundColor: "#EFEFEF",
  },

  checkText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },

  stepText: {
    fontSize: 15,
    color: "#333333",
    fontWeight: "500",
  },

  helperText: {
    fontSize: 14,
    color: "#777777",
    textAlign: "center",
    marginBottom: 22,
  },

  cancelButton: {
    height: 52,
    borderRadius: 14,
    backgroundColor: "#8B8B8B",
    alignItems: "center",
    justifyContent: "center",
  },

  cancelButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});