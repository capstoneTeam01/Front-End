import React from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";

import ToggleRow from "../ToggleRow/ToggleRow";
import styles from "./NotificationSettingsModalStyle";

const NotificationSettingsModal = ({
  visible,
  push,
  appointmentReminders,
  onToggle,
  onClose,
}) => {
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

            <Text style={styles.title}>Notifications</Text>

            <ToggleRow
              label="Push Notification"
              value={push}
              onValueChange={(v) => onToggle("push", v)}
            />
            <ToggleRow
              label="Appointment Reminders"
              value={appointmentReminders}
              onValueChange={(v) => onToggle("appointmentReminders", v)}
            />
          </View>
        </TouchableWithoutFeedback>
      </Pressable>
    </Modal>
  );
};

export default NotificationSettingsModal;
