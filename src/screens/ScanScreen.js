import React, { useState } from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import ScreenHeader from "../components/ScreenHeader/ScreenHeader";
import ImageUpload from "../components/ImageUpload";
import AnalyzingScreen from "./AnalyzingScreen";
import RecommendationScreen from "./RecommendationScreen";
import COLORS from "../constants/colors";
import { SIDE_PADDING } from "../constants/layout";

const STEP = {
  UPLOAD: "upload",
  ANALYZING: "analyzing",
  RECOMMENDATION: "recommendation",
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
    setStep(STEP.RECOMMENDATION);
  };

  const handleAnalysisError = () => {
    setStep(STEP.UPLOAD);
  };

  const handleBack = () => {
    if (step === STEP.RECOMMENDATION || step === STEP.ANALYZING) {
      setStep(STEP.UPLOAD);
      return;
    }
    navigation?.goBack();
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

      {step === STEP.RECOMMENDATION && (
        <RecommendationScreen
          analysisResult={analysisResult}
          imageUri={imageUri}
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
