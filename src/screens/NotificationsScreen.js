import React, { useEffect, useState, useCallback } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import ScreenHeader from "../components/ScreenHeader/ScreenHeader";
import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from "../api/getNotifications";
import COLORS from "../constants/colors";
import styles from "./NotificationsScreenStyle";

const DEMO_NOTIFICATIONS = [
  {
    _id: "demo-1",
    message:
      "Your appointment with ABC Plumbing is confirmed for tomorrow at 10 AM.",
    type: "appointment_confirmed",
    isRead: false,
    createdAt: "Just now",
  },
  {
    _id: "demo-2",
    message: "Reminder: Electrician visit scheduled for Friday.",
    type: "appointment_reminder",
    isRead: false,
    createdAt: "2h ago",
  },
  {
    _id: "demo-3",
    message: "Welcome to FixBee! Snap a photo to get started.",
    type: "general",
    isRead: true,
    createdAt: "Yesterday",
  },
];

const ICON_FOR_TYPE = {
  appointment_confirmed: "checkmark-circle-outline",
  appointment_reminder: "alarm-outline",
  general: "information-circle-outline",
};

const NotificationsScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [items, setItems] = useState([]);
  const [isDemo, setIsDemo] = useState(false);

  const load = useCallback(async () => {
    try {
      const data = await getNotifications();
      if (Array.isArray(data) && data.length) {
        setItems(data.filter((n) => !n.isDeleted));
        setIsDemo(false);
      } else {
        setItems(DEMO_NOTIFICATIONS);
        setIsDemo(true);
      }
    } catch {
      setItems(DEMO_NOTIFICATIONS);
      setIsDemo(true);
    }
  }, []);

  useEffect(() => {
    let active = true;
    (async () => {
      await load();
      if (active) setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [load]);

  const onRefresh = async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  };

  const hasUnread = items.some((n) => !n.isRead);

  const markOne = async (id) => {
    setItems((prev) =>
      prev.map((n) => (n._id === id ? { ...n, isRead: true } : n)),
    );
    if (isDemo) return;
    try {
      await markNotificationRead(id);
    } catch {
      // Revert on failure.
      setItems((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: false } : n)),
      );
    }
  };

  const markAll = async () => {
    const snapshot = items;
    setItems((prev) => prev.map((n) => ({ ...n, isRead: true })));
    if (isDemo) return;
    try {
      await markAllNotificationsRead();
    } catch {
      setItems(snapshot);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.headerWrap}>
        <View style={styles.headerLeft}>
          <ScreenHeader
            title="Notifications"
            showBack
            onBack={() => navigation?.goBack()}
          />
          {isDemo ? (
            <View style={styles.demoTag}>
              <Text style={styles.demoTagText}>Demo</Text>
            </View>
          ) : null}
        </View>
      </View>

      {hasUnread ? (
        <TouchableOpacity
          style={styles.markAllBtn}
          onPress={markAll}
          hitSlop={8}
        >
          <Text style={styles.markAllText}>Mark all read</Text>
        </TouchableOpacity>
      ) : null}

      {loading ? (
        <View style={styles.stateBox}>
          <ActivityIndicator color={COLORS.textMuted} />
        </View>
      ) : items.length === 0 ? (
        <View style={styles.stateBox}>
          <Ionicons
            name="notifications-off-outline"
            size={28}
            color={COLORS.textMuted}
          />
          <Text style={styles.emptyTitle}>No notifications</Text>
          <Text style={styles.emptyText}>You're all caught up.</Text>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {items.map((n) => (
            <TouchableOpacity
              key={n._id}
              activeOpacity={0.7}
              disabled={n.isRead}
              onPress={() => markOne(n._id)}
              style={[styles.row, !n.isRead && styles.rowUnread]}
            >
              <View style={styles.iconChip}>
                <Ionicons
                  name={ICON_FOR_TYPE[n.type] || "notifications-outline"}
                  size={18}
                  color={COLORS.textPrimary}
                />
              </View>
              <View style={styles.body}>
                <Text style={styles.message}>{n.message}</Text>
                {n.createdAt ? (
                  <Text style={styles.time}>{String(n.createdAt)}</Text>
                ) : null}
              </View>
              {!n.isRead ? <View style={styles.dot} /> : null}
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default NotificationsScreen;
