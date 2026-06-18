import React from "react";
import { Text, View } from "react-native";
import styles from "./UrgencyBadgeStyle";

const getUrgencyLabel = (urgency) => {
  let urgencyText = "Unknown";

  if (typeof urgency === "string" && urgency.trim() !== "") {
    urgencyText = urgency.trim();
  }

  const alreadyContainsRisk = urgencyText
    .toLowerCase()
    .includes("risk");

  if (alreadyContainsRisk) {
    return urgencyText;
  }

  return `${urgencyText} Risk`;
};

const UrgencyBadge = ({ urgency }) => {
  const urgencyLabel = getUrgencyLabel(urgency);

  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{urgencyLabel}</Text>
    </View>
  );
};

export default UrgencyBadge;