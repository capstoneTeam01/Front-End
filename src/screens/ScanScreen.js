import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AppHeader from "../components/AppHeader/AppHeader";
import HeaderBellButton from "../components/AppHeader/HeaderBellButton";
import ImageUpload from "../components/ImageUpload";
import AnalyzingScreen from "./AnalyzingScreen";
import RecommendationScreen from "./RecommendationScreen";
import EmergencyIssueScreen from "./EmergencyIssueScreen";
import COLORS from "../constants/colors";
import { SIDE_PADDING } from "../constants/layout";
import { getProviderRouteParamsFromIssue } from "../utils/issueProviderRouteMapper";
import {
  buildLocationRouteParams,
  getCurrentCityFromGps,
  prefetchCurrentLocation,
} from "../utils/locationHelper";
import { DEFAULT_PROVIDER_CITY } from "../utils/providerConstants";

const STEP = {
  UPLOAD: "upload",
  ANALYZING: "analyzing",
  RECOMMENDATION: "recommendation",
  EMERGENCY: "emergency",
};

const isEmergencyIssue = (analysisResult) => {
  const result =
    analysisResult?.analysis || analysisResult || {};

  const urgency = String(
    result.urgency || ""
  ).toLowerCase();

  const issue = String(
    result.detectedIssue || ""
  ).toLowerCase();

  const description = String(
    result.urgencyDescription || ""
  ).toLowerCase();

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
  const title =
    route?.params?.title || "Start New Scan";

  const subtitle = route?.params?.subtitle;

  const openCamera =
    route?.params?.openCamera ?? true;

  const [step, setStep] = useState(STEP.UPLOAD);

  const [analysisResult, setAnalysisResult] =
    useState(null);

  const [imageUri, setImageUri] =
    useState(null);

  const [uploadedImageUrl, setUploadedImageUrl] =
    useState(null);

  const [
    prefetchedLocationInfo,
    setPrefetchedLocationInfo,
  ] = useState(null);

  const [
    resolvingProviderCity,
    setResolvingProviderCity,
  ] = useState(false);

  const showUploadHeader =
    step === STEP.UPLOAD;

  const isResultScreen =
    step === STEP.RECOMMENDATION ||
    step === STEP.EMERGENCY;

  const isFullBleedScreen =
    step === STEP.ANALYZING ||
    isResultScreen;

  const safeAreaEdges = isFullBleedScreen
    ? []
    : ["top", "bottom"];

  const handleAnalysisStart = (uri) => {
    setImageUri(uri);
    setStep(STEP.ANALYZING);

    prefetchCurrentLocation({
      reason: "image-upload-analysis",
    }).then((location) => {
      if (!location) {
        return;
      }

      setPrefetchedLocationInfo(location);

      console.log(
        "[FixBee][Scan] location prefetched during image processing",
        {
          city: location.city,
          streetAddress: location.streetAddress,
          source: location.source,
        }
      );
    });
  };

  const handleAnalysisComplete = (result) => {
    setAnalysisResult(result);

    setUploadedImageUrl(
      result?.uploadedImageUrl ||
        result?.analysis?.uploadedImageUrl ||
        null
    );

    if (
      result?.uploadedImageUri &&
      !imageUri
    ) {
      setImageUri(result.uploadedImageUri);
    }

    const nextStep = isEmergencyIssue(result)
      ? STEP.EMERGENCY
      : STEP.RECOMMENDATION;

    setStep(nextStep);
  };

  const handleAnalysisError = (error) => {
    console.warn(
      "[FixBee][Scan] analysis failed",
      error?.message || error
    );

    setStep(STEP.UPLOAD);
  };

  const handleBack = () => {
    if (step !== STEP.UPLOAD) {
      setStep(STEP.UPLOAD);
      return;
    }

    navigation?.goBack();
  };

  const handleFindExpertsPress = async () => {
    if (resolvingProviderCity) {
      return;
    }

    setResolvingProviderCity(true);

    let providerCity = DEFAULT_PROVIDER_CITY;
    let locationInfo = null;

    try {
      locationInfo =
        prefetchedLocationInfo ||
        (await getCurrentCityFromGps({
          preferCached: true,
          cacheReason: "find-experts",
        }));

      providerCity =
        locationInfo?.city ||
        DEFAULT_PROVIDER_CITY;

      console.log(
        "[FixBee][ProviderRoute] provider city resolved",
        {
          providerCity,
          source:
            locationInfo?.providerCitySource ||
            locationInfo?.source,
        }
      );
    } catch (error) {
      console.log(
        "[FixBee][ProviderRoute] city fallback used",
        {
          fallbackCity: DEFAULT_PROVIDER_CITY,
          error: error?.message,
        }
      );
    }

    const providerRouteParams =
      getProviderRouteParamsFromIssue({
        analysisResult,
        city: providerCity,
        title,
      });

    providerRouteParams.uploadedImageUri =
      imageUri ||
      analysisResult?.uploadedImageUri;

    providerRouteParams.uploadedImageUrl =
      uploadedImageUrl ||
      analysisResult?.uploadedImageUrl;

    providerRouteParams.photoId =
      providerRouteParams.photoId ||
      analysisResult?.photoId ||
      analysisResult?.analysis?.photoId ||
      analysisResult?.scan?.photoId ||
      analysisResult?.data?.photoId ||
      null;

    Object.assign(
      providerRouteParams,
      buildLocationRouteParams(locationInfo)
    );

    providerRouteParams.detectedUserCity =
      providerCity;

    setResolvingProviderCity(false);

    navigation?.navigate(
      "ProviderList",
      providerRouteParams
    );
  };

  return (
    <SafeAreaView
      style={[
        styles.safe,
        isResultScreen
          ? styles.resultScreenSafeArea
          : null,
      ]}
      edges={safeAreaEdges}
    >
      {showUploadHeader ? (
        <AppHeader
          title={title}
          onBack={handleBack}
          titleAlign="left"
          right={
            <HeaderBellButton
              onPress={() => navigation?.navigate("Notifications")}
            />
          }
        />
      ) : null}

      {showUploadHeader && subtitle ? (
        <Text style={styles.subtitle}>{subtitle}</Text>
      ) : null}

      {step === STEP.UPLOAD ? (
        <ImageUpload
          autoOpenCamera={openCamera}
          onAnalysisStart={
            handleAnalysisStart
          }
          onAnalysisComplete={
            handleAnalysisComplete
          }
          onAnalysisError={
            handleAnalysisError
          }
          onDismiss={() =>
            navigation?.goBack()
          }
        />
      ) : null}

      {step === STEP.ANALYZING ? (
        <AnalyzingScreen
          onCancel={() =>
            setStep(STEP.UPLOAD)
          }
        />
      ) : null}

      {step === STEP.RECOMMENDATION ? (
        <RecommendationScreen
          analysisResult={analysisResult}
          imageUri={imageUri}
          onBack={handleBack}
          onNotificationPress={() =>
            navigation?.navigate("Notifications")
          }
          onFindExpertsPress={
            handleFindExpertsPress
          }
          onDiyPress={(diyParams) =>
            navigation?.navigate(
              "DIYSolution",
              diyParams
            )
          }
        />
      ) : null}

      {step === STEP.EMERGENCY ? (
        <EmergencyIssueScreen
          analysisResult={analysisResult}
          imageUri={imageUri}
          onBack={handleBack}
          onNotificationPress={() =>
            navigation?.navigate("Notifications")
          }
          onFindExpertsPress={
            handleFindExpertsPress
          }
        />
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  resultScreenSafeArea: {
    backgroundColor: COLORS.lightHoney,
  },

  subtitle: {
    marginTop: 4,
    marginBottom: 8,
    marginHorizontal: SIDE_PADDING,
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
});

export default ScanScreen;
