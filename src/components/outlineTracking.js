const LERP_FACTOR = 0.22;
const MIN_LERP_DISTANCE = 0.35;

const regionToHexagonPoints = (region, screenWidth, screenHeight) => {
  if (!region) {
    return null;
  }

  const cx = (region.x + region.width / 2) * screenWidth;
  const cy = (region.y + region.height / 2) * screenHeight;
  const rx = (region.width / 2) * screenWidth * 1.1;
  const ry = (region.height / 2) * screenHeight * 1.1;
  const points = [];

  for (let i = 0; i < 6; i += 1) {
    const angle = (Math.PI / 3) * i - Math.PI / 2;
    points.push({
      x: cx + rx * Math.cos(angle),
      y: cy + ry * Math.sin(angle),
    });
  }

  return points;
};

const detectionToHexagonPoints = (issueRegion, screenWidth, screenHeight) =>
  regionToHexagonPoints(issueRegion, screenWidth, screenHeight);

const lerpPoints = (current, target, factor = LERP_FACTOR) => {
  if (!target?.length) {
    return null;
  }

  if (!current || current.length !== target.length) {
    return {
      points: target.map((point) => ({ ...point })),
      settled: true,
    };
  }

  let settled = true;

  const next = current.map((point, index) => {
    const goal = target[index];
    const dx = goal.x - point.x;
    const dy = goal.y - point.y;

    if (Math.abs(dx) > MIN_LERP_DISTANCE || Math.abs(dy) > MIN_LERP_DISTANCE) {
      settled = false;
    }

    return {
      x: point.x + dx * factor,
      y: point.y + dy * factor,
    };
  });

  return { points: next, settled };
};

const pointsToAttr = (points) => {
  if (!points?.length) {
    return "";
  }

  return points
    .map((point) => `${point.x.toFixed(1)},${point.y.toFixed(1)}`)
    .join(" ");
};

export {
  LERP_FACTOR,
  detectionToHexagonPoints,
  lerpPoints,
  pointsToAttr,
  regionToHexagonPoints,
};
