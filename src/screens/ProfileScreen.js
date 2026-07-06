import React, { useState, useEffect, useCallback } from "react";
import { ScrollView, View, Text, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import HomeTopBackground from "./HomeTopBackground";
import HeroHexagon from "../components/HeroHexagon/HeroHexagon";
import HexTile from "../components/HexTile/HexTile";
import ProfileMenuRow from "../components/ProfileMenuRow/ProfileMenuRow";
import ConfirmPopup from "../components/ConfirmPopup/ConfirmPopup";
import NotificationSettingsModal from "../components/NotificationSettingsModal/NotificationSettingsModal";
import BottomNav from "../components/BottomNav/BottomNav";

import { getMe } from "../api/getMe";
import { deleteAccount, updateNotificationSetting } from "../api/profileApi";
import { logoutUser } from "../features/auth/services/authSessionService";
import COLORS from "../constants/colors";
import styles from "./ProfileScreenStyle";

const ProfileScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [displayName, setDisplayName] = useState("User Name");
  const [email, setEmail] = useState("");
  const [notif, setNotif] = useState({
    push: true,
    appointmentReminders: true,
  });

  const [logoutVisible, setLogoutVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [notifVisible, setNotifVisible] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const loadProfile = useCallback(async () => {
    try {
      const { user, displayName: name } = await getMe();
      if (name) setDisplayName(name);
      if (user?.email) setEmail(user.email);
      if (user?.notificationSettings) {
        setNotif({
          push: user.notificationSettings.push !== false,
          appointmentReminders:
            user.notificationSettings.appointmentReminders !== false,
        });
      }
    } catch (error) {
      console.log("[FixBee][Profile] load failed", error?.message);
    }
  }, []);

  useEffect(() => {
    loadProfile();
    const unsub = navigation.addListener("focus", loadProfile);
    return unsub;
  }, [navigation, loadProfile]);

  const goToLogin = () => {
    navigation.reset({ index: 0, routes: [{ name: "Login" }] });
  };

  const handleLogout = async () => {
    await logoutUser();
    setLogoutVisible(false);
    goToLogin();
  };

  const handleDelete = async (password) => {
    if (!password) {
      Alert.alert(
        "Password required",
        "Enter your password to delete your account.",
      );
      return;
    }
    setDeleting(true);
    try {
      await deleteAccount(password);
      await logoutUser();
      setDeleteVisible(false);
      goToLogin();
    } catch (error) {
      Alert.alert(
        "Couldn't delete account",
        error?.message || "Please try again.",
      );
    } finally {
      setDeleting(false);
    }
  };

  const handleToggleNotif = async (key, value) => {
    setNotif((prev) => ({ ...prev, [key]: value }));
    try {
      await updateNotificationSetting(key, value);
    } catch (error) {
      setNotif((prev) => ({ ...prev, [key]: !value }));
      Alert.alert(
        "Couldn't update setting",
        error?.message || "Please try again.",
      );
    }
  };

  return (
    <View style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Twin-hexagon cream background behind the status bar */}
        <View style={styles.topArea}>
          <HomeTopBackground style={styles.topBg} />
          <View style={{ height: insets.top }} />
        </View>

        {/* Outlined hero hexagon holding avatar + name + email */}
        <View style={styles.heroWrap}>
          <HeroHexagon>
            <View style={styles.avatarHex}>
              <HexTile size={92} flatTop={false} fill={COLORS.lightHoney}>
                <Ionicons
                  name="person-outline"
                  size={40}
                  color={COLORS.secondary}
                />
              </HexTile>
            </View>
            <Text style={styles.name}>{displayName}</Text>
            <Text style={styles.email}>{email || "—"}</Text>
          </HeroHexagon>
        </View>

        <View style={styles.menuCard}>
          <ProfileMenuRow
            icon="person-outline"
            label="Edit Profile"
            showDivider={false}
            onPress={() => navigation.navigate("EditProfile")}
          />
          <ProfileMenuRow
            icon="notifications-outline"
            label="Notification Settings"
            onPress={() => setNotifVisible(true)}
          />
          <ProfileMenuRow
            icon="log-out-outline"
            label="Log Out"
            onPress={() => setLogoutVisible(true)}
          />
          <ProfileMenuRow
            icon="trash-outline"
            label="Delete Account"
            danger
            onPress={() => setDeleteVisible(true)}
          />
        </View>
      </ScrollView>

      <BottomNav active="Profile" />

      <ConfirmPopup
        visible={logoutVisible}
        variant="logout"
        title="Log Out ?"
        message="Are you sure you want to log out of FixBee?"
        confirmLabel="Confirm"
        cancelLabel="Cancel"
        onConfirm={handleLogout}
        onClose={() => setLogoutVisible(false)}
      />

      <ConfirmPopup
        visible={deleteVisible}
        variant="delete"
        title="Delete Account?"
        message="Your account and all associated data will be permanently deleted."
        requirePassword
        confirmLabel="Confirm"
        cancelLabel="Cancel"
        loading={deleting}
        onConfirm={handleDelete}
        onClose={() => setDeleteVisible(false)}
      />

      <NotificationSettingsModal
        visible={notifVisible}
        push={notif.push}
        appointmentReminders={notif.appointmentReminders}
        onToggle={handleToggleNotif}
        onClose={() => setNotifVisible(false)}
      />
    </View>
  );
};

export default ProfileScreen;
