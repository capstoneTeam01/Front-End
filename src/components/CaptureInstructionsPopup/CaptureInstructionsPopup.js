import React from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import COLORS from "../../constants/colors";
import styles from "./CaptureInstructionsPopupStyle";

const TIPS = [
  { icon: "bulb-outline", label: "Ensure good lighting" },
  { icon: "scan-outline", label: "Capture the full area" },
  { icon: "camera-outline", label: "Avoid Blurry Photos" },
  { icon: "locate-outline", label: "Keep the issue centered" },
];

const CaptureInstructionsPopup = ({ visible, onClose, onScanNow }) => {
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
                    <Ionicons
                      name={tip.icon}
                      size={22}
                      color={COLORS.textMuted}
                    />
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
