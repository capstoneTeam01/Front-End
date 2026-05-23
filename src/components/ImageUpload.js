import { useState } from "react";
import {
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

const ImageUpload = () => {
  const [image, setImage] = useState(null);

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

  const clearPreview = () => {
    setImage(null);
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

      {image?.uri ? (
        <Text style={styles.hintText}>Preview ready.</Text>
      ) : (
        <Text style={styles.hintText}>Choose a photo from gallery or camera.</Text>
      )}

      {image?.uri ? (
        <Pressable style={styles.clearButton} onPress={clearPreview}>
          <Text style={styles.clearButtonText}>Clear preview</Text>
        </Pressable>
      ) : null}
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
  clearButton: {
    marginTop: 8,
    paddingVertical: 10,
    alignItems: "center",
  },
  clearButtonText: {
    color: "#2563eb",
    fontWeight: "600",
  },
});

export default ImageUpload;
