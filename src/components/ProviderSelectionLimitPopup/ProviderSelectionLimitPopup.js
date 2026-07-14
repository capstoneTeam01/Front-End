import React from "react";
import {
  Modal,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import COLORS from "../../constants/colors";
import PolygonAsset from "../PolygonAsset";
import styles from "./ProviderSelectionLimitPopupStyle";

const ProviderSelectionLimitPopup = ({
  visible,
  limit,
  onClose,
}) => (
  <Modal
    visible={visible}
    transparent
    animationType="slide"
    statusBarTranslucent
    onRequestClose={onClose}
  >
    <Pressable style={styles.backdrop} onPress={onClose}>
      <TouchableWithoutFeedback>
        <View style={styles.sheet}>
          <View style={styles.handle} />

          <PolygonAsset
            variant="polygon9"
            width={64}
            height={71.2}
            fill={COLORS.primary}
          >
            <Ionicons
              name="warning-outline"
              size={28}
              color={COLORS.secondary}
            />
          </PolygonAsset>

          <Text style={styles.title}>Selection limit reached</Text>
          <Text style={styles.message}>
            Only {limit} service providers can be selected at a time.
          </Text>

          <Pressable style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Got it</Text>
          </Pressable>
        </View>
      </TouchableWithoutFeedback>
    </Pressable>
  </Modal>
);

export default ProviderSelectionLimitPopup;
