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

import LogoutIcon from "../../../assets/icons/Logout_Icon.svg";
import COLORS from "../../constants/colors";
import PolygonAsset from "../PolygonAsset";
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

            <View style={styles.iconHex}>
              <PolygonAsset
                variant="polygon9"
                width={80}
                height={89}
                fill={isDelete ? COLORS.riskHigh : COLORS.primary}
              >
                {isDelete ? (
                  <Ionicons
                    name="warning-outline"
                    size={36}
                    color={COLORS.white}
                  />
                ) : (
                  <LogoutIcon width={34} height={34} />
                )}
              </PolygonAsset>
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
