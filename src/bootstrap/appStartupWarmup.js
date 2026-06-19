import { resolveApiUrl } from "../api/resolveApiUrl";
import { getTokenForRequest, resetAuthSession } from "../features/auth/services/authSessionService";

const WARMUP_TIMEOUT_MS = 12000;
const WARMUP_RETRY_DELAY_MS = 850;

let warmupPromise = null;
let lastWarmupResult = null;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const withTimeout = (promise, timeoutMs, timeoutMessage) => {
  let timer;

  return Promise.race([
    promise,
    new Promise((_, reject) => {
      timer = setTimeout(() => reject(new Error(timeoutMessage)), timeoutMs);
    }),
  ]).finally(() => clearTimeout(timer));
};

const isWarmupUsable = () => {
  if (!lastWarmupResult?.ok || !lastWarmupResult?.finishedAt) return false;

  // Keep this short because the backend token can be invalidated when the
  // developer restarts Node/Redis during capstone testing.
  return Date.now() - lastWarmupResult.finishedAt <= 2 * 60 * 1000;
};

const runWarmupAttempt = async ({ reason, forceRefresh = false } = {}) => {
  const apiUrl = resolveApiUrl();

  console.log("[FixBee][Startup] warming backend session", {
    reason: reason || "app-start",
    apiUrl,
    forceRefresh,
  });

  const token = await withTimeout(
    getTokenForRequest({
      forceRefresh,
      reason: reason || "startup-warmup",
    }),
    WARMUP_TIMEOUT_MS,
    "Backend login warmup timed out."
  );

  return {
    ok: Boolean(token),
    tokenReady: Boolean(token),
    apiUrl,
    finishedAt: Date.now(),
  };
};

export const warmUpFixBeeSession = async ({ reason = "app-start", forceRefresh = false } = {}) => {
  if (!forceRefresh && isWarmupUsable()) {
    console.log("[FixBee][Startup] using recently warmed backend session", {
      reason,
      apiUrl: lastWarmupResult.apiUrl,
    });
    return lastWarmupResult;
  }

  if (warmupPromise) {
    console.log("[FixBee][Startup] joining existing backend warmup", { reason });
    return warmupPromise;
  }

  warmupPromise = (async () => {
    try {
      const firstResult = await runWarmupAttempt({ reason, forceRefresh });
      lastWarmupResult = firstResult;
      console.log("[FixBee][Startup] backend session warmup ready", firstResult);
      return firstResult;
    } catch (firstError) {
      console.log("[FixBee][Startup] first backend warmup attempt failed", {
        reason,
        error: firstError?.message,
      });

      // On the first QR/Open Expo run, the backend or LAN socket can still be
      // waking up. Clear only the token, wait briefly, and try once more so the
      // user's first image upload does not silently fail.
      await resetAuthSession({ reason: `startup-warmup-retry:${reason}` });
      await delay(WARMUP_RETRY_DELAY_MS);

      try {
        const retryResult = await runWarmupAttempt({ reason: `${reason}:retry`, forceRefresh: true });
        lastWarmupResult = retryResult;
        console.log("[FixBee][Startup] backend session warmup ready after retry", retryResult);
        return retryResult;
      } catch (retryError) {
        lastWarmupResult = {
          ok: false,
          tokenReady: false,
          apiUrl: resolveApiUrl(),
          error: retryError?.message || firstError?.message,
          finishedAt: Date.now(),
        };

        console.log("[FixBee][Startup] backend session warmup unavailable", lastWarmupResult);
        return lastWarmupResult;
      }
    } finally {
      warmupPromise = null;
    }
  })();

  return warmupPromise;
};

export const waitForFixBeeStartupWarmup = async ({ reason = "before-request" } = {}) => {
  if (isWarmupUsable()) return lastWarmupResult;

  return warmUpFixBeeSession({ reason });
};

export const markFixBeeWarmupStale = () => {
  lastWarmupResult = null;
};
