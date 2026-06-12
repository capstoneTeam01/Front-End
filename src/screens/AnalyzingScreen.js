import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const analysisSteps = [
  "Checking uploaded image",
  "Detecting repair issue",
  "Estimating urgency",
  "Preparing recommendation",
];

const AnalyzingScreen = ({ onCancel }) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.imagePlaceholder} />

        <Text style={styles.title}>Analyzing Issue</Text>

        <Text style={styles.subtitle}>
          Please wait while FixBee checks your repair photo.
        </Text>

        <View style={styles.stepsContainer}>
          {analysisSteps.map((step, index) => (
            <View key={step} style={styles.stepRow}>
              <View style={styles.stepCircle}>
                <Text style={styles.stepNumber}>{index + 1}</Text>
              </View>

              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AnalyzingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
    justifyContent: "center",
  },

  card: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#D1D1D1",
    borderRadius: 4,
    padding: 20,
  },

  imagePlaceholder: {
    height: 140,
    backgroundColor: "#D9D9D9",
    borderRadius: 4,
    marginBottom: 24,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222222",
    textAlign: "center",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    color: "#555555",
    textAlign: "center",
    marginBottom: 24,
  },

  stepsContainer: {
    gap: 14,
    marginBottom: 24,
  },

  stepRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  stepCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#888888",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  stepNumber: {
    color: "white",
    fontWeight: "bold",
  },

  stepText: {
    fontSize: 16,
    color: "#333333",
  },

  cancelButton: {
    backgroundColor: "#888888",
    paddingVertical: 14,
    borderRadius: 4,
    alignItems: "center",
  },

  cancelButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});