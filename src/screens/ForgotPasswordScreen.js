import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import styles from "./ForgotPasswordScreenStyle";
import AppTextField from "../components/AppTextField/AppTextField";
import AuthButton from "../components/AuthButton/AuthButton";

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = async () => {
    const mail = email.trim();
    if (!mail) {
      Alert.alert("Missing email", "Enter the email linked to your account.");
      return;
    }

    setSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setSent(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.topShape} />
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subtitle}>
          Enter your email and we'll send you a link to reset your password.
        </Text>

        {sent ? (
          <View style={styles.sentBox}>
            <Text style={styles.sentTitle}>Check Your Email</Text>
            <Text style={styles.sentBody}>
              If an account exists for {email.trim()}, a reset link is on its way.
            </Text>
          </View>
        ) : (
          <>
            <Text style={styles.fieldLabel}>Email</Text>
            <AppTextField
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <View style={styles.sendWrap}>
              <AuthButton label="Send Reset Link" onPress={handleSend} loading={submitting} />
            </View>
          </>
        )}

        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={styles.backWrap}
        >
          <Text style={styles.backText}>Back to Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ForgotPasswordScreen;
