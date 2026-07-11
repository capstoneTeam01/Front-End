import { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { useNotifications } from "../context/NotificationsContext";

const useUnreadCount = () => {
  const { unreadCount, refresh } = useNotifications();

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh]),
  );

  return unreadCount;
};

export default useUnreadCount;
