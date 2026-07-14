import React, { useState, useEffect, useCallback } from "react";
import {
  Alert,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import HomeTopBackground from "./HomeTopBackground";
import HeroHexagon from "../components/HeroHexagon/HeroHexagon";
import HexAvatar from "../components/HexAvatar/HexAvatar";
import ProfileMenuRow from "../components/ProfileMenuRow/ProfileMenuRow";
import ConfirmPopup from "../components/ConfirmPopup/ConfirmPopup";
import NotificationSettingsModal from "../components/NotificationSettingsModal/NotificationSettingsModal";
import BottomNav from "../components/BottomNav/BottomNav";

import { getMe } from "../api/getMe";
import { deleteAccount, updateNotificationSetting } from "../api/profileApi";
import { logoutUser } from "../features/auth/services/authSessionService";
import styles from "./ProfileScreenStyle";

const PROFILE_FRAME_WIDTH = 402;
const PROFILE_HERO_BASE_WIDTH = 354;
const PROFILE_TOP_AREA_HEIGHT = 116;

const ProfileScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { width: screenWidth } = useWindowDimensions();
  const layoutScale = screenWidth / PROFILE_FRAME_WIDTH;
  const heroWidth = Math.min(
    PROFILE_HERO_BASE_WIDTH * layoutScale,
    screenWidth - 32,
  );
  const [displayName, setDisplayName] = useState("User Name");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState(null);
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
      setProfileImage(user?.profileImage || null);
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
        <View
          style={[
            styles.topArea,
            {
              height:
                PROFILE_TOP_AREA_HEIGHT *
                layoutScale,
            },
          ]}
        >
          <HomeTopBackground style={styles.topBg} variant="profile" />
          <View style={{ height: insets.top }} />
        </View>

        <View style={styles.heroWrap}>
          <HeroHexagon width={heroWidth} contentOffsetY={-6}>
            <View style={styles.avatarHex}>
              <HexAvatar size={88} imageUri={profileImage} />
            </View>
            <Text style={styles.name}>{displayName}</Text>
            <Text style={styles.email}>{email || "Emailid@example.com"}</Text>
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
            showDivider={false}
            onPress={() => setNotifVisible(true)}
          />
          <ProfileMenuRow
            icon="log-out-outline"
            label="Log Out"
            showDivider={false}
            onPress={() => setLogoutVisible(true)}
          />
          <ProfileMenuRow
            icon="trash-outline"
            label="Delete Account"
            showDivider={false}
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
