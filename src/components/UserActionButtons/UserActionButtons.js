import { Pressable, Text, View } from "react-native";

import styles from "./UserActionButtonsStyle";

const UserActionButtons = ({
  onFindExpertsPress,
  onDiyPress,
  showDiy = false,
}) => {
  const findExpertsStyle = showDiy
    ? styles.findExpertsWithDiyButton
    : styles.findExpertsSingleButton;

  return (
    <View style={styles.buttonRow}>
      <Pressable
        onPress={onFindExpertsPress}
        style={({ pressed }) => [
          styles.button,
          findExpertsStyle,
          pressed ? styles.buttonPressed : null,
        ]}
      >
        <Text style={styles.buttonText}>
          Find Experts
        </Text>
      </Pressable>

      {showDiy ? (
        <Pressable
          onPress={onDiyPress}
          style={({ pressed }) => [
            styles.button,
            styles.diyButton,
            pressed ? styles.buttonPressed : null,
          ]}
        >
          <Text style={styles.buttonText}>
            DIY
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
};

export default UserActionButtons;