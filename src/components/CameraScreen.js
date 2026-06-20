import { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  AppState,
  Linking,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { detectIssueRegion } from "../api/detectIssueRegion";
import { COACHING_INSTRUCTIONS, evaluateFocus } from "./evaluateFocus";
import CameraGuidelines from "./CameraGuidelines";
import DetectionHexagon from "./DetectionHexagon";

const SCAN_INTERVAL_MS = 1200;
const SCAN_START_DELAY_MS = 500;
const STABLE_SCANS_REQUIRED = 1;

const CameraScreen = ({ visible, onClose, onCapture }) => {
  const cameraRef = useRef(null);
  const scanInFlightRef = useRef(false);
  const stableFocusCountRef = useRef(0);
  const missedScansRef = useRef(0);
  const hasShownAlertRef = useRef(false);
  const hasRequestedRef = useRef(false);
  const insets = useSafeAreaInsets();
  const [permission, requestPermission, getPermission] = useCameraPermissions();
  const [facing, setFacing] = useState("back");
  const [torchOn, setTorchOn] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [detection, setDetection] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [scanStatus, setScanStatus] = useState(COACHING_INSTRUCTIONS.NO_OBJECT);

  useEffect(() => {
    if (!visible) {
      setFacing("back");
      setTorchOn(false);
      setIsReady(false);
      setIsCapturing(false);
      setIsScanning(false);
      setDetection(null);
      setIsFocused(false);
      stableFocusCountRef.current = 0;
      missedScansRef.current = 0;
      setScanStatus(COACHING_INSTRUCTIONS.NO_OBJECT);
    }
  }, [visible]);

  useEffect(() => {
    if (!visible) {
      hasShownAlertRef.current = false;
      hasRequestedRef.current = false;
      return;
    }

    if (!permission || permission.granted) {
      return;
    }

    if (permission.canAskAgain === false) {
      if (hasShownAlertRef.current) {
        return;
      }

      hasShownAlertRef.current = true;

      const timer = setTimeout(() => {
        Alert.alert(
          "Camera access disabled",
          "Enable camera in Settings to scan issues.",
          [
            { text: "Cancel", style: "cancel", onPress: onClose },
            { text: "Open Settings", onPress: () => Linking.openSettings() },
          ]
        );
      }, 400);

      return () => clearTimeout(timer);
    }

    if (hasRequestedRef.current) {
      return;
    }

    hasRequestedRef.current = true;

    const timer = setTimeout(() => {
      requestPermission();
    }, 400);

    return () => clearTimeout(timer);
  }, [visible, permission, requestPermission, onClose]);

  useEffect(() => {
    if (!visible) {
      return undefined;
    }

    const subscription = AppState.addEventListener("change", (state) => {
      if (state === "active" && getPermission) {
        getPermission();
      }
    });

    return () => subscription.remove();
  }, [visible, getPermission]);

  const runDetectionScan = useCallback(async () => {
    if (
      !visible ||
      !cameraRef.current ||
      !isReady ||
      isCapturing ||
      scanInFlightRef.current
    ) {
      return;
    }

    scanInFlightRef.current = true;
    setIsScanning(true);

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.25,
        base64: true,
        shutterSound: false,
      });

      if (!photo?.base64) {
        setScanStatus("Could not read camera frame");
        return;
      }

      const result = await detectIssueRegion(photo.base64);

      if (result.success && result.issueRegion) {
        const focus = evaluateFocus({
          issueRegion: result.issueRegion,
          brightness: result.brightness,
        });

        if (focus.isFocused) {
          stableFocusCountRef.current += 1;
        } else {
          stableFocusCountRef.current = 0;
        }

        const focused =
          focus.isFocused && stableFocusCountRef.current >= STABLE_SCANS_REQUIRED;

        missedScansRef.current = 0;

        setDetection({
          issueRegion: result.issueRegion,
          detectedObject: result.detectedObject,
        });
        setIsFocused(focused);

        if (focused) {
          setScanStatus(COACHING_INSTRUCTIONS.READY);
        } else if (focus.isFocused) {
          setScanStatus(COACHING_INSTRUCTIONS.HOLD_STEADY);
        } else {
          setScanStatus(focus.message);
        }
        return;
      }

      missedScansRef.current += 1;

      if (missedScansRef.current >= 2) {
        setDetection(null);
        setIsFocused(false);
        stableFocusCountRef.current = 0;
      }

      if (result.message && !result.success) {
        setScanStatus(result.message);
        return;
      }

      const noObjectCoaching = evaluateFocus({
        issueRegion: null,
        brightness: result.brightness,
      });
      setScanStatus(noObjectCoaching.message);
    } catch (error) {
      console.warn("Camera detection scan failed:", error.message);
      setScanStatus(COACHING_INSTRUCTIONS.DETECTION_ERROR);
    } finally {
      scanInFlightRef.current = false;
      setIsScanning(false);
    }
  }, [visible, isReady, isCapturing]);

  useEffect(() => {
    if (!visible || !isReady || !permission?.granted || isCapturing) {
      return undefined;
    }

    let cancelled = false;
    let timeoutId = null;

    const scheduleNextScan = (delayMs) => {
      timeoutId = setTimeout(async () => {
        if (cancelled) {
          return;
        }

        await runDetectionScan();

        if (!cancelled) {
          scheduleNextScan(SCAN_INTERVAL_MS);
        }
      }, delayMs);
    };

    scheduleNextScan(SCAN_START_DELAY_MS);

    return () => {
      cancelled = true;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [visible, isReady, permission?.granted, isCapturing, runDetectionScan]);

  const handleClose = () => {
    if (isCapturing) {
      return;
    }
    onClose();
  };

  const handleCapture = async () => {
    if (!cameraRef.current || isCapturing || !isReady) {
      return;
    }

    setIsCapturing(true);

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        shutterSound: true,
      });

      onCapture({
        uri: photo.uri,
        width: photo.width,
        height: photo.height,
        fileName: `photo-${Date.now()}.jpg`,
        mimeType: "image/jpeg",
      });
    } catch (error) {
      console.error("Camera capture error:", error);
      Alert.alert("Capture failed", "Could not take a photo. Please try again.");
    } finally {
      setIsCapturing(false);
    }
  };

  const handleOpenGallery = async () => {
    if (isCapturing) {
      return;
    }

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Permission required", "Please allow access to your photo library.");
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.8,
      });

      if (result.canceled || !result.assets?.length) {
        return;
      }

      const asset = result.assets[0];
      onCapture({
        uri: asset.uri,
        width: asset.width,
        height: asset.height,
        fileName: asset.fileName || `photo-${Date.now()}.jpg`,
        mimeType: asset.mimeType || "image/jpeg",
      });
    } catch (error) {
      console.error("Gallery picker error:", error);
      Alert.alert("Could not open gallery", "Something went wrong. Please try again.");
    }
  };

  const handleFlipCamera = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
    setTorchOn(false);
  };

  const handleToggleTorch = () => {
    if (facing === "front") {
      return;
    }
    setTorchOn((current) => !current);
  };

  const renderContent = () => {
    if (!permission?.granted) {
      return (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      );
    }

    return (
      <>
        <CameraView
          ref={cameraRef}
          style={StyleSheet.absoluteFill}
          facing={facing}
          enableTorch={torchOn && facing === "back"}
          animateShutter={false}
          onCameraReady={() => setIsReady(true)}
        />
        <View style={styles.tintOverlay} pointerEvents="none" />
        <CameraGuidelines />
        <DetectionHexagon
          detection={detection}
          trackingEnabled={visible && isReady && !isCapturing}
          detectedObject={detection?.detectedObject}
          isFocused={isFocused}
        />

        <View style={[styles.topBar, { paddingTop: insets.top + 10 }]}>
          <Pressable
            style={styles.iconButton}
            onPress={handleClose}
            disabled={isCapturing}
            accessibilityLabel="Go back"
          >
            <Ionicons name="chevron-back" size={22} color="#fff" />
          </Pressable>

          <View style={styles.aiBadge}>
            <View style={[styles.aiDot, isReady && styles.aiDotReady]} />
            <Text style={styles.aiBadgeText}>{isReady ? "AI Ready" : "Starting…"}</Text>
          </View>

          <Pressable
            style={[styles.iconButton, facing === "front" && styles.iconButtonDisabled]}
            onPress={handleToggleTorch}
            disabled={facing === "front" || isCapturing}
            accessibilityLabel="Toggle flash"
          >
            <Ionicons
              name={torchOn ? "flash" : "flash-outline"}
              size={20}
              color="#fff"
            />
          </Pressable>
        </View>

        <View style={[styles.instructionCard, { bottom: insets.bottom + 128 }]}>
          {isScanning ? (
            <ActivityIndicator size="small" color="#fff" style={styles.scanSpinner} />
          ) : null}
          <Text style={styles.instructionPrimary}>
            Center the plumbing issue inside the frame
          </Text>
          <Text style={styles.instructionSecondary}>{scanStatus}</Text>
        </View>

        <View style={[styles.controls, { paddingBottom: insets.bottom + 24 }]}>
          <Pressable
            style={styles.sideButton}
            onPress={handleOpenGallery}
            disabled={isCapturing}
            accessibilityLabel="Open gallery"
          >
            <Ionicons name="images-outline" size={22} color="#fff" />
          </Pressable>

          <Pressable
            style={[
              styles.captureButton,
              (!isReady || isCapturing) && styles.captureDisabled,
            ]}
            onPress={handleCapture}
            disabled={!isReady || isCapturing}
            accessibilityLabel="Take photo"
          >
            {isCapturing ? (
              <ActivityIndicator color="#0f172a" />
            ) : (
              <View style={styles.captureInner} />
            )}
          </Pressable>

          <Pressable
            style={styles.sideButton}
            onPress={handleFlipCamera}
            disabled={isCapturing}
            accessibilityLabel="Flip camera"
          >
            <Ionicons name="camera-reverse-outline" size={22} color="#fff" />
          </Pressable>
        </View>
      </>
    );
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={handleClose}>
      <StatusBar style="light" />
      <View style={styles.container}>{renderContent()}</View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b1224",
  },
  tintOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(11, 18, 36, 0.18)",
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  permissionText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
  },
  permissionButton: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  cancelLink: {
    marginTop: 16,
    padding: 8,
  },
  cancelLinkText: {
    color: "#93c5fd",
    fontWeight: "600",
  },
  topBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(30, 41, 59, 0.72)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  iconButtonDisabled: {
    opacity: 0.45,
  },
  aiBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "rgba(30, 41, 59, 0.78)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  aiDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#64748b",
  },
  aiDotReady: {
    backgroundColor: "#22c55e",
  },
  aiBadgeText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  instructionCard: {
    position: "absolute",
    left: 24,
    right: 24,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: "rgba(15, 23, 42, 0.82)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
  },
  scanSpinner: {
    marginBottom: 8,
  },
  instructionPrimary: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 22,
  },
  instructionSecondary: {
    marginTop: 6,
    color: "#94a3b8",
    fontSize: 13,
    textAlign: "center",
    lineHeight: 18,
  },
  controls: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 36,
  },
  sideButton: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(30, 41, 59, 0.78)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  captureButton: {
    width: 82,
    height: 82,
    borderRadius: 41,
    borderWidth: 5,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  captureDisabled: {
    opacity: 0.5,
  },
  captureInner: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: "#f8fafc",
  },
});

export default CameraScreen;
