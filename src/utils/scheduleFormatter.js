const clean = (value) => String(value || "").trim();

export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const WEEKDAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const WEEKDAY_LONG = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const getNoonDate = (baseDate = new Date()) => {
  const date = new Date(baseDate);
  date.setHours(12, 0, 0, 0);
  return date;
};

export const addDays = (baseDate, days) => {
  const date = getNoonDate(baseDate);
  date.setDate(date.getDate() + days);
  return date;
};

export const formatCalendarDateLabel = (date) => {
  const safeDate = getNoonDate(date);
  const weekday = WEEKDAY_SHORT[safeDate.getDay()];
  const month = MONTH_NAMES[safeDate.getMonth()].slice(0, 3);
  return `${weekday}, ${month} ${safeDate.getDate()}, ${safeDate.getFullYear()}`;
};

export const formatLongDateLabel = (date) => {
  const safeDate = getNoonDate(date);
  return `${WEEKDAY_LONG[safeDate.getDay()]}, ${MONTH_NAMES[safeDate.getMonth()]} ${safeDate.getDate()}, ${safeDate.getFullYear()}`;
};

export const resolvePreferredDateForEmail = (dateLabel) => {
  const value = clean(dateLabel);
  const today = getNoonDate();

  if (!value || value === "Today") {
    return `Today (${formatLongDateLabel(today)})`;
  }

  if (value === "Tomorrow") {
    return `Tomorrow (${formatLongDateLabel(addDays(today, 1))})`;
  }

  // Custom dates from the calendar already include the year.
  return value;
};

export const resolvePreferredTimeForEmail = (timeLabel) => clean(timeLabel) || "Morning";

export const buildPreferredScheduleText = ({ date, time }) => {
  const preferredDate = resolvePreferredDateForEmail(date);
  const preferredTime = resolvePreferredTimeForEmail(time);

  return {
    preferredDate,
    preferredTime,
    compact: `${preferredDate} at ${preferredTime}`,
  };
};
