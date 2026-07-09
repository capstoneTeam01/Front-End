import React from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFonts, Rubik_400Regular } from "@expo-google-fonts/rubik";

import BulbIcon from "../../../assets/icons/Bulb_icon.svg";
import FocusIcon from "../../../assets/icons/Focus Camera Icon.svg";
import TargetIcon from "../../../assets/icons/Traget.svg";
import WrongImageIcon from "../../../assets/icons/Wrong Image.svg";
import COLORS from "../../constants/colors";
import HexTile from "../HexTile/HexTile";
import styles from "./CaptureInstructionsPopupStyle";

const TIPS = [
  { Icon: BulbIcon, label: "Ensure good lighting" },
  { Icon: FocusIcon, label: "Capture the full area" },
  { Icon: WrongImageIcon, label: "Avoid Blurry Photos" },
  { Icon: TargetIcon, label: "Keep the issue centered" },
];

const CaptureInstructionsPopup = ({ visible, onClose, onScanNow }) => {
  const insets = useSafeAreaInsets();
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
          <View style={[styles.sheet, { paddingBottom: Math.max(insets.bottom, 24) }]}>
            <View style={styles.handle} />

            <View style={styles.guide}>
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
                      <HexTile
                        size={40}
                        flatTop={false}
                        fill={COLORS.lightHoney}
                      >
                        <tip.Icon
                          width={20}
                          height={20}
                          color={COLORS.secondary}
                        />
                      </HexTile>
                    </View>
                    <Text style={styles.tipText}>{tip.label}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.footer}>
              <Pressable style={styles.scanButton} onPress={onScanNow}>
                <Text style={styles.scanButtonText}>Scan Now</Text>
              </Pressable>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Pressable>
    </Modal>
  );
};

export default CaptureInstructionsPopup;
