import React from "react";
import HexTile from "../HexTile/HexTile";
import COLORS from "../../constants/colors";

const HexIconChip = ({ size = 40, fill = COLORS.lightHoney, children }) => {
  return (
    <HexTile size={size} fill={fill} flatTop={false}>
      {children}
    </HexTile>
  );
};

export default HexIconChip;
