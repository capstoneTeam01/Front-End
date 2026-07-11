import { navigationRef } from "../navigation/AppNavigator";
import { logoutUser } from "../features/auth/services/authSessionService";

let handling = false;

export const handleSessionExpired = async () => {
  if (handling) return;
  handling = true;

  try {
    await logoutUser();
  } catch {}

  if (navigationRef.isReady()) {
    navigationRef.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  }

  setTimeout(() => {
    handling = false;
  }, 1500);
};
