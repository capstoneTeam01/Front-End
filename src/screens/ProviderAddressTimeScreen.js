import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Svg, { Circle, Path } from "react-native-svg";

import AppHeader from "../components/AppHeader/AppHeader";
import HeaderBellButton from "../components/AppHeader/HeaderBellButton";
import AuthFooterTray from "../components/AuthFooterTray/AuthFooterTray";
import PolygonAsset from "../components/PolygonAsset";
import ProviderPlainButton from "../components/ProviderPlainButton";
import {
  getCurrentUserDisplayName,
  getCurrentUserEmail,
} from "../features/auth/services/currentUserProfileService";
import { loadProvidersByIds } from "../localDb/businessDirectoryProviderLocalDb";
import { buildProviderQuoteEmailDraft } from "../services/providerQuoteEmailService";
import { getCurrentCityFromGps } from "../utils/locationHelper";
import { DEFAULT_PROVIDER_CITY } from "../utils/providerConstants";
import COLORS from "../constants/colors";
import { RADIUS, SIDE_PADDING, SPACING, TYPE } from "../constants/layout";

const clean = (value) => String(value || "").trim();

const getIssueTitle = (routeParams = {}) =>
  clean(routeParams.fromIssue) ||
  clean(routeParams.issueTitle) ||
  "Repair issue";

const DATE_OPTIONS = ["Today", "Tomorrow", "Select Date"];
const TIME_OPTIONS = ["Morning", "Afternoon", "Evening"];
const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const LocationPinIcon = ({ size = 23, color = COLORS.providerBrown }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 21s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z"
      stroke={color}
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx="12" cy="9" r="2.5" stroke={color} strokeWidth={2.2} />
  </Svg>
);

const PeopleHexIcon = () => (
  <PolygonAsset
    variant="polygon9"
    width={54}
    height={60}
    fill={COLORS.lightHoney}
  >
    <Ionicons
      name="people-outline"
      size={24}
      color={COLORS.secondary}
    />
  </PolygonAsset>
);

const startOfDay = (value = new Date()) => {
  const date = new Date(value);
  date.setHours(0, 0, 0, 0);
  return date;
};

const addDays = (value, days) => {
  const date = new Date(value);
  date.setDate(date.getDate() + days);
  return date;
};

const formatDateLabel = (value) =>
  new Date(value).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

const formatMonthTitle = (value) =>
  new Date(value).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

const buildCalendarDays = (monthDate) => {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const blanks = Array.from({ length: firstDay.getDay() }, () => null);
  const days = Array.from(
    { length: daysInMonth },
    (_, index) => new Date(year, month, index + 1),
  );
  return [...blanks, ...days];
};

const sameDay = (a, b) => {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
};

