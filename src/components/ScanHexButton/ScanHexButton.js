import React from "react";
import { Ionicons } from "@expo/vector-icons";
import HexTile from "../HexTile/HexTile";
import COLORS from "../../constants/colors";

const ScanHexButton = ({ onPress, size = 96 }) => {
  return (
    <HexTile
      size={size}
      fill={COLORS.primary}
      onPress={onPress}
      flatTop={false}
    >
      <Ionicons name="scan-outline" size={size * 0.4} color={COLORS.white} />
    </HexTile>
  );
};

export default ScanHexButton;
