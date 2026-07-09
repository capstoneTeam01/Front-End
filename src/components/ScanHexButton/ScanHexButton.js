import React from "react";

import ScanIcon from "../../../assets/icons/Scan_Icon.svg";
import COLORS from "../../constants/colors";
import PolygonAsset from "../PolygonAsset";

const ScanHexButton = ({ onPress, size = 87 }) => {
  return (
    <PolygonAsset
      variant="polygon4"
      width={size}
      fill={COLORS.primary}
      onPress={onPress}
      accessibilityLabel="Scan an issue"
    >
      <ScanIcon width={20} height={20} color={COLORS.secondary} />
    </PolygonAsset>
  );
};

export default ScanHexButton;
