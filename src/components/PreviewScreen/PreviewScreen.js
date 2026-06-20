import { ActivityIndicator, Image, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import styles from "./PreviewScreenStyle";

const PreviewScreen = ({ photo, onRetake, onConfirm, isConfirming = false }) => {
  const insets = useSafeAreaInsets();

  if (!photo?.uri) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: photo.uri }} style={styles.image} resizeMode="cover" />

      <View style={[styles.actionBar, { paddingBottom: insets.bottom + 24 }]}>
          <Pressable
            style={styles.retakeButton}
            onPress={onRetake}
            disabled={isConfirming}
            accessibilityLabel="Retake photo"
          >
            <Text style={styles.retakeText}>Retake</Text>
          </Pressable>

          <Pressable
            style={[styles.confirmButton, isConfirming && styles.confirmButtonDisabled]}
            onPress={onConfirm}
            disabled={isConfirming}
            accessibilityLabel="Confirm photo"
          >
            {isConfirming ? (
              <ActivityIndicator color="#0A0A0A" />
            ) : (
              <Text style={styles.confirmText}>Confirm</Text>
            )}
          </Pressable>
      </View>
    </View>
  );
};

export default PreviewScreen;
