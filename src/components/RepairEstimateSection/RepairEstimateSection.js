import { Text, View } from "react-native";
import styles from "./RepairEstimateSectionStyle";

const EstimateItem = ({ label, value }) => {
  return (
    <View style={styles.estimateBox}>
      <Text style={styles.estimateLabel}>
        {label}
      </Text>

      <Text
        style={styles.estimateValue}
        numberOfLines={2}
        adjustsFontSizeToFit
        minimumFontScale={0.75}
      >
        {value || "N/A"}
      </Text>
    </View>
  );
};

const RepairEstimateSection = ({
  urgency,
  estimatedCostRange,
  estimatedRepairTime,
  showSeverity = true,
  showTitle = true,
}) => {
  return (
    <View>
      {showTitle ? (
        <Text style={styles.sectionTitle}>
          Repair Estimate
        </Text>
      ) : null}

      <View style={styles.estimateRow}>
        {showSeverity ? (
          <EstimateItem
            label="Severity Level"
            value={urgency}
          />
        ) : null}

        <EstimateItem
          label="Estimate Cost"
          value={estimatedCostRange}
        />

        <EstimateItem
          label="Estimate Time"
          value={estimatedRepairTime}
        />
      </View>
    </View>
  );
};

export default RepairEstimateSection;