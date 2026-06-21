import { Pressable, Text, View } from "react-native";
import styles from "./UserActionButtonsStyle";

const UserActionButtons = (props) => {
  const onFindExpertsPress = props.onFindExpertsPress;
  const onDiyPress = props.onDiyPress;
  const showDiy = props.showDiy;

  let diyButton = null;

  if (showDiy === true) {
    diyButton = (
      <Pressable
        style={styles.secondaryButton}
        onPress={onDiyPress}
      >
        <Text style={styles.secondaryButtonText}>
          DIY
        </Text>
      </Pressable>
    );
  }

  return (
    <View style={styles.buttonRow}>
      <Pressable
        style={styles.primaryButton}
        onPress={onFindExpertsPress}
      >
        <Text style={styles.primaryButtonText}>
          Find Experts
        </Text>
      </Pressable>

      {diyButton}
    </View>
  );
};

export default UserActionButtons;