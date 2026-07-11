import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { getNotifications } from "../api/getNotifications";

const useUnreadCount = () => {
  const [count, setCount] = useState(0);

  useFocusEffect(
    useCallback(() => {
      let active = true;

      (async () => {
        try {
          const items = await getNotifications();
          if (!active) return;
          const unread = items.filter((n) => !n.isDeleted && !n.isRead).length;
          setCount(unread);
        } catch {}
      })();

      return () => {
        active = false;
      };
    }, []),
  );

  return count;
};

export default useUnreadCount;
