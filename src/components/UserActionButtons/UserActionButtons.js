import { Pressable, Text, View } from "react-native";

import styles from "./UserActionButtonsStyle";

const UserActionButtons = ({
  onFindExpertsPress,
  onDiyPress,
  findExpertsLabel = "Find Experts",
  showDiy = false,
  buttonStyle,
  textStyle,
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
          buttonStyle,
          pressed ? styles.buttonPressed : null,
        ]}
      >
        <Text style={[styles.buttonText, textStyle]}>
          {findExpertsLabel}
        </Text>
      </Pressable>

      {showDiy ? (
        <Pressable
          onPress={onDiyPress}
          style={({ pressed }) => [
            styles.button,
            styles.diyButton,
            buttonStyle,
            pressed ? styles.buttonPressed : null,
          ]}
        >
          <Text style={[styles.buttonText, textStyle]}>
            DIY
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
};

export default UserActionButtons;
