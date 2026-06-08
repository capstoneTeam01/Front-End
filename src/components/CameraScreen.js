import { useEffect, useRef, useState } from "react";
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

import CameraGuidelines from "./CameraGuidelines";

const CameraScreen = ({ visible, onClose, onCapture }) => {
  const cameraRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [isReady, setIsReady] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);

  useEffect(() => {
    if (!visible) {
      setIsReady(false);
      setIsCapturing(false);
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
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.8 });

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
          onCameraReady={() => setIsReady(true)}
        />
        <CameraGuidelines />
        <View style={styles.controls}>
          <Pressable style={styles.closeButton} onPress={handleClose} disabled={isCapturing}>
            <Text style={styles.closeButtonText}>Cancel</Text>
          </Pressable>
          <Pressable
            style={[styles.captureButton, (!isReady || isCapturing) && styles.captureDisabled]}
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
