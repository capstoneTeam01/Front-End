import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import COLORS from "../../constants/colors";
import styles from "./ConfirmPopupStyle";

const ConfirmPopup = ({
  visible,
  variant = "logout",
  title,
  message,
  requirePassword = false,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  loading = false,
  onConfirm,
  onClose,
}) => {
  const [password, setPassword] = useState("");

  const isDelete = variant === "delete";

  const handleConfirm = () => {
    onConfirm?.(requirePassword ? password : undefined);
  };

  const handleClose = () => {
    setPassword("");
    onClose?.();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
      statusBarTranslucent
    >
      <Pressable style={styles.backdrop} onPress={handleClose}>
        <TouchableWithoutFeedback>
          <View style={styles.sheet}>
            <View style={styles.handle} />

            <View style={[styles.iconHex, isDelete ? styles.iconHexDanger : styles.iconHexNeutral]}>
              <Ionicons
                name={isDelete ? "warning-outline" : "log-out-outline"}
                size={24}
                color={COLORS.white}
              />
            </View>

            <Text style={styles.title}>{title}</Text>
            {message ? <Text style={styles.message}>{message}</Text> : null}

            {requirePassword && (
              <>
                <Text style={styles.fieldLabel}>Enter Password</Text>
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="****************"
                  placeholderTextColor={COLORS.placeholder}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </>
            )}

            <View style={styles.actions}>
              <TouchableOpacity
                style={[styles.btn, styles.confirmBtn]}
                onPress={handleConfirm}
                activeOpacity={0.85}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color={COLORS.textPrimary} />
                ) : (
                  <Text style={styles.confirmLabel}>{confirmLabel}</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.btn, styles.cancelBtn]}
                onPress={handleClose}
                activeOpacity={0.85}
                disabled={loading}
              >
                <Text style={styles.cancelLabel}>{cancelLabel}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Pressable>
    </Modal>
  );
};

export default ConfirmPopup;