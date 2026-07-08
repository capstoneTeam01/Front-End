import { HEXAGON_RADIUS } from "../../constants/layout";

const REGULAR_HEX_INSET = (1 - Math.sqrt(3) / 2) / 2;

const readPoint = (point) => {
  if (Array.isArray(point)) {
    return { x: point[0], y: point[1] };
  }

  return { x: point.x, y: point.y };
};

export const buildHexagonPoints = (width, height = width, flatTop = false) => {
  if (flatTop) {
    return [
      [width * 0.25, height * REGULAR_HEX_INSET],
      [width * 0.75, height * REGULAR_HEX_INSET],
      [width, height * 0.5],
      [width * 0.75, height * (1 - REGULAR_HEX_INSET)],
      [width * 0.25, height * (1 - REGULAR_HEX_INSET)],
      [0, height * 0.5],
    ];
  }

  return [
    [width * 0.5, 0],
    [width, height * 0.25],
    [width, height * 0.75],
    [width * 0.5, height],
    [0, height * 0.75],
    [0, height * 0.25],
  ];
};

const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

export const roundedPolygonPath = (rawPoints, cornerRadius = 0) => {
  const points = rawPoints.map(readPoint);
  const pointCount = points.length;

  if (!pointCount) {
    return "";
  }

  if (pointCount < 3 || cornerRadius <= 0) {
    const [first, ...rest] = points;
    return [
      `M ${first.x},${first.y}`,
      ...rest.map((point) => `L ${point.x},${point.y}`),
      "Z",
    ].join(" ");
  }

  const shortestEdge = points.reduce((minLength, point, index) => {
    const next = points[(index + 1) % pointCount];
    return Math.min(minLength, distance(point, next));
  }, Number.POSITIVE_INFINITY);

  const radius = Math.min(cornerRadius, shortestEdge * 0.45);
  let path = "";

  for (let index = 0; index < pointCount; index += 1) {
    const previous = points[(index - 1 + pointCount) % pointCount];
    const current = points[index];
    const next = points[(index + 1) % pointCount];

    const previousLength = distance(previous, current) || 1;
    const nextLength = distance(current, next) || 1;

    const before = {
      x: current.x - ((current.x - previous.x) / previousLength) * radius,
      y: current.y - ((current.y - previous.y) / previousLength) * radius,
    };

    const after = {
      x: current.x + ((next.x - current.x) / nextLength) * radius,
      y: current.y + ((next.y - current.y) / nextLength) * radius,
    };

    path += index === 0 ? `M ${before.x},${before.y} ` : `L ${before.x},${before.y} `;
    path += `Q ${current.x},${current.y} ${after.x},${after.y} `;
  }

  return `${path}Z`;
};

export const getHexagonCornerRadius = (size, role) => {
  if (role && HEXAGON_RADIUS[role] !== undefined) {
    return HEXAGON_RADIUS[role];
  }

  if (size <= 42) return HEXAGON_RADIUS.icon;
  if (size <= 48) return HEXAGON_RADIUS.step;
  if (size <= 110) return HEXAGON_RADIUS.avatar;

  return HEXAGON_RADIUS.hero;
};

export const createRoundedHexPath = ({
  width,
  height = width,
  flatTop = false,
  cornerRadius,
  radiusRole,
  inset = 0,
}) => {
  const safeInset = Math.max(0, inset);
  const pathWidth = Math.max(0, width - safeInset * 2);
  const pathHeight = Math.max(0, height - safeInset * 2);
  const radius =
    cornerRadius ??
    getHexagonCornerRadius(Math.min(pathWidth, pathHeight), radiusRole);
  const points = buildHexagonPoints(pathWidth, pathHeight, flatTop).map(
    ([x, y]) => [x + safeInset, y + safeInset]
  );

  return roundedPolygonPath(points, radius);
};
