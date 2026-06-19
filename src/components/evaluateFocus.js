const GUIDELINE_FRAME = {
  x: (1 - 0.88) / 2,
  y: 0.22,
  width: 0.88,
  height: 0.52,
};

const BRIGHTNESS_MIN = 0.22;
const BRIGHTNESS_MAX = 0.82;

const COACHING_INSTRUCTIONS = {
  NO_OBJECT: "Point camera at a pipe or fixture",
  TOO_DARK: "Improve lighting — scene is too dark",
  TOO_BRIGHT: "Reduce glare — too much light",
  STEP_CLOSER: "Step closer to the object",
  STEP_BACK: "Step back from the object",
  MOVE_LEFT: "Move camera left",
  MOVE_RIGHT: "Move camera right",
  MOVE_UP: "Move camera up",
  MOVE_DOWN: "Move camera down",
  HOLD_STEADY: "Almost there — hold steady",
  READY: "Ready to capture — hold steady",
  DETECTION_ERROR: "Detection error — check backend is running",
};

const evaluateLighting = (brightness) => {
  if (brightness == null) {
    return null;
  }

  if (brightness < BRIGHTNESS_MIN) {
    return {
      isFocused: false,
      message: COACHING_INSTRUCTIONS.TOO_DARK,
      code: "TOO_DARK",
    };
  }

  if (brightness > BRIGHTNESS_MAX) {
    return {
      isFocused: false,
      message: COACHING_INSTRUCTIONS.TOO_BRIGHT,
      code: "TOO_BRIGHT",
    };
  }

  return null;
};

const evaluateFocus = ({ issueRegion, brightness }) => {
  const lightingIssue = evaluateLighting(brightness);
  if (lightingIssue) {
    return lightingIssue;
  }

  if (!issueRegion) {
    return {
      isFocused: false,
      message: COACHING_INSTRUCTIONS.NO_OBJECT,
      code: "NO_OBJECT",
    };
  }

  const frame = GUIDELINE_FRAME;
  const frameCx = frame.x + frame.width / 2;
  const frameCy = frame.y + frame.height / 2;
  const cx = issueRegion.x + issueRegion.width / 2;
  const cy = issueRegion.y + issueRegion.height / 2;
  const frameArea = frame.width * frame.height;
  const areaInFrame = (issueRegion.width * issueRegion.height) / frameArea;

  if (areaInFrame < 0.05) {
    return {
      isFocused: false,
      message: COACHING_INSTRUCTIONS.STEP_CLOSER,
      code: "STEP_CLOSER",
    };
  }

  if (areaInFrame > 1.35) {
    return {
      isFocused: false,
      message: COACHING_INSTRUCTIONS.STEP_BACK,
      code: "STEP_BACK",
    };
  }

  const offsetX = cx - frameCx;
  const offsetY = cy - frameCy;
  const maxOffsetX = frame.width * 0.24;
  const maxOffsetY = frame.height * 0.28;

  if (Math.abs(offsetX) <= maxOffsetX && Math.abs(offsetY) <= maxOffsetY) {
    return {
      isFocused: true,
      message: COACHING_INSTRUCTIONS.READY,
      code: "READY",
    };
  }

  if (Math.abs(offsetX) >= Math.abs(offsetY)) {
    return {
      isFocused: false,
      message: offsetX < 0
        ? COACHING_INSTRUCTIONS.MOVE_RIGHT
        : COACHING_INSTRUCTIONS.MOVE_LEFT,
      code: offsetX < 0 ? "MOVE_RIGHT" : "MOVE_LEFT",
    };
  }

  return {
    isFocused: false,
    message: offsetY < 0
      ? COACHING_INSTRUCTIONS.MOVE_DOWN
      : COACHING_INSTRUCTIONS.MOVE_UP,
    code: offsetY < 0 ? "MOVE_DOWN" : "MOVE_UP",
  };
};

export {
  BRIGHTNESS_MAX,
  BRIGHTNESS_MIN,
  COACHING_INSTRUCTIONS,
  GUIDELINE_FRAME,
  evaluateFocus,
  evaluateLighting,
};
