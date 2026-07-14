import { Text, View } from "react-native";

import UrgencyBadge from "../UrgencyBadge/UrgencyBadge";
import {
  capitalizeFirstLetter,
  formatTitle,
} from "../../utils/textFormatters";
import styles from "./AnalysisResultSummaryStyle";

const formatIssueTitle = (issue) => {
  if (!issue) {
    return "Repair Issue Detected";
  }

  const lowerCaseIssue = issue.toLowerCase();

  if (lowerCaseIssue.includes("detected")) {
    return formatTitle(issue);
  }

  return `${formatTitle(issue)} Detected`;
};

const AnalysisResultSummary = (props) => {
  const detectedIssue = props.detectedIssue;
  const detectedObject = props.detectedObject;
  const urgency = props.urgency;
  const urgencyDescription = props.urgencyDescription;
  const isEmergency = props.isEmergency;

  let description =
    urgencyDescription ||
    `FixBee identified signs of ${detectedObject || "a repair issue"}.`;

  if (isEmergency === true) {
    description =
      urgencyDescription ||
      "This issue may require immediate professional attention.";

    return (
      <View>
        <View style={styles.warningCard}>
          <View style={styles.urgencyBadgeContainer}>
            <UrgencyBadge urgency={urgency} />
          </View>

          <Text style={styles.emergencyTitle}>
            Emergency Issue Detected
          </Text>

          <Text style={styles.emergencyDescription}>
            {description}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>
          Detected Risk
        </Text>

        <View style={styles.riskCard}>
          <Text style={styles.riskText}>
            {capitalizeFirstLetter(detectedIssue) || "Possible emergency repair issue"}
          </Text>

          <Text style={styles.riskText}>
            {detectedObject
              ? `Detected Object: ${capitalizeFirstLetter(detectedObject)}`
              : "Object Details Not Available"}
          </Text>

          <Text style={styles.riskText}>
            Urgency Level: {capitalizeFirstLetter(urgency) || "Unknown"}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.summaryCard}>
      <Text style={styles.issueTitle}>
        {formatIssueTitle(detectedIssue)}
      </Text>

      <Text style={styles.issueDescription}>
        {capitalizeFirstLetter(description)}
      </Text>

      <UrgencyBadge urgency={urgency} />
    </View>
  );
};

export default AnalysisResultSummary;
