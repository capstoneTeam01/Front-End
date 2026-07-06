import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AppHeader, { ShapedBackground } from "../components/AppHeader/AppHeader";
import HexAvatar from "../components/HexAvatar/HexAvatar";
import CityPickerSheet from "../components/CityPickerSheet/CityPickerSheet";
import { getMe } from "../api/getMe";
import { updateProfile } from "../api/profileApi";
import COLORS from "../constants/colors";
import styles from "./EditProfileScreenStyle";

const EditProfileScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [cityOpen, setCityOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [footerSize, setFooterSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    (async () => {
      try {
        const { user, displayName } = await getMe();
        if (displayName) setFullName(displayName);
        if (user?.email) setEmail(user.email);
        if (user?.phone) setPhone(user.phone);
        if (user?.location) setLocation(user.location);
      } catch (error) {
        console.log("[FixBee][EditProfile] load failed", error?.message);
      }
    })();
  }, []);

  const handleSave = async () => {
    const fields = {};
    if (fullName.trim()) fields.name = fullName.trim();
    if (phone.trim()) fields.phone = phone.trim();
    if (location) fields.location = location;
    if (password) fields.password = password;

    if (Object.keys(fields).length === 0) {
      Alert.alert("Nothing to save", "Make a change first.");
      return;
    }

    setSaving(true);
    try {
      await updateProfile(fields);
      navigation.goBack();
    } catch (error) {
      Alert.alert("Couldn't save", error?.message || "Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.safe}>
      <AppHeader title="Edit Profile" onBack={() => navigation.goBack()} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.avatarWrap}>
            <HexAvatar size={120} showEditBadge onEditPress={() => {}} />
          </View>

          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
            placeholder="Your full name"
            placeholderTextColor={COLORS.placeholder}
          />

          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={[styles.input, styles.inputDisabled]}
            value={email}
            editable={false}
            placeholder="Your Email"
            placeholderTextColor={COLORS.placeholder}
          />

          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="Your Number"
            placeholderTextColor={COLORS.placeholder}
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Leave blank to keep current"
            placeholderTextColor={COLORS.placeholder}
            secureTextEntry
            autoCapitalize="none"
          />

          <Text style={styles.label}>Location</Text>
          <TouchableOpacity
            style={styles.cityField}
            onPress={() => setCityOpen(true)}
            activeOpacity={0.8}
          >
            <Text
              style={[styles.cityText, !location && styles.cityPlaceholder]}
            >
              {location || "Select a city"}
            </Text>
            <Ionicons
              name="chevron-down"
              size={18}
              color={COLORS.surfaceDark}
            />
          </TouchableOpacity>
        </ScrollView>

        <View
          style={styles.footer}
          onLayout={(e) => setFooterSize(e.nativeEvent.layout)}
        >
          <ShapedBackground size={footerSize} fill={COLORS.warmCream} flipped />
          <TouchableOpacity
            style={[styles.footerBtn, styles.cancelBtn]}
            onPress={() => navigation.goBack()}
            activeOpacity={0.85}
          >
            <Text style={styles.cancelLabel}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.footerBtn, styles.saveBtn]}
            onPress={handleSave}
            activeOpacity={0.85}
            disabled={saving}
          >
            <Text style={styles.saveLabel}>
              {saving ? "Saving..." : "Save"}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <CityPickerSheet
        visible={cityOpen}
        selectedCity={location}
        onSelect={(c) => {
          setLocation(c);
          setCityOpen(false);
        }}
        onClose={() => setCityOpen(false)}
      />
    </View>
  );
};

export default EditProfileScreen;
