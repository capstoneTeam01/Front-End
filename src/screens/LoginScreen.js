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
import styles from "./LoginScreenStyle";
import AppTextField from "../components/AppTextField/AppTextField";
import AuthButton from "../components/AuthButton/AuthButton";
import GoogleButton from "../components/GoogleButton/GoogleButton";
import { loginUser } from "../features/auth/services/authSessionService";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async () => {
    const trimmedEmail = email.trim();

    if (!trimmedEmail || !password) {
      Alert.alert("Missing details", "Enter your email and password to continue.");
      return;
    }

    setSubmitting(true);
    try {
      await loginUser({ email: trimmedEmail, password });

      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    } catch (error) {
      Alert.alert("Login failed", error?.message || "Please check your details and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogle = () => {
    Alert.alert("Coming soon", "Google sign-in will be available in the next build.");
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
        <Text style={styles.title}>Login</Text>

        <Text style={styles.fieldLabel}>Email</Text>
        <AppTextField
          value={email}
          onChangeText={setEmail}
          placeholder="youremail@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Text style={styles.fieldLabel}>Password</Text>
        <AppTextField
          value={password}
          onChangeText={setPassword}
          placeholder="Your Password"
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate("ForgotPassword")}
          style={styles.forgotWrap}
        >
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        <AuthButton label="Login" onPress={handleLogin} loading={submitting} />

        <View style={styles.orRow}>
          <View style={styles.orLine} />
          <Text style={styles.orText}>Or</Text>
          <View style={styles.orLine} />
        </View>

        <GoogleButton label="Log In using Google" onPress={handleGoogle} />

        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.footerLink}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
