import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./ScreenHeaderStyle";
import COLORS from "../../constants/colors";
import { formatTitle } from "../../utils/textFormatters";

const ScreenHeader = ({
  title,
  showBack = false,
  onBack,
  onBellPress,
  leading,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leading}>
        {leading ? (
          leading
        ) : (
          <>
            {showBack ? (
              <TouchableOpacity
                onPress={onBack}
                hitSlop={8}
                style={styles.back}
              >
                <Ionicons
                  name="chevron-back"
                  size={24}
                  color={COLORS.textPrimary}
                />
              </TouchableOpacity>
            ) : null}
            {title ? (
              <Text style={styles.title}>
                {formatTitle(title)}
              </Text>
            ) : null}
          </>
        )}
      </View>

      <TouchableOpacity onPress={onBellPress} hitSlop={8}>
        <Ionicons
          name="notifications-outline"
          size={22}
          color={COLORS.textPrimary}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ScreenHeader;
