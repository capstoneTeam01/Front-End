import { useEffect, useState } from "react";
import { Alert } from "react-native";
import * as Device from "expo-device";
import * as ImagePicker from "expo-image-picker";

import { UploadError, uploadPhoto } from "../api/uploadPhoto";
import { analyzeImage } from "../api/analyzeImage";
import {
  AUTH_TOKEN,
  MOCK_UPLOAD_RESULT,
  USE_MOCK_UPLOAD,
} from "../constants/config";
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

  return { url: "mock://upload-success", message: "Image uploaded successfully" };
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

      if (USE_MOCK_UPLOAD) {
        uploadResult = await runMockUpload();
      } else {
        uploadResult = await uploadPhoto(asset, AUTH_TOKEN);
      }

      const photoId = uploadResult.photoId || uploadResult.id;

      const analysisResult = await analyzeImage({
        photoId,
        location: "Vancouver, BC",
      });

      if (onAnalysisComplete) {
        onAnalysisComplete(analysisResult);
      }
    } catch (error) {
      console.error("Upload/analysis error:", error);
      Alert.alert(
        "Upload failed",
        error.message || "Could not upload your photo. Please try again."
      );

      if (onAnalysisError) {
        onAnalysisError();
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
