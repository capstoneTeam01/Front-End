import { navigationRef } from "../navigation/AppNavigator";
import { logoutUser } from "../features/auth/services/authSessionService";

let handling = false;

const AUTH_FLOW_ROUTES = new Set([
  "Splash",
  "Welcome",
  "Login",
  "SignUp",
  "ForgotPassword",
  "Onboarding",
]);

export const handleSessionExpired = async () => {
  if (handling) return;
  handling = true;

  try {
    await logoutUser();
  } catch {}

  if (navigationRef.isReady()) {
    const current = navigationRef.getCurrentRoute()?.name;
    // Don't yank Splash/Welcome mid-animation for a guest 401.
    if (!AUTH_FLOW_ROUTES.has(current)) {
      navigationRef.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    }
  }

  setTimeout(() => {
    handling = false;
  }, 1500);
};
