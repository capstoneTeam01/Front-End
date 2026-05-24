import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as Device from "expo-device";
import * as ImagePicker from "expo-image-picker";

import { UploadError, uploadPhoto } from "../api/uploadPhoto";
import {
  AUTH_TOKEN,
  MOCK_UPLOAD_RESULT,
  USE_MOCK_UPLOAD,
} from "../constants/config";

const STATUS = {
  IDLE: "idle",
  PREVIEW: "preview",
  UPLOADING: "uploading",
  SUCCESS: "success",
  ERROR: "error",
};

const ERROR_KIND = {
  VALIDATION: "validation",
  UPLOAD: "upload",
};

const getErrorKind = (code) =>
  code === "VALIDATION_FAILED" ? ERROR_KIND.VALIDATION : ERROR_KIND.UPLOAD;

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

const ImageUpload = () => {
  const [status, setStatus] = useState(STATUS.IDLE);
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorKind, setErrorKind] = useState(ERROR_KIND.UPLOAD);

  const requestPermission = async (type) => {
    if (type === "camera") {
      const { status: permissionStatus } =
        await ImagePicker.requestCameraPermissionsAsync();
      return permissionStatus === "granted";
    }

    const { status: permissionStatus } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    return permissionStatus === "granted";
  };

  const pickImage = async (source) => {
    if (source === "camera" && !Device.isDevice) {
      Alert.alert(
        "Camera not available on Simulator",
        "The iOS Simulator does not have a real camera. Use Gallery to pick a test photo, or run the app on a physical iPhone.",
        [
          { text: "Use Gallery", onPress: () => pickImage("gallery") },
          { text: "OK", style: "cancel" },
        ]
      );
      return;
    }

    const hasPermission = await requestPermission(source);

    if (!hasPermission) {
      Alert.alert("Permission required", "Please allow access to continue.");
      return;
    }

    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: source === "gallery",
      quality: 0.8,
    };

    try {
      const result =
        source === "camera"
          ? await ImagePicker.launchCameraAsync(options)
          : await ImagePicker.launchImageLibraryAsync(options);

      if (result.canceled || !result.assets?.length) {
        return;
      }

      setImage(result.assets[0]);
      setErrorMessage("");
      setStatus(STATUS.PREVIEW);
    } catch (error) {
      console.error("Image picker error:", error);
      Alert.alert(
        "Could not open camera",
        Platform.OS === "ios" && !Device.isDevice
          ? "Use Gallery on the Simulator, or test camera on a real device."
          : error.message || "Something went wrong. Please try again."
      );
    }
  };

  const handleUpload = async () => {
    if (!image) {
      return;
    }

    setStatus(STATUS.UPLOADING);
    setErrorMessage("");
    setErrorKind(ERROR_KIND.UPLOAD);

    try {
      if (USE_MOCK_UPLOAD) {
        await runMockUpload();
      } else {
        await uploadPhoto(image, AUTH_TOKEN);
      }

      setStatus(STATUS.SUCCESS);
    } catch (error) {
      const code = error instanceof UploadError ? error.code : "UPLOAD_FAILED";
      setErrorKind(getErrorKind(code));
      setErrorMessage(
        error.message || "Upload failed. Please try again."
      );
      setStatus(STATUS.ERROR);
    }
  };

  const reset = () => {
    setImage(null);
    setErrorMessage("");
    setErrorKind(ERROR_KIND.UPLOAD);
    setStatus(STATUS.IDLE);
  };

  const renderFeedback = () => {
    if (status === STATUS.UPLOADING) {
      return (
        <View style={styles.feedbackBox}>
          <View style={styles.statusRow}>
            <ActivityIndicator size="small" color="#2563eb" />
            <Text style={styles.statusText}>Uploading your photo…</Text>
          </View>
        </View>
      );
    }

    if (status === STATUS.SUCCESS) {
      return (
        <View style={[styles.feedbackBox, styles.successBox]}>
          <Text style={styles.successTitle}>Upload successful</Text>
          <Text style={styles.successText}>
            Your photo was uploaded. You can continue or choose another photo.
          </Text>
        </View>
      );
    }

    if (status === STATUS.ERROR) {
      const isValidation = errorKind === ERROR_KIND.VALIDATION;
      return (
        <View style={[styles.feedbackBox, styles.errorBox]}>
          <Text style={styles.errorTitle}>
            {isValidation ? "Invalid image" : "Upload failed"}
          </Text>
          <Text style={styles.errorText}>{errorMessage}</Text>
          {isValidation ? (
            <Text style={styles.errorHint}>
              Use JPEG, PNG, or WebP under 5MB, between 400×400 and 4096×4096
              pixels.
            </Text>
          ) : (
            <Text style={styles.errorHint}>Please try again in a moment.</Text>
          )}
        </View>
      );
    }

    if (status === STATUS.PREVIEW) {
      return (
        <Text style={styles.hintText}>Preview ready. Tap Upload when you are done.</Text>
      );
    }

    return (
      <Text style={styles.hintText}>Choose a photo from gallery or camera.</Text>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload issue photo</Text>

      <View style={styles.buttonRow}>
        <Pressable style={styles.button} onPress={() => pickImage("gallery")}>
          <Text style={styles.buttonText}>Gallery</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => pickImage("camera")}>
          <Text style={styles.buttonText}>Camera</Text>
        </Pressable>
      </View>

      {image?.uri ? (
        <Image source={{ uri: image.uri }} style={styles.preview} />
      ) : (
        <View style={styles.previewPlaceholder}>
          <Text style={styles.placeholderText}>No image selected</Text>
        </View>
      )}

      {renderFeedback()}

      <Pressable
        style={[styles.uploadButton, !image && styles.disabledButton]}
        onPress={handleUpload}
        disabled={!image || status === STATUS.UPLOADING}
      >
        <Text style={styles.uploadButtonText}>Upload</Text>
      </Pressable>

      {(status === STATUS.SUCCESS || status === STATUS.ERROR) && (
        <Pressable style={styles.resetButton} onPress={reset}>
          <Text style={styles.resetButtonText}>Choose another photo</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  button: {
    flex: 1,
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  preview: {
    width: "100%",
    height: 280,
    borderRadius: 12,
    marginBottom: 12,
  },
  previewPlaceholder: {
    width: "100%",
    height: 280,
    borderRadius: 12,
    backgroundColor: "#f3f4f6",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  placeholderText: {
    color: "#6b7280",
  },
  hintText: {
    color: "#6b7280",
    marginBottom: 12,
    textAlign: "center",
  },
  feedbackBox: {
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  successBox: {
    backgroundColor: "#f0fdf4",
    borderColor: "#86efac",
  },
  errorBox: {
    backgroundColor: "#fef2f2",
    borderColor: "#fecaca",
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  statusText: {
    color: "#2563eb",
    fontWeight: "600",
  },
  successTitle: {
    color: "#15803d",
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 6,
    textAlign: "center",
  },
  successText: {
    color: "#166534",
    textAlign: "center",
    lineHeight: 20,
  },
  errorTitle: {
    color: "#b91c1c",
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 6,
    textAlign: "center",
  },
  errorText: {
    color: "#991b1b",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 6,
  },
  errorHint: {
    color: "#7f1d1d",
    fontSize: 13,
    textAlign: "center",
    lineHeight: 18,
  },
  uploadButton: {
    backgroundColor: "#16a34a",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  disabledButton: {
    opacity: 0.5,
  },
  uploadButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  resetButton: {
    marginTop: 12,
    paddingVertical: 10,
    alignItems: "center",
  },
  resetButtonText: {
    color: "#2563eb",
    fontWeight: "600",
  },
});

export default ImageUpload;
