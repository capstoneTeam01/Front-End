const COLORS = {
  // --- Kumara's existing tokens (unchanged) ---
  black: "#000000",
  gray900: "#A1A1A1",
  gray700: "#D1D5DC",
  gray500: "#E2E2E2",
  gray300: "#E9E7E7",
  white: "#FDFDFD",

  placeholderTextColor: "rgba(10, 10, 10, 0.5)",

  // --- Added for screens (wireframe is monochrome) ---
  // AppTextField.js imports COLORS.placeholder — alias so it doesn't break.
  placeholder: "rgba(10, 10, 10, 0.5)",

  textPrimary: "#0A0A0A", // titles / strong text
  textSecondary: "#6B7280", // subtitles, "Take a photo and let FixBee..."
  textMuted: "#9CA3AF", // captions, list subtitles

  surface: "#F3F4F6", // hex hero panel / icon chip background
  surfaceDark: "#3A3A3A", // dark scan hexagon
  divider: "#EFEFEF", // hairline between list rows

  navInactive: "#A1A1A1", // bottom-tab inactive
  navActive: "#0A0A0A", // bottom-tab active
};

export default COLORS;
