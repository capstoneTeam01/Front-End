import { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";

import ImageUpload from "./src/components/ImageUpload";
import AnalyzingScreen from "./src/screens/AnalyzingScreen";
import RecommendationScreen from "./src/screens/RecommendationScreen";

const SCREEN = {
  UPLOAD: "upload",
  ANALYZING: "analyzing",
  RECOMMENDATION: "recommendation",
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(SCREEN.UPLOAD);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [imageUri, setImageUri] = useState(null);

  const handleAnalysisStart = (selectedImageUri) => {
    setImageUri(selectedImageUri);
    setCurrentScreen(SCREEN.ANALYZING);
  };

  const handleAnalysisComplete = (result) => {
    setAnalysisResult(result);
    setCurrentScreen(SCREEN.RECOMMENDATION);
  };

  const handleAnalysisError = () => {
    setCurrentScreen(SCREEN.UPLOAD);
  };

  return (
    <SafeAreaView style={styles.container}>
      {currentScreen === SCREEN.UPLOAD && (
        <ImageUpload
          onAnalysisStart={handleAnalysisStart}
          onAnalysisComplete={handleAnalysisComplete}
          onAnalysisError={handleAnalysisError}
        />
      )}

      {currentScreen === SCREEN.ANALYZING && <AnalyzingScreen />}

      {currentScreen === SCREEN.RECOMMENDATION && (
        <RecommendationScreen
          analysisResult={analysisResult}
          imageUri={imageUri}
        />
      )}

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});