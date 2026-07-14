import { Text, View } from "react-native";
import styles from "./RecommendedActionsListStyle";

const capitalizeFirstLetter = (value) => {
  const text = String(value || "").trim();
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : "";
};

const getActionText = (action) => {
  if (typeof action === "string") {
    return capitalizeFirstLetter(action);
  }

  if (action && action.label) {
    return capitalizeFirstLetter(action.label);
  }

  if (action && action.title) {
    return capitalizeFirstLetter(action.title);
  }

  if (action && action.type) {
    return capitalizeFirstLetter(action.type);
  }

  if (action && action.action) {
    return capitalizeFirstLetter(action.action);
  }

  return "Recommended action";
};

const RecommendedActionsList = ({
  title,
  actions,
  emptyMessage,
}) => {
  const actionList = Array.isArray(actions) ? actions : [];

  return (
    <View>
      <Text style={styles.sectionTitle}>{title}</Text>

      <View style={styles.actionsCard}>
        {actionList.length > 0 ? (
          actionList.map((action, index) => {
            const actionText = getActionText(action);

            return (
              <View key={index} style={styles.actionItem}>
                <Text style={styles.actionText}>{actionText}</Text>
              </View>
            );
          })
        ) : (
          <Text style={styles.emptyText}>{emptyMessage}</Text>
        )}
      </View>
    </View>
  );
};

export default RecommendedActionsList;
