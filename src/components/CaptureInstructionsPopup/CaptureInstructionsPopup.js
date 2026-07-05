import React from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useFonts, Rubik_400Regular } from "@expo-google-fonts/rubik";

import COLORS from "../../constants/colors";
import HexTile from "../HexTile/HexTile";
import styles from "./CaptureInstructionsPopupStyle";

const TIPS = [
  { Icon: Ionicons, icon: "bulb-outline", label: "Ensure good lighting" },
  {
    Icon: MaterialCommunityIcons,
    icon: "image-filter-center-focus-weak",
    label: "Capture the full area",
  },
  {
    Icon: MaterialCommunityIcons,
    icon: "image-off-outline",
    label: "Avoid Blurry Photos",
  },
  {
    Icon: MaterialCommunityIcons,
    icon: "target",
    label: "Keep the issue centered",
  },
];

const CaptureInstructionsPopup = ({ visible, onClose, onScanNow }) => {
  const [fontsLoaded] = useFonts({ Rubik_400Regular });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <TouchableWithoutFeedback>
          <View style={styles.sheet}>
            <View style={styles.handle} />

            <Text style={styles.title}>Capture Image Clearly</Text>
            <Text style={styles.subtitle}>
              Take a clear photo so FixBee can accurately identify the problem.
            </Text>

            <View style={styles.tipsCard}>
              {TIPS.map((tip, index) => (
                <View
                  key={tip.label}
                  style={[
                    styles.tipRow,
                    index < TIPS.length - 1 && styles.tipDivider,
                  ]}
                >
                  <View style={styles.tipIconWrap}>
                    <HexTile size={40} flatTop={false} fill={COLORS.lightHoney}>
                      <tip.Icon
                        name={tip.icon}
                        size={20}
                        color={COLORS.secondary}
                      />
                    </HexTile>
                  </View>
                  <Text style={styles.tipText}>{tip.label}</Text>
                </View>
              ))}
            </View>

            <Pressable style={styles.scanButton} onPress={onScanNow}>
              <Text style={styles.scanButtonText}>Scan Now</Text>
            </Pressable>
          </View>
        </TouchableWithoutFeedback>
      </Pressable>
    </Modal>
  );
};

export default CaptureInstructionsPopup;
