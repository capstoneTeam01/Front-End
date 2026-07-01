import { initBusinessDirectoryProviderDb } from "../localDb/businessDirectoryProviderLocalDb";
import { getProviderRouteParamsFromIssue } from "../utils/issueProviderRouteMapper";
import {
  buildLocationRouteParams,
  getCurrentCityFromGps,
} from "../utils/locationHelper";
import { DEFAULT_PROVIDER_CITY } from "../utils/providerConstants";

let latestProviderLocation = null;
let latestProviderLocationPromise = null;
let latestProviderImageUri = null;

export const prepareServiceProviderFlowAfterImageSelected = ({ imageUri } = {}) => {
  latestProviderImageUri = imageUri || latestProviderImageUri;
  latestProviderLocation = null;

  initBusinessDirectoryProviderDb().catch((error) => {
    console.log("[FixBee][ProviderFlow] SQLite init during scan failed", error?.message);
  });

  latestProviderLocationPromise = getCurrentCityFromGps({
    preferCached: false,
    forceRefresh: true,
    allowCachedOnFailure: false,
    cacheReason: "service-provider-image-upload",
    highAccuracy: true,
    requireStreetAddress: true,
  })
    .then((location) => {
      if (!location) return null;

      latestProviderLocation = location;
      console.log("[FixBee][ProviderFlow] fresh location cached for provider flow", {
        city: location.city,
        streetAddress: location.streetAddress,
        source: location.source,
      });

      return location;
    })
    .catch((error) => {
      console.log("[FixBee][ProviderFlow] fresh location cache failed", {
        error: error?.message,
      });
      return null;
    })
    .finally(() => {
      latestProviderLocationPromise = null;
    });
};

export const buildServiceProviderRouteParamsForScan = async ({
  analysisResult,
  imageUri,
  uploadedImageUrl,
  title,
} = {}) => {
  let providerCity = DEFAULT_PROVIDER_CITY;
  let locationInfo = latestProviderLocation;

  try {
    if (!locationInfo && latestProviderLocationPromise) {
      locationInfo = await latestProviderLocationPromise;
    }

    locationInfo =
      latestProviderLocation ||
      locationInfo ||
      (await getCurrentCityFromGps({
        preferCached: false,
        forceRefresh: true,
        allowCachedOnFailure: false,
        cacheReason: "find-experts-refresh",
        highAccuracy: true,
      }));
    providerCity = locationInfo?.city || DEFAULT_PROVIDER_CITY;
    latestProviderLocation = locationInfo || latestProviderLocation;

    console.log("[FixBee][ProviderFlow] provider city resolved", {
      providerCity,
      source: locationInfo?.providerCitySource || locationInfo?.source,
    });
  } catch (error) {
    console.log("[FixBee][ProviderFlow] provider city fallback used", {
      fallbackCity: DEFAULT_PROVIDER_CITY,
      error: error?.message,
    });
  }

  const providerRouteParams = getProviderRouteParamsFromIssue({
    analysisResult,
    city: providerCity,
    title,
  });

  providerRouteParams.uploadedImageUri =
    imageUri || latestProviderImageUri || analysisResult?.uploadedImageUri;
  providerRouteParams.uploadedImageUrl =
    uploadedImageUrl || analysisResult?.uploadedImageUrl;
  Object.assign(providerRouteParams, buildLocationRouteParams(locationInfo));
  providerRouteParams.detectedUserCity = providerCity;

  return providerRouteParams;
};
