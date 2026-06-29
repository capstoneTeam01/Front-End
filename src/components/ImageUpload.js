import { useEffect, useState } from "react";
import { Alert } from "react-native";
import * as Device from "expo-device";
import * as ImagePicker from "expo-image-picker";

import { UploadError, uploadPhoto } from "../api/uploadPhoto";
import { analyzeImage } from "../api/analyzeImage";
import {
  MOCK_UPLOAD_RESULT,
  USE_DEMO_ANALYSIS_FALLBACK,
  USE_MOCK_UPLOAD,
} from "../constants/config";
import { buildDemoAnalysisFallback, isNetworkErrorMessage } from "../utils/demoAnalysisFallback";
import CameraScreen from "./CameraScreen";

const runMockUpload = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  if (MOCK_UPLOAD_RESULT === "validation_error") {
    throw new UploadError(
      "Image must be at least 400x400 pixels",
      "VALIDATION_FAILED"
    );
  }

  if (MOCK_UPLOAD_RESULT === "upload_error") {
    throw new UploadError(
      "Upload failed. Please try again.",
      "UPLOAD_FAILED"
    );
  }

  return {
    photoId: `mock-photo-${Date.now()}`,
    uploadedImageUrl: "",
    url: "mock://upload-success",
    message: "Image uploaded successfully",
  };
};

const ImageUpload = ({
  autoOpenCamera = true,
  onAnalysisStart,
  onAnalysisComplete,
  onAnalysisError,
  onDismiss,
}) => {
  const [showCamera, setShowCamera] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (!autoOpenCamera || isUploading) {
      return;
    }

    if (!Device.isDevice) {
      Alert.alert(
        "Camera not available on Simulator",
        "The iOS Simulator does not have a real camera. Use Gallery from the camera screen to pick a test photo, or run the app on a physical iPhone.",
        [
          {
            text: "Use Gallery",
            onPress: () => setShowCamera(true),
          },
          { text: "Cancel", style: "cancel", onPress: () => onDismiss?.() },
        ]
      );
      return;
    }

    setShowCamera(true);
  }, [autoOpenCamera, isUploading, onDismiss]);

  const handleClose = () => {
    if (isUploading) {
      return;
    }

    setShowCamera(false);
    onDismiss?.();
  };

  const processCapture = async (asset) => {
    setShowCamera(false);
    setIsUploading(true);

    if (onAnalysisStart) {
      onAnalysisStart(asset.uri);
    }

    try {
      let uploadResult;
      let analysisResult;

      try {
        if (USE_MOCK_UPLOAD) {
          uploadResult = await runMockUpload();
        } else {
          uploadResult = await uploadPhoto(asset);
        }
      } catch (uploadError) {
        if (USE_DEMO_ANALYSIS_FALLBACK && isNetworkErrorMessage(uploadError)) {
          console.log("[FixBee][Scan] backend upload unavailable; using demo analysis fallback", {
            message: uploadError?.message,
          });

          analysisResult = buildDemoAnalysisFallback({
            imageUri: asset.uri,
            reason: "upload-network-failed",
          });
        } else {
          throw uploadError;
        }
      }

      if (!analysisResult) {
        const photoId = uploadResult.photoId || uploadResult.id;

        if (!photoId) {
          throw new UploadError(
            "Upload worked, but backend did not return a photo ID.",
            "MISSING_PHOTO_ID"
          );
        }

        try {
          analysisResult = await analyzeImage({
            photoId,
            location: "Vancouver, BC",
          });
        } catch (analysisError) {
          if (USE_DEMO_ANALYSIS_FALLBACK && isNetworkErrorMessage(analysisError)) {
            console.log("[FixBee][Scan] backend analysis unavailable; using demo analysis fallback", {
              message: analysisError?.message,
            });

            analysisResult = buildDemoAnalysisFallback({
              imageUri: asset.uri,
              uploadedImageUrl: uploadResult.uploadedImageUrl || uploadResult.url,
              reason: "analysis-network-failed",
            });
          } else {
            throw analysisError;
          }
        }
      }

      if (onAnalysisComplete) {
        onAnalysisComplete({
          ...analysisResult,
            photoId:
    analysisResult?.photoId ||
    analysisResult?.analysis?.photoId ||
    uploadResult?.photoId ||
    uploadResult?.id,
          uploadedImageUri: analysisResult?.uploadedImageUri || asset.uri,
          uploadedImageUrl:
            uploadResult?.uploadedImageUrl ||
            uploadResult?.url ||
            analysisResult?.uploadedImageUrl ||
            analysisResult?.analysis?.uploadedImageUrl,
        });
      }
    } catch (error) {
      console.error("Upload/analysis error:", error);
      Alert.alert(
        "Upload failed",
        error.message || "Could not upload your photo. Please try again."
      );

      if (onAnalysisError) {
        onAnalysisError(error);
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <CameraScreen
      visible={showCamera}
      onClose={handleClose}
      onCapture={processCapture}
    />
  );
};

export default ImageUpload;
