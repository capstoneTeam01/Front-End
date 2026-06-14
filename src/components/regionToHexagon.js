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

export { regionToHexagonPoints };
