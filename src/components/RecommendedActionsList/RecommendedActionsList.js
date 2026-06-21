import { Text, View } from "react-native";
import styles from "./RecommendedActionsListStyle";

const getActionText = (action) => {
  if (typeof action === "string") {
    return action;
  }

  if (action && action.label) {
    return action.label;
  }

  if (action && action.title) {
    return action.title;
  }

  if (action && action.type) {
    return action.type;
  }

  if (action && action.action) {
    return action.action;
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