// Values taken directly from the FixBee Design Guide (Image 1).

// 8pt grid spacing system
export const SPACING = {
  xs: 4, // extra small
  sm: 8, // small
  card: 16, // card spacing
  section: 24, // section spacing / side padding
  large: 32, // large section gap
};

export const SIDE_PADDING = 24;
export const BOTTOM_NAV_HEIGHT = 84;

// Border radius
export const RADIUS = {
  big: 20, // big cards
  medium: 16, // medium cards
  small: 10, // small cards
  field: 12, // input fields / buttons (Input Fields spec)
};

// Typography — Inter family, sizes/weights from the guide.
export const TYPE = {
  screenTitle: { fontSize: 28, fontWeight: "600" }, // SemiBold
  sectionTitle: { fontSize: 22, fontWeight: "600" }, // SemiBold
  cardTitle: { fontSize: 18, fontWeight: "500" }, // Medium
  body: { fontSize: 16, fontWeight: "400" }, // Regular
  small: { fontSize: 14, fontWeight: "400" }, // Regular
  caption: { fontSize: 12, fontWeight: "500" }, // Medium
  button: { fontSize: 16, fontWeight: "500" }, // Medium
};

export const BUTTON_HEIGHT = 52;
export const FIELD_HEIGHT = 52;