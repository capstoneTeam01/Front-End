import { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { StatusBar } from "expo-status-bar";

import { detectIssueRegion } from "../api/detectIssueRegion";
import { COACHING_INSTRUCTIONS, evaluateFocus } from "./evaluateFocus";
import CameraGuidelines from "./CameraGuidelines";
import DetectionHexagon from "./DetectionHexagon";

const SCAN_INTERVAL_MS = 2000;
const STABLE_SCANS_REQUIRED = 1;

const CameraScreen = ({ visible, onClose, onCapture }) => {
  const cameraRef = useRef(null);
  const scanInFlightRef = useRef(false);
  const stableFocusCountRef = useRef(0);
  const [permission, requestPermission] = useCameraPermissions();
  const [isReady, setIsReady] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [detection, setDetection] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [scanStatus, setScanStatus] = useState(COACHING_INSTRUCTIONS.NO_OBJECT);

  useEffect(() => {
    if (!visible) {
      setIsReady(false);
      setIsCapturing(false);
      setIsScanning(false);
      setDetection(null);
      setIsFocused(false);
      stableFocusCountRef.current = 0;
      setScanStatus(COACHING_INSTRUCTIONS.NO_OBJECT);
    }
  }, [visible]);

  useEffect(() => {
    if (!visible || !permission) {
      return;
    }

    if (!permission.granted && permission.canAskAgain) {
      requestPermission();
    }
  }, [visible, permission, requestPermission]);

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
        quality: 0.2,
        base64: true,
        skipProcessing: true,
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

      setDetection(null);
      setIsFocused(false);
      stableFocusCountRef.current = 0;

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

    runDetectionScan();
    const intervalId = setInterval(runDetectionScan, SCAN_INTERVAL_MS);

    return () => clearInterval(intervalId);
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
      onClose();
    } catch (error) {
      console.error("Camera capture error:", error);
      Alert.alert("Capture failed", "Could not take a photo. Please try again.");
    } finally {
      setIsCapturing(false);
    }
  };

  const renderContent = () => {
    if (!permission) {
      return (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      );
    }

    if (!permission.granted) {
      return (
        <View style={styles.centered}>
          <Text style={styles.permissionText}>Camera access is required.</Text>
          <Pressable style={styles.permissionButton} onPress={requestPermission}>
            <Text style={styles.permissionButtonText}>Allow camera</Text>
          </Pressable>
          <Pressable style={styles.cancelLink} onPress={handleClose}>
            <Text style={styles.cancelLinkText}>Cancel</Text>
          </Pressable>
        </View>
      );
    }

    return (
      <>
        <CameraView
          ref={cameraRef}
          style={StyleSheet.absoluteFill}
          facing="back"
          animateShutter={false}
          onCameraReady={() => setIsReady(true)}
        />
        <CameraGuidelines />
        <DetectionHexagon
          issueRegion={detection?.issueRegion}
          detectedObject={detection?.detectedObject}
          isFocused={isFocused}
        />
        <View style={styles.scanHint} pointerEvents="none">
          {isScanning ? <ActivityIndicator size="small" color="#fff" style={styles.scanSpinner} /> : null}
          <Text style={styles.scanHintText}>{scanStatus}</Text>
        </View>
        <View style={styles.controls}>
          <Pressable style={styles.closeButton} onPress={handleClose} disabled={isCapturing}>
            <Text style={styles.closeButtonText}>Cancel</Text>
          </Pressable>
          <Pressable
            style={[
              styles.captureButton,
              isFocused && styles.captureReady,
              (!isReady || isCapturing) && styles.captureDisabled,
            ]}
            onPress={handleCapture}
            disabled={!isReady || isCapturing}
          >
            {isCapturing ? (
              <ActivityIndicator color="#111" />
            ) : (
              <View style={styles.captureInner} />
            )}
          </Pressable>
          <View style={styles.sideSpacer} />
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
    backgroundColor: "#000",
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
  scanHint: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 140,
    alignItems: "center",
  },
  scanSpinner: {
    marginBottom: 8,
  },
  scanHintText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  controls: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 32,
  },
  closeButton: {
    minWidth: 72,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  captureButton: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 4,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  captureReady: {
    borderColor: "#22c55e",
    backgroundColor: "rgba(34, 197, 94, 0.25)",
  },
  captureDisabled: {
    opacity: 0.5,
  },
  captureInner: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#fff",
  },
  sideSpacer: {
    minWidth: 72,
  },
});

export default CameraScreen;
