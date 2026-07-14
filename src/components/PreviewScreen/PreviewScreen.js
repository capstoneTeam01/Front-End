import {
  ActivityIndicator,
  Image,
  Pressable,
  Text,
  View,
} from "react-native";

import AppHeader from "../AppHeader/AppHeader";
import AuthFooterTray from "../AuthFooterTray/AuthFooterTray";
import COLORS from "../../constants/colors";
import styles from "./PreviewScreenStyle";

const renderPreviewHeader = ({
  onRetake,
  isConfirming,
}) => (
  <View style={styles.headerLayer} pointerEvents="box-none">
    <View style={styles.headerStatusFill} pointerEvents="none" />
    <AppHeader
      title="Preview"
      onBack={onRetake}
      backDisabled={isConfirming}
      style={styles.header}
    />
  </View>
);

const PreviewScreen = ({ photo, onRetake, onConfirm, isConfirming = false }) => {
  if (!photo?.uri) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: photo.uri }} style={styles.image} resizeMode="cover" />

      {renderPreviewHeader({
        onRetake,
        isConfirming,
      })}

      <View style={styles.actionBar}>
        <AuthFooterTray fill={COLORS.warmCream}>
          <View style={styles.actionRow}>
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
                <ActivityIndicator color={COLORS.secondary} />
              ) : (
                <Text style={styles.confirmText}>Confirm</Text>
              )}
            </Pressable>
          </View>
        </AuthFooterTray>
      </View>
    </View>
  );
};

export default PreviewScreen;
