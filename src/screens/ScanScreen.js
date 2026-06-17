import React, { useState } from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import ScreenHeader from "../components/ScreenHeader/ScreenHeader";
import ImageUpload from "../components/ImageUpload";
import AnalyzingScreen from "./AnalyzingScreen";
import RecommendationScreen from "./RecommendationScreen";
import EmergencyIssueScreen from "./EmergencyIssueScreen";
import COLORS from "../constants/colors";
import { SIDE_PADDING } from "../constants/layout";

const STEP = {
  UPLOAD: "upload",
  ANALYZING: "analyzing",
  RECOMMENDATION: "recommendation",
  EMERGENCY: "emergency",
};

const isEmergencyIssue = (analysisResult) => {
  const result = analysisResult?.analysis || analysisResult || {};
  const urgency = String(result.urgency || "").toLowerCase();
  const issue = String(result.detectedIssue || "").toLowerCase();
  const description = String(result.urgencyDescription || "").toLowerCase();

  return (
    urgency.includes("high") ||
    urgency.includes("critical") ||
    urgency.includes("emergency") ||
    urgency.includes("urgent") ||
    issue.includes("electrical hazard") ||
    issue.includes("flood") ||
    issue.includes("burst") ||
    description.includes("immediate professional")
  );
};

const ScanScreen = ({ navigation, route }) => {
  const title = route?.params?.title || "Scan Issue";

  const [step, setStep] = useState(STEP.UPLOAD);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [imageUri, setImageUri] = useState(null);

  const handleAnalysisStart = (uri) => {
    setImageUri(uri);
    setStep(STEP.ANALYZING);
  };

  const handleAnalysisComplete = (result) => {
    setAnalysisResult(result);

    if (isEmergencyIssue(result)) {
      setStep(STEP.EMERGENCY);
      return;
    }

    setStep(STEP.RECOMMENDATION);
  };

  const handleAnalysisError = () => {
    setStep(STEP.UPLOAD);
  };

  const handleBack = () => {
    if (
      step === STEP.RECOMMENDATION ||
      step === STEP.EMERGENCY ||
      step === STEP.ANALYZING
    ) {
      setStep(STEP.UPLOAD);
      return;
    }

    navigation?.goBack();
  };

  const handleFindExpertsPress = () => {
    console.log("Find Experts pressed");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <ScreenHeader
          title={title}
          showBack
          onBack={handleBack}
          onBellPress={() => navigation?.navigate("Notifications")}
        />
      </View>

      {step === STEP.UPLOAD && (
        <ImageUpload
          onAnalysisStart={handleAnalysisStart}
          onAnalysisComplete={handleAnalysisComplete}
          onAnalysisError={handleAnalysisError}
        />
      )}

      {step === STEP.ANALYZING && (
        <AnalyzingScreen onCancel={() => setStep(STEP.UPLOAD)} />
      )}

      {/* Clean up the code below by removing console logs and comments, and ensuring onPress handlers are correctly set. */}
      {step === STEP.RECOMMENDATION && (
        <RecommendationScreen
          analysisResult={analysisResult}
          imageUri={imageUri}
          onFindExpertsPress={handleFindExpertsPress}
          // Todo: why do we have need low urgency here? Should we pass the urgency level to the DIYSolutionScreen and let it decide what to show based on that?
          onDiyPress={() => {
            console.log("DIY pressed, Navigatin to DIYSolutionScreen with analysisResult:", analysisResult, "and urgency:", analysisResult?.analysis?.urgency || "low"  );
            navigation?.navigate("DIYSolution", {
              analysisResult,
              urgency: analysisResult?.analysis?.urgency || "low",
            });
          }}
        />
      )}

      {step === STEP.EMERGENCY && (
        <EmergencyIssueScreen
          analysisResult={analysisResult}
          imageUri={imageUri}
          onFindExpertsPress={handleFindExpertsPress}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    paddingHorizontal: SIDE_PADDING,
    paddingTop: 8,
  },
});

export default ScanScreen;