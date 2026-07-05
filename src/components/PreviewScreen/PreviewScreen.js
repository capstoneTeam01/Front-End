import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFonts, Rubik_400Regular } from "@expo-google-fonts/rubik";

import AppHeader, { ShapedBackground } from "../AppHeader/AppHeader";
import COLORS from "../../constants/colors";
import styles from "./PreviewScreenStyle";

const PreviewScreen = ({ photo, onRetake, onConfirm, isConfirming = false }) => {
  const insets = useSafeAreaInsets();
  const [footerSize, setFooterSize] = useState({ width: 0, height: 0 });
  const [fontsLoaded] = useFonts({ Rubik_400Regular });

  if (!photo?.uri || !fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: photo.uri }} style={styles.image} resizeMode="cover" />

      <AppHeader
        title="Preview"
        onBack={onRetake}
        backDisabled={isConfirming}
        style={styles.header}
      />

      <View
        style={[styles.actionBar, { paddingBottom: insets.bottom + 16 }]}
        onLayout={(e) => setFooterSize(e.nativeEvent.layout)}
      >
        <ShapedBackground size={footerSize} fill={COLORS.warmCream} flipped />
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
      </View>
    </View>
  );
};

export default PreviewScreen;
