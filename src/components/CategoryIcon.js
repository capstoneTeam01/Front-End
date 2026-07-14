import React from "react";

import COLORS from "../constants/colors";
import AppliancesIcon from "../../assets/icons/Appliances_Icon.svg";
import ElectricalIcon from "../../assets/icons/Electrical_Icon.svg";
import PlumbingIcon from "../../assets/icons/Plumbing_Icon.svg";

const ICONS_BY_CATEGORY = {
  appliances: AppliancesIcon,
  electrical: ElectricalIcon,
  plumbing: PlumbingIcon,
};

const CATEGORY_ALIASES = {
  appliance: "appliances",
  appliances: "appliances",
  hvac: "appliances",
  ac: "appliances",
  electrical: "electrical",
  electric: "electrical",
  plumbing: "plumbing",
  plumber: "plumbing",
};

export const resolveCategoryIconId = (value) => {
  const key = String(value || "")
    .trim()
    .toLowerCase();

  return CATEGORY_ALIASES[key] || key;
};

const CategoryIcon = ({ categoryId, size = 24, color = COLORS.secondary }) => {
  const Icon = ICONS_BY_CATEGORY[resolveCategoryIconId(categoryId)] || PlumbingIcon;

  return (
    <Icon
      width={size}
      height={size}
      color={color}
    />
  );
};

export default CategoryIcon;
