import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { getNotifications } from "../api/getNotifications";

const COOLDOWN_MS = 3000;

const NotificationsContext = createContext({
  unreadCount: 0,
  refresh: async () => {},
});

export const NotificationsProvider = ({ children }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const inFlight = useRef(null);
  const lastFetchedAt = useRef(0);

  const refresh = useCallback(async ({ force = false } = {}) => {
    if (inFlight.current) {
      return inFlight.current;
    }

    if (!force && Date.now() - lastFetchedAt.current < COOLDOWN_MS) {
      return;
    }

    const request = (async () => {
      try {
        const items = await getNotifications();
        const unread = items.filter((n) => !n.isDeleted && !n.isRead).length;
        setUnreadCount(unread);
        lastFetchedAt.current = Date.now();
      } catch {
        // Leave the previous count in place on failure.
      } finally {
        inFlight.current = null;
      }
    })();

    inFlight.current = request;
    return request;
  }, []);

  useEffect(() => {
    refresh({ force: true });
  }, [refresh]);

  return (
    <NotificationsContext.Provider value={{ unreadCount, refresh }}>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationsContext);

export default NotificationsContext;
