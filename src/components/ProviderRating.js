import React from "react";
import { Text } from "react-native";

const ProviderRating = ({ rating, reviewCount }) => (
  <Text>Rating: {rating || "N/A"} | Reviews: {reviewCount || 0}</Text>
);

export default ProviderRating;