const ProviderAddressTimeScreen = ({ navigation, route }) => {
  const selectedProviderIds = useMemo(
    () =>
      Array.isArray(route?.params?.selectedProviderIds)
        ? route.params.selectedProviderIds
        : [],
    [route?.params?.selectedProviderIds],
  );
  const selectedProviderNames = Array.isArray(
    route?.params?.selectedProviderNames,
  )
    ? route.params.selectedProviderNames
    : [];

  const [providers, setProviders] = useState([]);
  const [address, setAddress] = useState("");
  const [unit, setUnit] = useState("");
  const [city, setCity] = useState(
    clean(route?.params?.detectedUserCity) ||
      clean(route?.params?.city) ||
      DEFAULT_PROVIDER_CITY,
  );
  const [date, setDate] = useState("Today");
  const [customDate, setCustomDate] = useState("");
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(null);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(startOfDay(new Date()));
  const [time, setTime] = useState("Morning");
  const [notes, setNotes] = useState("");
  const [locating, setLocating] = useState(false);
  const [preparing, setPreparing] = useState(false);

  const calendarDays = useMemo(
    () => buildCalendarDays(calendarMonth),
    [calendarMonth],
  );
  const today = useMemo(() => startOfDay(new Date()), []);

  useEffect(() => {
    let active = true;

    (async () => {
      const rows = await loadProvidersByIds(selectedProviderIds);
      if (active) setProviders(rows);
      console.log("[FixBee][AddressTime] selected providers loaded", {
        selectedCount: selectedProviderIds.length,
        loadedCount: rows.length,
      });
    })();

    return () => {
      active = false;
    };
  }, [selectedProviderIds.join(",")]);

  const routeCachedAddress = clean(route?.params?.detectedStreetAddress);

  const handleUseCurrentLocation = async () => {
    setLocating(true);
    console.log("[FixBee][AddressTime] use current location pressed");

    try {
      const location = await getCurrentCityFromGps({
        preferCached: true,
        forceRefresh: false,
        allowCachedOnFailure: true,
        cacheReason: "address-time-use-current-location",
        highAccuracy: true,
        requireStreetAddress: true,
      });

      const nextAddress = clean(location?.streetAddress);
      const nextCity = clean(location?.city);

      setAddress(nextAddress || "");
      setCity(nextCity || "");

      console.log("[FixBee][Location] address filled", {
        city: nextCity,
        streetAddress: nextAddress,
        source: location?.source,
        cacheReason: location?.cacheReason,
      });
    } catch (error) {
      console.log("[FixBee][Location] address fill failed", error?.message);
      if (routeCachedAddress) {
        const routeCachedCity =
          clean(route?.params?.detectedUserCity) || clean(route?.params?.city);

        setAddress(routeCachedAddress);
        setCity(routeCachedCity || "");

        console.log("[FixBee][Location] using route cached address fallback", {
          city: routeCachedCity,
          streetAddress: routeCachedAddress,
        });
      } else {
        Alert.alert(
          "Location unavailable",
          "Please type the address manually or try again.",
        );
      }
    } finally {
      setLocating(false);
    }
  };

  const openCalendar = () => {
    setDate("Select Date");
    setCalendarVisible(true);
    setCalendarMonth(selectedCalendarDate || startOfDay(new Date()));
  };

  const handleDateOptionPress = (item) => {
    if (item === "Select Date") {
      openCalendar();
      return;
    }

    setDate(item);
    setCalendarVisible(false);

    if (item === "Today") {
      setSelectedCalendarDate(today);
      setCustomDate("");
    }

    if (item === "Tomorrow") {
      setSelectedCalendarDate(addDays(today, 1));
      setCustomDate("");
    }
  };

  const handleCalendarDatePick = (day) => {
    if (!day) return;

    const picked = startOfDay(day);
    setDate("Select Date");
    setSelectedCalendarDate(picked);
    setCustomDate(formatDateLabel(picked));
    setCalendarVisible(false);

    console.log("[FixBee][AddressTime] custom date selected", {
      preferredDate: formatDateLabel(picked),
    });
  };

  const moveCalendarMonth = (change) => {
    setCalendarMonth(
      (current) =>
        new Date(current.getFullYear(), current.getMonth() + change, 1),
    );
  };

  const getPreferredDate = () => {
    if (date === "Select Date") return clean(customDate) || "Select Date";
    return date;
  };

  const handleReviewQuoteRequest = async () => {
    if (!clean(address)) {
      Alert.alert(
        "Address required",
        "Enter the service address or tap Use Current Location.",
      );
      return;
    }

    if (!clean(city)) {
      Alert.alert(
        "City required",
        "Enter the city or tap Use Current Location.",
      );
      return;
    }

    if (date === "Select Date" && !clean(customDate)) {
      Alert.alert(
        "Date required",
        "Please select a preferred service date from the calendar.",
      );
      return;
    }

    setPreparing(true);

    try {
      let safeProviders = providers;
      if (!safeProviders.length) {
        safeProviders = await loadProvidersByIds(selectedProviderIds);
      }

      if (!safeProviders.length && selectedProviderNames.length) {
        safeProviders = selectedProviderNames.map((name, index) => ({
          id: selectedProviderIds[index],
          businessName: name,
        }));
      }

      const [requesterName, requesterEmail] = await Promise.all([
        getCurrentUserDisplayName(),
        getCurrentUserEmail(),
      ]);
      const preferredDate = getPreferredDate();
      const emailDraft = buildProviderQuoteEmailDraft({
        providers: safeProviders,
        issue: getIssueTitle(route?.params),
        detectedObject: route?.params?.detectedObject,
        urgency: route?.params?.urgency,
        estimatedCostRange: route?.params?.estimatedCostRange,
        estimatedRepairTime: route?.params?.estimatedRepairTime,
        address,
        unit,
        city,
        date: preferredDate,
        time,
        notes,
        imageUri: route?.params?.uploadedImageUri,
        uploadedImageUrl: route?.params?.uploadedImageUrl,
        photoId: route?.params?.photoId,
        requesterName,
        requesterEmail,
      });

      console.log("[FixBee][QuoteRequest] preview quote request", {
        selectedCount: selectedProviderIds.length,
        to: emailDraft.to,
        bccCount: emailDraft.bccList?.length || 0,
        hasThumbnail: Boolean(emailDraft.images?.[0]?.thumbnailUri),
      });

      navigation.navigate("ProviderQuoteRequest", {
        ...route.params,
        address,
        unit,
        city,
        date: preferredDate,
        time,
        notes,
        quotePreviewDraft: emailDraft,
        requesterEmail,
        selectedProviderIds: safeProviders
          .map((provider) => provider.id)
          .filter(Boolean),
        selectedProviderNames: safeProviders.map(
          (provider) => provider.businessName,
        ),
      });
    } catch (error) {
      console.log("[FixBee][QuoteRequest] preview failed", error?.message);
      Alert.alert(
        "Quote request failed",
        error.message || "Could not prepare the request preview.",
      );
    } finally {
      setPreparing(false);
    }
  };

  return (
    <View style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <AppHeader
          title="Address & Time"
          onBack={() => navigation.goBack()}
          right={
            <HeaderBellButton
              onPress={() => navigation.navigate("Notifications")}
            />
          }
        />

        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Where do you need help?</Text>
          <Text style={styles.subtitle}>
            Add your service location and preferred schedule for accurate
            quotes.
          </Text>

          <Text style={[styles.label, styles.firstSectionLabel]}>
            Service Address
          </Text>
          <TextInput
            style={[styles.input, styles.firstAddressInput]}
            value={address}
            onChangeText={setAddress}
            placeholder="Street Address"
            placeholderTextColor={COLORS.providerMidGray}
          />
          <TextInput
            style={[styles.input, styles.lastAddressInput]}
            value={unit}
            onChangeText={setUnit}
            placeholder="Apartment / Unit (Optional)"
            placeholderTextColor={COLORS.providerMidGray}
          />

          <View style={styles.locationButtonWrap}>
            <Pressable
              onPress={handleUseCurrentLocation}
              style={styles.locationButton}
              disabled={locating}
            >
              {locating ? (
                <ActivityIndicator size="small" color={COLORS.providerBrown} />
              ) : (
                <LocationPinIcon />
              )}
              <Text style={styles.locationText}>Use Current Location</Text>
            </Pressable>
          </View>

          <Text style={[styles.label, styles.scheduleLabel]}>
            Preferred Schedule
          </Text>
          <Text style={styles.smallLabel}>Date</Text>
          <View style={styles.segmentRow}>
            {DATE_OPTIONS.map((item) => (
              <Pressable
                key={item}
                onPress={() => handleDateOptionPress(item)}
                style={[
                  styles.segment,
                  date === item ? styles.segmentActive : null,
                ]}
              >
                <Text
                  style={[
                    styles.segmentText,
                    date === item ? styles.segmentTextActive : null,
                  ]}
                >
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>
          {date === "Select Date" ? (
            <Pressable style={styles.selectedDateBox} onPress={openCalendar}>
              <Text
                style={[
                  styles.selectedDateText,
                  customDate ? styles.selectedDateTextActive : null,
                ]}
              >
                {customDate || "Tap to choose date from calendar"}
              </Text>
            </Pressable>
          ) : null}

          <Text style={styles.smallLabel}>Time</Text>
          <View style={styles.segmentRow}>
            {TIME_OPTIONS.map((item) => (
              <Pressable
                key={item}
                onPress={() => setTime(item)}
                style={[
                  styles.segment,
                  time === item ? styles.segmentActive : null,
                ]}
              >
                <Text
                  style={[
                    styles.segmentText,
                    time === item ? styles.segmentTextActive : null,
                  ]}
                >
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>

          <Text style={[styles.label, styles.notesLabel]}>
            Additional Notes
          </Text>
          <TextInput
            style={[styles.input, styles.notes]}
            value={notes}
            onChangeText={setNotes}
            placeholder="Add notes for the selected providers"
            placeholderTextColor={COLORS.providerMidGray}
            multiline
          />
          <Text style={styles.exampleText}>
            Example: Leak is under kitchen sink near dishwasher.
          </Text>

          <View style={styles.infoBox}>
            <PeopleHexIcon />
            <Text style={styles.infoText}>
              Quotes will be sent to {selectedProviderIds.length} selected
              professionals.
            </Text>
          </View>
        </ScrollView>

        <View style={styles.bottomCta}>
          <AuthFooterTray fill={COLORS.warmCream}>
            {preparing ? (
              <ActivityIndicator />
            ) : (
              <ProviderPlainButton
                title="Send Quote Request"
                onPress={handleReviewQuoteRequest}
              />
            )}
          </AuthFooterTray>
        </View>
      </KeyboardAvoidingView>

      <Modal
        visible={calendarVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setCalendarVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setCalendarVisible(false)}
        >
          <Pressable style={styles.calendarSheet} onPress={() => {}}>
            <View style={styles.sheetHandle} />
            <View style={styles.calendarHeader}>
              <Pressable
                onPress={() => moveCalendarMonth(-1)}
                style={styles.calendarNavButton}
              >
                <Text style={styles.calendarNavText}>‹</Text>
              </Pressable>
              <Text style={styles.calendarTitle}>
                {formatMonthTitle(calendarMonth)}
              </Text>
              <Pressable
                onPress={() => moveCalendarMonth(1)}
                style={styles.calendarNavButton}
              >
                <Text style={styles.calendarNavText}>›</Text>
              </Pressable>
            </View>

            <View style={styles.weekRow}>
              {WEEK_DAYS.map((day) => (
                <Text key={day} style={styles.weekDay}>
                  {day}
                </Text>
              ))}
            </View>

            <View style={styles.daysGrid}>
              {calendarDays.map((day, index) => {
                const isPast =
                  day && startOfDay(day).getTime() < today.getTime();
                const isSelected = day && sameDay(day, selectedCalendarDate);
                const isToday = day && sameDay(day, today);

                return (
                  <Pressable
                    key={day ? day.toISOString() : `blank-${index}`}
                    disabled={!day || isPast}
                    onPress={() => handleCalendarDatePick(day)}
                    style={[
                      styles.dayButton,
                      isSelected ? styles.dayButtonSelected : null,
                      isToday && !isSelected ? styles.dayButtonToday : null,
                      isPast ? styles.dayButtonDisabled : null,
                    ]}
                  >
                    <Text
                      style={[
                        styles.dayText,
                        isSelected ? styles.dayTextSelected : null,
                        isPast ? styles.dayTextDisabled : null,
                      ]}
                    >
                      {day ? day.getDate() : ""}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <ProviderPlainButton
              title="Done"
              onPress={() => setCalendarVisible(false)}
              disabled={!customDate}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  flex: {
    flex: 1,
  },
  content: {
    paddingHorizontal: SIDE_PADDING,
    paddingTop: SPACING.card,
    paddingBottom: 126,
  },
  title: {
    color: COLORS.textPrimary,
    ...TYPE.screenTitle,
  },
  subtitle: {
    color: COLORS.providerMidGray,
    marginTop: 10,
    marginBottom: SPACING.section,
    ...TYPE.body,
  },
  label: {
    color: COLORS.textPrimary,
    marginTop: SPACING.section,
    marginBottom: 10,
    ...TYPE.cardTitle,
  },
  firstSectionLabel: {
    marginTop: 0,
  },
  scheduleLabel: {
    marginTop: 0,
    marginBottom: 0,
  },
  notesLabel: {
    marginTop: SPACING.section,
    marginBottom: SPACING.card,
  },
  firstAddressInput: {
    marginBottom: 12,
  },
  lastAddressInput: {
    marginBottom: 0,
  },
  smallLabel: {
    color: COLORS.textPrimary,
    marginTop: SPACING.card,
    marginBottom: 10,
    ...TYPE.small,
  },
  input: {
    minHeight: 52,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.field,
    borderWidth: 1,
    borderColor: COLORS.providerLightGray,
    paddingHorizontal: SPACING.card,
    paddingVertical: 14,
    color: COLORS.textPrimary,
    ...TYPE.small,
  },
  notes: {
    minHeight: 135,
    textAlignVertical: "top",
  },
  locationButtonWrap: {
    marginTop: 12,
    marginBottom: 24,
  },
  locationButton: {
    minHeight: 50,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.providerLightGray,
    backgroundColor: COLORS.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    shadowColor: COLORS.black,
    shadowOpacity: 0.03,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  locationText: {
    color: COLORS.textPrimary,
    ...TYPE.small,
  },
  segmentRow: {
    flexDirection: "row",
    gap: 9,
    marginBottom: 0,
  },
  segment: {
    flex: 1,
    minHeight: 49,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.providerLightGray,
    borderRadius: RADIUS.medium,
    paddingHorizontal: 8,
  },
  segmentActive: {
    backgroundColor: COLORS.honey,
  },
  segmentText: {
    color: COLORS.textPrimary,
    ...TYPE.small,
  },
  segmentTextActive: {
    color: COLORS.providerBrown,
    ...TYPE.small,
  },
  selectedDateBox: {
    minHeight: 49,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.medium,
    borderWidth: 1,
    borderColor: COLORS.providerLightGray,
    justifyContent: "center",
    paddingHorizontal: 14,
    marginBottom: SPACING.sm,
  },
  selectedDateText: {
    color: COLORS.providerMidGray,
    ...TYPE.small,
  },
  selectedDateTextActive: {
    color: COLORS.textPrimary,
    ...TYPE.small,
  },
  infoBox: {
    minHeight: 100,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.big,
    borderWidth: 1,
    borderColor: COLORS.providerLightGray,
    paddingVertical: 18,
    paddingHorizontal: SIDE_PADDING,
    marginTop: SPACING.section,
    gap: 18,
  },
  infoText: {
    flex: 1,
    color: COLORS.textPrimary,
    ...TYPE.small,
  },
  exampleText: {
    marginTop: SPACING.sm,
    color: COLORS.providerMidGray,
    ...TYPE.small,
  },
  bottomCta: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.22)",
    justifyContent: "flex-end",
  },
  calendarSheet: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: RADIUS.big,
    borderTopRightRadius: RADIUS.big,
    paddingHorizontal: SIDE_PADDING,
    paddingTop: 10,
    paddingBottom: 28,
  },
  sheetHandle: {
    alignSelf: "center",
    width: 44,
    height: 5,
    borderRadius: 99,
    backgroundColor: COLORS.providerBorder,
    marginBottom: 14,
  },
  calendarHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  calendarTitle: {
    color: COLORS.textPrimary,
    ...TYPE.body,
  },
  calendarNavButton: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.medium,
    backgroundColor: COLORS.honeyCream,
    alignItems: "center",
    justifyContent: "center",
  },
  calendarNavText: {
    color: COLORS.providerBrown,
    ...TYPE.sectionTitle,
  },
  weekRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  weekDay: {
    flex: 1,
    textAlign: "center",
    color: COLORS.providerMidGray,
    ...TYPE.caption,
  },
  daysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 18,
  },
  dayButton: {
    width: `${100 / 7}%`,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: RADIUS.field,
    marginVertical: 2,
  },
  dayButtonSelected: {
    backgroundColor: COLORS.honey,
  },
  dayButtonToday: {
    backgroundColor: COLORS.honeyCream,
    borderWidth: 1,
    borderColor: COLORS.honeyLight,
  },
  dayButtonDisabled: {
    opacity: 0.32,
  },
  dayText: {
    color: COLORS.textPrimary,
    ...TYPE.caption,
  },
  dayTextSelected: {
    color: COLORS.providerBrown,
    ...TYPE.caption,
  },
  dayTextDisabled: {
    color: COLORS.providerMidGray,
  },
});

export default ProviderAddressTimeScreen;
