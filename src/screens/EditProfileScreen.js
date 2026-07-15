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
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import AppHeader from "../components/AppHeader/AppHeader";
import AuthFooterTray from "../components/AuthFooterTray/AuthFooterTray";
import HexAvatar from "../components/HexAvatar/HexAvatar";
import CityPickerSheet from "../components/CityPickerSheet/CityPickerSheet";
import { getMe } from "../api/getMe";
import { updateProfile, uploadProfileImage } from "../api/profileApi";
import { useLocation } from "../context/LocationContext";
import COLORS from "../constants/colors";
import styles from "./EditProfileScreenStyle";

const EditProfileScreen = ({ navigation }) => {
  const { setCity: setAppCity } = useLocation();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [cityOpen, setCityOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { user, displayName } = await getMe();
        if (displayName) setFullName(displayName);
        if (user?.email) setEmail(user.email);
        if (user?.phone) setPhone(user.phone);
        if (user?.location) setLocation(user.location);
        if (user?.profileImage) setProfileImage(user.profileImage);
      } catch (error) {
        console.log("[FixBee][EditProfile] load failed", error?.message);
      }
    })();
  }, []);

  const handleEditAvatar = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permission.status !== "granted") {
        Alert.alert(
          "Gallery permission needed",
          "Please allow photo library access to update your profile photo.",
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.85,
      });

      if (result.canceled || !result.assets?.[0]) return;

      const asset = result.assets[0];
      setUploadingAvatar(true);
      // Show local preview immediately while upload runs
      setProfileImage(asset.uri);

      const data = await uploadProfileImage(asset);
      const nextUrl = data?.profileImage || data?.user?.profileImage;
      if (nextUrl) {
        setProfileImage(nextUrl);
      }
    } catch (error) {
      console.log("[FixBee][EditProfile] avatar upload failed", error?.message);
      Alert.alert(
        "Couldn't update photo",
        error?.message || "Please try again.",
      );
      // Reload saved image if upload failed after local preview
      try {
        const { user } = await getMe();
        setProfileImage(user?.profileImage || null);
      } catch {
        setProfileImage(null);
      }
    } finally {
      setUploadingAvatar(false);
    }
  };

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
      if (fields.location) setAppCity(fields.location);
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
            <HexAvatar
              size={98}
              imageUri={profileImage}
              showEditBadge
              onEditPress={uploadingAvatar ? undefined : handleEditAvatar}
            />
            {uploadingAvatar && (
              <View style={styles.avatarLoading}>
                <ActivityIndicator color={COLORS.secondary} />
              </View>
            )}
          </View>

          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
            placeholder="James mitchell"
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
            placeholder="*************"
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

        <View style={styles.footer}>
          <AuthFooterTray fill={COLORS.warmCream}>
            <View style={styles.footerRow}>
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
          </AuthFooterTray>
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
