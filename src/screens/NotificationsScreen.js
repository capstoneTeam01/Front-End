import React, { useEffect, useState, useCallback } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AppHeader from "../components/AppHeader/AppHeader";
import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from "../api/getNotifications";
import { useNotifications } from "../context/NotificationsContext";
import COLORS from "../constants/colors";
import styles from "./NotificationsScreenStyle";

const ICON_FOR_TYPE = {
  appointment_confirmed: "checkmark-circle-outline",
  appointment_reminder: "alarm-outline",
  provider_reply: "chatbubble-ellipses-outline",
  general: "information-circle-outline",
};

const formatTime = (value) => {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);

  const diffMs = Date.now() - date.getTime();
  const min = Math.floor(diffMs / 60000);

  if (min < 1) return "Just now";
  if (min < 60) return `${min}m ago`;

  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;

  const days = Math.floor(hr / 24);
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days}d ago`;

  return date.toLocaleDateString();
};

const NotificationsScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  const { refresh: refreshUnreadCount } = useNotifications();

  const load = useCallback(async () => {
    try {
      const data = await getNotifications();
      setItems(data.filter((n) => !n.isDeleted));
      setError("");
    } catch (e) {
      setError(e?.message || "Couldn't load notifications.");
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
    try {
      await markNotificationRead(id);
      refreshUnreadCount({ force: true });
    } catch {
      setItems((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: false } : n)),
      );
    }
  };

  const markAll = async () => {
    const snapshot = items;
    setItems((prev) => prev.map((n) => ({ ...n, isRead: true })));
    try {
      await markAllNotificationsRead();
      refreshUnreadCount({ force: true });
    } catch {
      setItems(snapshot);
    }
  };

  const handleNotificationPress = async (notification) => {
    await markOne(notification._id);

    if (notification.type === "provider_reply") {
      navigation.navigate("RepairStatus", {
        photoId: notification.relatedId,
        notificationId: notification._id,
        selectedProviders: notification.selectedProviders || [],
      });

      return;
    }
  };

  const renderBody = () => {
    if (loading) {
      return (
        <View style={styles.stateBox}>
          <ActivityIndicator color={COLORS.textMuted} />
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.stateBox}>
          <Ionicons
            name="cloud-offline-outline"
            size={28}
            color={COLORS.textMuted}
          />
          <Text style={styles.emptyTitle}>Something went wrong</Text>
          <Text style={styles.emptyText}>{error}</Text>
          <TouchableOpacity style={styles.retryBtn} onPress={onRefresh}>
            <Text style={styles.retryText}>Try again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (items.length === 0) {
      return (
        <View style={styles.stateBox}>
          <Ionicons
            name="notifications-off-outline"
            size={28}
            color={COLORS.textMuted}
          />
          <Text style={styles.emptyTitle}>No notifications</Text>
          <Text style={styles.emptyText}>You're all caught up.</Text>
        </View>
      );
    }

    return (
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
            onPress={() => handleNotificationPress(n)}
            style={[styles.row, !n.isRead && styles.rowUnread]}
          >
            <View style={styles.iconChip}>
              <Ionicons
                name={ICON_FOR_TYPE[n.type] || "notifications-outline"}
                size={18}
                color={COLORS.honeyBrown}
              />
            </View>
            <View style={styles.body}>
              <Text style={styles.message}>{n.message}</Text>
              {n.createdAt ? (
                <Text style={styles.time}>{formatTime(n.createdAt)}</Text>
              ) : null}
            </View>
            {!n.isRead ? <View style={styles.dot} /> : null}
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  return (
    <View style={styles.safe}>
      <AppHeader title="Notifications" onBack={() => navigation?.goBack()} />

      {hasUnread && !loading && !error ? (
        <TouchableOpacity
          style={styles.markAllBtn}
          onPress={markAll}
          hitSlop={8}
        >
          <Text style={styles.markAllText}>Mark all read</Text>
        </TouchableOpacity>
      ) : null}

      {renderBody()}
    </View>
  );
};

export default NotificationsScreen;
