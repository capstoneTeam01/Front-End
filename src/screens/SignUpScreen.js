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
import styles from "./SignUpScreenStyle";
import AppTextField from "../components/AppTextField/AppTextField";
import AuthButton from "../components/AuthButton/AuthButton";
import GoogleButton from "../components/GoogleButton/GoogleButton";
import HoneycombBackground from "../components/HoneycombBackground";
import useGoogleAuth from "../features/auth/hooks/useGoogleAuth";
import {
  registerUser,
  loginWithGoogleToken,
} from "../features/auth/services/authSessionService";

const MIN_PASSWORD = 8;

const SignUpScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { signIn: googleSignIn } = useGoogleAuth();

  const handleCreate = async () => {
    const fName = firstName.trim();
    const lName = lastName.trim();
    const mail = email.trim();
    const phoneNo = phone.trim();

    if (
      !fName ||
      !lName ||
      !mail ||
      !phoneNo ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert(
        "Missing details",
        "Please fill in every field to create your account.",
      );
      return;
    }

    if (password.length < MIN_PASSWORD) {
      Alert.alert(
        "Weak password",
        `Password must be at least ${MIN_PASSWORD} characters.`,
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        "Passwords don't match",
        "Please make sure both passwords are the same.",
      );
      return;
    }

    const name = `${fName} ${lName}`;

    setSubmitting(true);
    try {
      await registerUser({ name, email: mail, phone: phoneNo, password });

      navigation.reset({
        index: 0,
        routes: [{ name: "Onboarding" }],
      });
    } catch (error) {
      Alert.alert("Sign up failed", error?.message || "Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    try {
      const result = await googleSignIn();
      if (result?.cancelled) return;

      const { user } = await loginWithGoogleToken(result.idToken);

      const hasLocation = !!user?.location;
      navigation.reset({
        index: 0,
        routes: [{ name: hasLocation ? "Home" : "Onboarding" }],
      });
    } catch (error) {
      Alert.alert(
        "Google sign-in failed",
        error?.message || "Please try again.",
      );
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <HoneycombBackground variant="login" style={styles.topShape} />
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Sign Up</Text>

        <Text style={styles.fieldLabel}>First Name</Text>
        <AppTextField
          value={firstName}
          onChangeText={setFirstName}
          placeholder="Enter your first name"
          containerStyle={styles.field}
        />

        <Text style={styles.fieldLabel}>Last Name</Text>
        <AppTextField
          value={lastName}
          onChangeText={setLastName}
          placeholder="Enter your last name"
          containerStyle={styles.field}
        />

        <Text style={styles.fieldLabel}>Email</Text>
        <AppTextField
          value={email}
          onChangeText={setEmail}
          placeholder="Your Email Goes Here"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.field}
        />

        <Text style={styles.fieldLabel}>Phone</Text>
        <AppTextField
          value={phone}
          onChangeText={setPhone}
          placeholder="Enter Your Phone No"
          keyboardType="phone-pad"
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.field}
        />

        <Text style={styles.fieldLabel}>Password</Text>
        <AppTextField
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.field}
        />

        <Text style={styles.fieldLabel}>Confirm Password</Text>
        <AppTextField
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Enter your password"
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.field}
        />

        <View style={styles.createWrap}>
          <AuthButton
            label="Create"
            onPress={handleCreate}
            loading={submitting}
            style={styles.formButton}
            labelStyle={styles.formButtonLabel}
          />
        </View>

        <View style={styles.orRow}>
          <View style={styles.orLine} />
          <Text style={styles.orText}>Or</Text>
          <View style={styles.orLine} />
        </View>

        <GoogleButton
          label="Sign In using Google"
          onPress={handleGoogle}
          loading={googleLoading}
          style={styles.formButton}
          labelStyle={styles.formButtonLabel}
        />

        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.footerLink}>Log in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;
